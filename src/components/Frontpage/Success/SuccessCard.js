import React from "react";

function SuccessCard({ img, name, comimg, caption, about }) {
  return (
    <li className="GotHiredSection_slide_card__I_MKK">
      <div className="TalentCard3_talent_card__2qZaO">
        <div className="TalentCard3_avatar_container__z9U9J">
          <img src={img} alt="" />
        </div>
        <div className="TalentCard3_talent_card_header__kVIG8">
          <p className="subtitle_s2">{name}</p>
          <p className="body_paragraph">{about}</p>
        </div>
        <div className="TalentCard3_talent_card_footer__30uNH">
          <img alt="" src={comimg} style={{ maWidth: "44px" }} />
          <p className="caption">{caption}</p>
        </div>
      </div>
    </li>
  );
}

export default SuccessCard;
