import React, { useState, useEffect } from "react";
import axios from "axios";
import { global_search } from "../../allapi/api";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const MobSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${global_search}?query=${encodeURIComponent(searchTerm)}`
      );
      console.log("Search response:", response.data.data);
      const searchResults = response.data.data || [];

      // Pass results to the next page via state
      navigate("/searchPage", { state: { searchResults } });
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-[7rem] px-[1rem] w-full max-w-md block  lg:hidden mt-3 right-0">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchData()}
          className="border px-4 py-2 rounded-full w-full focus:outline-none shadow-sm"
        />
        <button
          onClick={fetchData}
          className="bg-[#A7E6F8] text-white p-2 rounded-full hover:bg-[#67a6b8]"
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default MobSearchPage;
