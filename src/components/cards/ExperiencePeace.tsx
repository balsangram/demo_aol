import React, { useEffect, useState } from "react";
import img1 from "../../assets/cardImg/guruji1.jpg";
import img2 from "../../assets/cardImg/mandap2.jpg";
import img3 from "../../assets/cardImg/audio.jpg";
import img4 from "../../assets/cardImg/vertual.jpg";
// import {  CardContent, CardMedia, Typography } from "@mui/material";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import FacilityandServices from "../home/Home_5_Peace_With_Your_Squad";
import axios from "axios";
import { Stay_Updated } from "../../allapi/api";

interface card {
  name: string;
  img: string;
  link: string;
}

function ExperiencePeace() {
  // const navigate = useNavigate();
  // const items = [
  //   { Contents: "Bring your group", Links: "", img: img1 },
  //   { Contents: "Register Program", Links: "", img: img3 },
  //   { Contents: "Visitors", Links: "", img: img4 },
  // ];
  const [items, setItesm] = useState<card[]>([]);

  useEffect(() => {
    axios
      .get(Stay_Updated)
      .then((result) => {
        console.log(result.data, "Stay_Updated");
        setItesm(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "3rem " }}>
      <h2
        style={{
          marginTop: "3rem",
          fontSize: "2rem",
          fontWeight: "bold",
          padding: "2rem",
        }}
      >
        Experience Peace With Your Squad
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        {items.map((item, index) => (
          <Card  key={index} link={item.link} name={item.name} img={item.img} />
        ))}
      </div>
    </div>
  );
}

export default ExperiencePeace;
