import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
const FailPayment = () => {
  const { trans_id } = useParams();
  useEffect(() => {
    // Fetch data or perform actions related to the payment success
    console.log("Payment success ID:", trans_id);
    // Additional code here if needed
  }, [trans_id]);
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-4">Payment Failed</h1>
        <p className="lead">Try again!</p>
      </div>
    </div>
  );
};

export default FailPayment;
