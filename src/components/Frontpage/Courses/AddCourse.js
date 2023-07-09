import React from "react";

function CourseCard({ tittle, courseBio, icon }) {
  return (
    <div>
      <div className="style_card_wrapper__9kFeZ22">
        <div className="style_card__FioD122 style_card__FioD1">
          <div className="style_icon_section__5YXBD">
            <div className="style_icon__26JUt">{icon}</div>
            <p className="subtitle_s1 text_black style_cat_title_hover__DIyTP">
              {tittle}
            </p>
          </div>

          <div className="style_card_body__IOxc9">
            <p className="subtitle_s1 text_black style_cat_title__WWJE5">
              {tittle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
