import React from "react";
import "./Footer.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import CallIcon from "@mui/icons-material/Call";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import Image from "./../../../image/logo.png";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";

function App() {
  return (
    <div
      className="Footer_footer_container__wzpfb"
      style={{ background: "#1273eb" }}
    >
      <footer>
        <div className="Footer_footer___6Z8a">
          <div className="Footer_footer__col_1__DC4_j">
            <a href="/en">
              <img
                alt=""
                width="150px"
                className="Logo_logo__2Rtha"
                src={Image}
              />
            </a>
            <p className="body_paragraph mb_1">
              Online Live Skill Development Platform
            </p>
            <p className="subtitle_s1 mb_0_5">Download Our App</p>
            <div className="flex gap_0_5">
              <button
                type="button"
                style={{
                  borderRadius: "8px",
                  color: "inherit",
                  height: "48px",
                  padding: "12px 24px",
                  fontSize: "14px",
                }}
                className="Button-module_btn__Fx11X Button-module_blackPrimaryBtn__nSDPc"
              >
                <div className="flex justify_center align_center ">
                  <p className="nowrap false"></p>
                  <img
                    alt=""
                    src="https://cdn.ostad.app/public/upload/2023-05-07T03-18-52.463Z-icon-g-play.svg"
                    width="24px"
                    height="24px"
                  />
                </div>
              </button>
              <button
                type="button"
                style={{
                  borderRadius: "8px",
                  color: "inherit",
                  height: "48px",
                  padding: "12px 24px",
                  fontSize: "14px",
                }}
                className="Button-module_btn__Fx11X Button-module_blackPrimaryBtn__nSDPc"
              >
                <div className="flex justify_center align_center ">
                  <p className="nowrap false"></p>
                  <img
                    alt=""
                    src="https://cdn.ostad.app/public/upload/2023-05-07T03-24-39.366Z-icon-app-store.svg"
                    width="24px"
                    height="24px"
                  />
                </div>
              </button>
              <button
                type="button"
                style={{
                  borderRadius: "8px",
                  color: "inherit",
                  height: "48px",
                  padding: "12px 24px",
                  fontSize: "14px",
                }}
                className="Button-module_btn__Fx11X Button-module_blackPrimaryBtn__nSDPc"
              >
                <div className="flex justify_center align_center ">
                  <p className="nowrap false"></p>
                  <img
                    alt=""
                    src="https://cdn.ostad.app/public/upload/2023-05-07T03-25-05.663Z-icon-win-store.svg"
                    width="24px"
                    height="24px"
                  />
                </div>
              </button>
            </div>
            <div className="mt_1 mb_1">
              <p className="body_paragraph mb_0_2_5">
                Stay connected with the community
              </p>
              <div className="flex">
                <a
                  className="Footer_social_card__vayZf"
                  href="https://facebook.com/ostadapp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookIcon />
                </a>
                <a
                  rel="noreferrer"
                  className="Footer_social_card__vayZf"
                  href="https://instagram.com/ostad_app"
                  target="_blank"
                >
                  <InstagramIcon />
                </a>
                <a
                  rel="noreferrer"
                  className="Footer_social_card__vayZf"
                  href="https://www.youtube.com/channel/UCs5ytUqwsRy1zPGRElhZ38Q"
                  target="_blank"
                >
                  <YouTubeIcon />
                </a>
              </div>
            </div>
          </div>
          <div className="Footer_footer__col_2__n1cIN">
            <ul className="Footer_footer__col_2_contentWrapper__pQR_X">
              <li>
                <p className="subtitle_s1" style={{ color: "black" }}>
                  Quick Link
                </p>
              </li>
              <li className="body_paragraph">
                <a href="/en/courses" style={{ color: "black" }}>
                  Upcoming Live Batch
                </a>
              </li>
              <li className="body_paragraph">
                <a href="/en/free" style={{ color: "black" }}>
                  Free Live className
                </a>
              </li>
            </ul>
          </div>
          <div className="Footer_footer__col_3__Ogyi3">
            <ul className="Footer_footer__col_2_contentWrapper__pQR_X">
              <li>
                <p className="subtitle_s1">Contacts</p>
              </li>
              <li className="flex gap_small">
                <CallIcon />
                <a href="tel:+8801960999918" className="body_paragraph">
                  +880 1960-999918
                </a>
              </li>
              <li className="flex gap_small">
                <MarkEmailUnreadIcon />
                <a href="mailto:support@ostad.app" className="body_paragraph">
                  support@ostad.app
                </a>
              </li>
              <li className="flex gap_small">
                <LocationOnRoundedIcon />
                <a
                  rel="noreferrer"
                  href="https://goo.gl/maps/PnyQgsQs2c6zvFRV9"
                  target="_blank"
                  className="body_paragraph"
                >
                  {" "}
                  Ka-6/a, Navana Sylvania, Baridhara Road, Nadda, Gulshan-2,
                  Dhaka-1212
                </a>
              </li>
            </ul>
          </div>
          <div className="Footer_footer__col_4__B3t2f">
            <ul className="Footer_footer__col_2_contentWrapper__pQR_X">
              <li>
                <p className="subtitle_s1">Company</p>
              </li>
              <li className="body_paragraph">
                <a href="/en/about-us">About Us</a>
              </li>
              <li className="body_paragraph">
                <a href="/en/refund-policy">Refund Policy</a>
              </li>
              <li className="body_paragraph">
                <a href="/en/privacy-policy">Privacy Policy</a>
              </li>
              <li className="body_paragraph">
                <a href="/en/terms-and-conditions">Terms And Conditions</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
