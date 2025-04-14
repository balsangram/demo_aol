import Home_1_TopCards from "../components/home/Home_1_TopCards";
import Home_2_Experience_Center_Digitally from "../components/home/Home_2_Experience_Center_Digitally";
import Home_3_Facilities_and_Services_at_Center from "../components/home/Home_3_Facilities_and_Services_at_Center";
import Home_4_Stay_Updated from "../components/home/Home_4_Stay_Updated";
import Home_5_Peace_With_Your_Squad from "../components/home/Home_5_Peace_With_Your_Squad";
import Home_6_Peace_Of_Mind from "../components/home/Home_6_Peace_Of_Mind";
import Home_7_Advertising from "../components/home/Home_7_Advertising";
import GlobalSearch from "../components/search/GlobalSearch";
import MobSearchPage from "../components/search/MobSearchPage";
// import SearchCard from "../components/search/SearchCard";

const Home = () => {
  return (
    <div
      style={{
        padding: "4rem 0 2rem",
        margin: "auto",
      }}
    >
      <MobSearchPage />
      {/* <SearchCard /> */}
      {/* Home  */}
      <Home_1_TopCards />

      {/* Experience_Center_Digitally */}
      <Home_2_Experience_Center_Digitally />

      {/* Facilities_and_Services_at_Center */}
      <Home_3_Facilities_and_Services_at_Center />

      {/* Stay_Updated  */}
      <Home_4_Stay_Updated />

      {/* Peace_With_Your_Squad */}
      <Home_5_Peace_With_Your_Squad />

      {/* Peace Of Mind */}
      <Home_6_Peace_Of_Mind />

      {/* Advertising */}
      <Home_7_Advertising />
    </div>
  );
};

export default Home;
