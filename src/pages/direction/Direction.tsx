import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select"; // Import react-select
import DirectionCard from "../../components/cards/DirectionCard";
import { display_single_data, get_direction_names } from "../../allapi/api";
import map from "../../../public/assets/map/map.png";
import { useLocation } from "react-router-dom";

interface DirectionType {
  _id: string;
  directionName: string;
  directionImg: string;
  directionDescription?: string;
  latitude: number;
  longitude: number;
}

const Direction: React.FC = () => {
  const [directions, setDirections] = useState<DirectionType[]>([]);
  const [selectedDirection1, setSelectedDirection1] = useState<string>("");
  const [selectedDirection2, setSelectedDirection2] = useState<string>("");
  const [selectedCard1, setSelectedCard1] = useState<DirectionType | null>(
    null
  );
  const [selectedCard2, setSelectedCard2] = useState<DirectionType | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [distance, setDistance] = useState<number | null>(null);
  const location = useLocation();
  console.log(location.state.direction, "location");

  // Fetch directions list from API
  useEffect(() => {
    const fetchDirections = async () => {
      try {
        const response = await axios.get(
          `${get_direction_names}/${location.state.direction}`
        );
        if (Array.isArray(response.data)) {
          setDirections(response.data);
        } else {
          throw new Error("API response is not an array");
        }
      } catch (err) {
        console.error("Error fetching directions:", err);
        setError("Failed to load directions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDirections();
  }, []);

  // Calculate straight-line distance using Haversine formula
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return parseFloat((R * c).toFixed(2));
  };

  // Update distance whenever both cards are selected
  useEffect(() => {
    if (selectedCard1 && selectedCard2) {
      const dist = calculateDistance(
        selectedCard1.latitude,
        selectedCard1.longitude,
        selectedCard2.latitude,
        selectedCard2.longitude
      );
      setDistance(dist);
    } else {
      setDistance(null);
    }
  }, [selectedCard1, selectedCard2]);

  // Handle dropdown selection
  const handleSelection = async (
    value: string,
    setterCard: React.Dispatch<React.SetStateAction<DirectionType | null>>,
    setterDirection: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setterDirection(value);
    if (!value) {
      setterCard(null);
      return;
    }

    try {
      const res = await axios.get(`${display_single_data}/${value}`);
      setterCard(res.data);
    } catch (err) {
      console.error("Error fetching card data:", err);
    }
  };

  // Open Google Maps navigation in a new tab
  const handleNavigate = () => {
    if (selectedCard1 && selectedCard2) {
      const origin = `${selectedCard1.latitude},${selectedCard1.longitude}`;
      const destination = `${selectedCard2.latitude},${selectedCard2.longitude}`;
      const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
      window.open(mapsUrl, "_blank");
    }
  };

  // Options for react-select
  const directionOptions = directions.map((dir) => ({
    value: dir.directionName,
    label: dir.directionName,
  }));

  // Custom styles for react-select to match existing design
  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      backgroundColor: "#fffcfc80",
      borderColor: "#d1d5db",
      borderRadius: "0.375rem",
      padding: "0.5rem",
      maxWidth: "20rem",
      outline: "none",
      fontFamily: "Poppins, sans-serif",
    }),
    menu: (provided: any) => ({
      ...provided,
      maxWidth: "20rem",
    }),
    option: (provided: any) => ({
      ...provided,
      fontFamily: "Poppins, sans-serif",
    }),
  };

  return (
    <div className="p-6 min-h-[75vh]">
      <h1 className="text-3xl font-bold mb-6 text-center text-black font-[Cinzel]">
        Directions
      </h1>

      <div className="flex flex-col lg:flex-row justify-center items-start gap-8">
        <div className="w-full">
          <div className="flex justify-center items-center flex-col gap-2 m-4">
            {/* First Direction Dropdown */}
            <div className="flex sm:flex-row flex-col w-[20rem] sm:w-[25rem] justify-between sm:items-center gap-2 font-poppins">
              <span className="w-[7rem]">Source:</span>
              <Select
                options={directionOptions.filter(
                  (option) => option.value !== selectedDirection2
                )}
                value={directionOptions.find(
                  (option) => option.value === selectedDirection1
                )}
                onChange={(option) =>
                  handleSelection(
                    option ? option.value : "",
                    setSelectedCard1,
                    setSelectedDirection1
                  )
                }
                placeholder="Select First Direction"
                className="w-[20rem]"
                styles={customStyles}
                isClearable
              />
            </div>
            {/* Second Direction Dropdown */}
            <div className="flex sm:flex-row flex-col w-[20rem] sm:w-[25rem] justify-between sm:items-center gap-2 font-poppins">
              <span className="w-[7rem]">Destination:</span>
              <Select
                options={directionOptions.filter(
                  (option) => option.value !== selectedDirection1
                )}
                value={directionOptions.find(
                  (option) => option.value === selectedDirection2
                )}
                onChange={(option) =>
                  handleSelection(
                    option ? option.value : "",
                    setSelectedCard2,
                    setSelectedDirection2
                  )
                }
                placeholder="Select Second Direction"
                className="w-[20rem]"
                styles={customStyles}
                isClearable
              />
            </div>
          </div>

          {/* Display selected direction cards */}
          {selectedCard1 || selectedCard2 ? (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 ">
              {selectedCard1 && (
                <DirectionCard
                  directionName={selectedCard1.directionName}
                  img={selectedCard1.directionImg}
                  description={selectedCard1.directionDescription}
                />
              )}
              {selectedCard2 && (
                <DirectionCard
                  directionName={selectedCard2.directionName}
                  img={selectedCard2.directionImg}
                  description={selectedCard2.directionDescription}
                />
              )}
            </div>
          ) : (
            <div className="flex justify-center">
              <img src={map} className="h-[40vh]" alt="" />
            </div>
          )}
        </div>
      </div>

      {/* Navigation Button */}
      {selectedCard1 && selectedCard2 && (
        <div className="flex justify-center mt-4 sm:mt-8">
          <button
            onClick={handleNavigate}
            className="bg-[#5F99AE] hover:bg-[#478094] text-white py-3 px-6 rounded-full transition font-poppins"
          >
            Navigate
          </button>
        </div>
      )}
    </div>
  );
};

export default Direction;
