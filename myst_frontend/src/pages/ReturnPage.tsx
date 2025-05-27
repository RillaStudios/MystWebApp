import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { MYST_AUTH_ENDPOINTS } from "../config/myst_api";

export const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    axios
      .get(
        `${MYST_AUTH_ENDPOINTS.CHECKOUT.SESSION_STATUS}?session_id=${sessionId}`,
      )
      .then((response) => {
        setStatus(response.data.status);
        setCustomerEmail(response.data.customer_email);
      })
      .catch((error) => {
        console.error("Error fetching session status:", error);
      });
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
};
