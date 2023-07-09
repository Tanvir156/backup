import React, { useEffect, useState } from "react";
import Module from "./../../components/UserDashBoard/Module";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./../../components/LoginRegister/Loading";
export default function ModulePage() {
  const [accordions, setAccordions] = useState();
  const { id, courseName } = useParams();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const response = await fetch(`http://localhost:5000/api/coursefetch/module/${id}`, config);
        const result = await response.json();
        setAccordions(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {accordions ? (
        accordions.length > 0 ? (
          <Module accordions={accordions} courseName={courseName} />
        ) : (
          <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="text-center">
              <h1 className="display-4">We Upload Module Soon...</h1>
            </div>
          </div>
        )
      ) : (
        <p>
          <Loading />
        </p>
      )}
    </div>
  );
}
