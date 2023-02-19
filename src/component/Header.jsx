import React, { useState } from "react";
import axios from "axios";

const Header = ({ coords }) => {
  const [ip, setIp] = useState("");
  const [curIp, setCurip] = useState("197.212.174.101");
  const [city, setCity] = useState("Brooklyn, NY 10001");
  const [timezone, setTimezone] = useState("UTC - 05:00");
  const [isp, setIsp] = useState("SpaceX Starlink");
  const handleIp = (e) => {
    setIp(e.currentTarget.value);
  };
  const handleSub = (e) => {
    const input = document.querySelector(".ip__search__input");
    e.preventDefault();
    if (/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/g.test(ip)) {
      axios
        .get(`http://ip-api.com/json/${ip}`)
        .then((res) => {
          setTimezone(res.data.timezone || "unknown");
          setCity(res.data.city || "unknown");
          setIsp(res.data.isp || "unknown");
          setCurip(res.data.query || "unknown");
          coords({
            lat: +res.data.lat,
            lng: +res.data.lon,
          });
        })
        .catch((er) => {
          console.log(er);
        });
      input.classList.remove("invalid");
    } else {
      input.classList.add("invalid");
    }
  };
  return (
    <header>
      <div className="container">
        <h1 className="title">IP Address Tracker</h1>
        <div className="ip__search">
          <form action="" className="ip__search__form" onSubmit={handleSub}>
            <input
              type="text"
              className="ip__search__input"
              placeholder="Search for any IP address or domain"
              value={ip}
              onChange={handleIp}
            />
            <button className="ip__search__btn">
              <img src="./icon-arrow.svg" />
            </button>
          </form>
        </div>
        <div className="ip__search__container">
          <div className="info__holder">
            <div className="ip__search__info">
              <h2 className="ip__search__info__title">IP Address</h2>
              <p className="ip__search__info__content">{curIp}</p>
            </div>
            <hr className="break__line" />
            <div className="ip__search__info">
              <h2 className="ip__search__info__title">Location</h2>
              <p className="ip__search__info__content">{city}</p>
            </div>
            <hr className="break__line" />
            <div className="ip__search__info">
              <h2 className="ip__search__info__title">Timezone</h2>
              <p className="ip__search__info__content">{timezone}</p>
            </div>
            <hr className="break__line" />
            <div className="ip__search__info">
              <h2 className="ip__search__info__title">ISP</h2>
              <p className="ip__search__info__content">{isp}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
