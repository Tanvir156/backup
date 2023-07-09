import React from "react";

function CourseCard({ tittle, courseBio, icon }) {
  return (
    <div>
      <div className="style_card_wrapper__9kFeZ">
        <div className="style_card__FioD1">
          <div className="style_icon_section__5YXBD">
            <div className="style_icon__26JUt">
              <img src={icon} alt="" />
            </div>
            <p className="subtitle_s1 text_black style_cat_title_hover__DIyTP">
              {tittle}
            </p>
          </div>
          <p className="style_card_description__cl7UI">{courseBio}</p>
          <div className="style_divider__INBHr"></div>
          <div className="style_card_body__IOxc9">
            <p className="subtitle_s1 text_black style_cat_title__WWJE5">
              {tittle}
            </p>
            <div className="style_card_counts__H1MWf">
              <div className="flex gap_0_2_5">
                <div className="style_dot__WW2DV"></div>
                <p className="caption text_black_40"> Courses</p>
              </div>
              <div className="flex gap_0_2_5">
                <div className="style_dot__WW2DV"></div>
                <p className="caption text_black_40"> Workshop</p>
              </div>
            </div>
          </div>
          <div className="style_card_bg__mc6bI"></div>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
