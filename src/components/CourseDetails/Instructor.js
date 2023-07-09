import React from "react";
import InstructorHeader from "./InstructorHeader";
import InstructorCard from "./InstructorCard";

const Instructor = () => {
  return (
    <div className="Container-module_container__JMoiT">
      <div style={{ paddingTop: "40px" }}>
        <div>
          <InstructorHeader />
        </div>
      </div>

      <InstructorCard />
    </div>
  );
};

export default Instructor;
