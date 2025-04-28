import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";
import CurrencyConverter from "./CurrencyConverter.jsx"; // Import the component

import Budget from "./Budget.jsx";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        console.log("in profile");
        console.log(token);

        const res = await axios.get("/profile", {
          headers: { Authorization: `${token}` },
        });

        console.log("res", res);
        setUser(res.data);
      } catch (error) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div>
      <Card>
        <CardContent>
          <Typography variant="h5">User Profile</Typography>
          {user ? (
            <>
              <Typography>
                <strong>Username:</strong> {user.username}
              </Typography>
              <Typography>
                <strong>Email:</strong> {user.email}
              </Typography>
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </CardContent>
      </Card>

      <CurrencyConverter/>

      <Budget />
      
    </div>
  );
}
