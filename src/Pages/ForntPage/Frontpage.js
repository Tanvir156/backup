import React from "react";

import OverView from "./../../components/Frontpage/OverView/OverView";
import Courses from "./../../components/Frontpage/Courses/Courses";
import Success from "./../../components/Frontpage/Success/Success";

const Frontpage = () => {
  return (
    <div>
      <OverView />
      <Courses />
      <Success />
    </div>
  );
};

export default Frontpage;
