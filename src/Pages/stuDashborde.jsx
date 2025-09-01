import React, { useEffect, useState } from "react";


const stuDashboard = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await apiFetch("https://sophisticated-eden-dr-white004-48b8c072.koyeb.app/api/enrollments/student", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(res.data.message);
      } catch (err) {
        setMessage(" please login again.");
      }
    };
    fetchData();
  }, []);

  return (
    <>
    </>
  );
};

export default stuDashboard;
