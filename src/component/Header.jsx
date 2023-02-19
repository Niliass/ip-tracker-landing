import React, { useEffect, useState } from "react";
import axios from "axios";

const Header = ({ coords }) => {
  const [ip, setIp] = useState("");
  const [address, setAddress] = useState({
    ip: "Unknown",
    location: "Unknown",
    timezone: "Unknown",
    isp: "Unknown",
  });

  const getData = (url) => {
    axios
      .get(url)
      .then((res) => {
        setAddress({
          ip: res.data.ip,
          location: `${res.data.location.city}, ${res.data.location.region}`,
          timezone: res.data.location.timezone,
          isp: res.data.isp,
        });
        coords({
          lat: res.data.location.lat,
          lng: res.data.location.lng,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${
        import.meta.env.VITE_IP_TRACKER_KEY
      }`
    );
  }, []);
  const handleSub = (e) => {
    e.preventDefault();
    const input = document.querySelector(".ip__search__input");
    const ipReg =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/g;
    const domainReg =
      /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g;
    const checkIp = ipReg.test(ip);
    const checkDomain = domainReg.test(ip);
    let url = `https://geo.ipify.org/api/v2/country,city?apiKey=at_kW3WrdJ9r1C72CL0S34Sy8rSxiwrk&${
      checkIp ? `ipAddress=${ip}` : checkDomain ? `domain=${ip}` : ""
    }`;
    getData(url);
    setIp("");
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
              onChange={(e) => setIp(e.currentTarget.value)}
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
              <p className="ip__search__info__content">{address.ip}</p>
            </div>
            <hr className="break__line" />
            <div className="ip__search__info">
              <h2 className="ip__search__info__title">Location</h2>
              <p className="ip__search__info__content">{address.location}</p>
            </div>
            <hr className="break__line" />
            <div className="ip__search__info">
              <h2 className="ip__search__info__title">Timezone</h2>
              <p className="ip__search__info__content">
                UTC {address.timezone}
              </p>
            </div>
            <hr className="break__line" />
            <div className="ip__search__info">
              <h2 className="ip__search__info__title">ISP</h2>
              <p className="ip__search__info__content">{address.isp}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
