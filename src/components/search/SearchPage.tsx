import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../cards/Card";
import MobSearchPage from "./MobSearchPage";

type ResultItem = {
  link: string;
  name: string;
  img: string;
};

const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const results: ResultItem[] = location.state?.searchResults || [];

  // 🔁 Redirect back if no search data
  useEffect(() => {
    if (!location.state?.searchResults) {
      navigate("/");
    }
  }, [location.state, navigate]);

  return (
    <div className="sm:p-6 p-2">
      <MobSearchPage />
      <h2 className="text-2xl text-center sm:text-left sm:pl-8  font-semibold sm:mb-6 my-3 mt-20 sm:mt-0">
        Search Results
      </h2>
      {results.length > 0 ? (
        <div className="flex justify-center flex-wrap items-center gap-4">
          {results.map((item, index) => (
            <Card
              key={index}
              link={item.link}
              name={item.name}
              img={item.img}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
