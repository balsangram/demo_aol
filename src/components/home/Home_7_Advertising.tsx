import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { add_LinkLog, Advertisement_Img } from "../../allapi/api";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CustomLeftArrow from "../Carousel/CustomLeftArrow";
import CustomRightArrow from "../Carousel/CustomRightArrow";
import { useLanguage } from "../../context/LanguageContext";

interface Advertisement {
  link: string;
  img: string;
}

interface RawAdvertisement {
  [key: string]: {
    link: string;
    img: string;
  };
}

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
  mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

const upcomingProgramsTranslations: { [key: string]: string } = {
  en: "UPCOMING PROGRAMS/ACTIVITIES",
  hi: "आगामी कार्यक्रम / गतिविधियाँ",
  kn: "ನಿರೀಕ್ಷಿತ ಕಾರ್ಯಕ್ರಮಗಳು / ಚಟುವಟಿಕೆಗಳು",
  ta: "வரவிருக்கும் நிகழ்ச்சிகள் / செயல்பாடுகள்",
  te: "రాబోయే కార్యక్రమాలు / కార్యకలాపాలు",
  gu: "આવનારા કાર્યક્રમો / પ્રવૃત્તિઓ",
  mr: "आगामी कार्यक्रम / क्रियाकलाप",
  ml: "വരാനിരിക്കുന്ന പരിപാടികളും പ്രവർത്തനങ്ങളും",
  pa: "ਆਉਣ ਵਾਲੇ ਕਾਰਜਕ੍ਰਮ / ਗਤਿਵਿਧੀਆਂ",
  bn: "আসন্ন প্রোগ্রাম / কার্যকলাপ",
  ru: "Предстоящие программы / мероприятия",
  es: "Próximos programas / actividades",
  zh: "即将举行的节目/活动",
  mn: "Удахгүй болох хөтөлбөрүүд / үйл ажиллагаа",
  pl: "Nadchodzące programy / działania",
  bg: "Предстоящи програми / дейности",
  fr: "Programmes / activités à venir",
  de: "Bevorstehende Programme / Aktivitäten",
  nl: "Aankomende programma's / activiteiten",
  it: "Prossimi programmi / attività",
  pt: "Próximos programas / atividades",
  ja: "今後のプログラム/活動",
  vi: "Chương trình / hoạt động sắp tới",
};

const Home_7_Advertising: React.FC = () => {
  const { language } = useLanguage();
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(Advertisement_Img);
        // console.log(data.data, "response adv");

        if (data.data.length > 0) {
          const adData: RawAdvertisement = data.data[0];
          const extractedAds = Object.values(adData)
            .filter(
              (item) => typeof item === "object" && item?.img && item?.link
            )
            .map((item) => ({
              link: item.link,
              img: item.img,
            }));

          setAds(extractedAds);
        }
      } catch (error) {
        console.error("Failed to fetch ads:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  const clickLinkLog = () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    const payload = {
      userId: userId,
      // cardId: id,
      cardName: name,
    };

    console.log("Logging click:", payload);

    axios
      .post(add_LinkLog, payload)
      .then((response) => {
        console.log("Log response:", response);
      })
      .catch((error) => {
        console.error("Error logging click:", error);
      });
  };

  return (
    <div>
      {loading && (
        <div className="flex overflow-x-auto gap-8 pb-2 px-1 ">
          {[1, 2, 3, 4].map((_, index) => (
            <div
              key={index}
              className=" flex-shrink-0  rounded-2xl my-[3rem] h-[12rem] w-[22rem] gap-8"
            >
              <Skeleton height="15rem" width="22rem" className=" " />
            </div>
          ))}
        </div>
      )}
      {!loading && (
        <section className=" sm:pb-0 px-4">
          <div className="max-w-7xl mx-auto">
            <h1
              className="text-[24px] font-bold text-center sm:my-0 mt-0 font-cinzel "
              style={{
                lineHeight: "2rem",
              }}
            >
              {upcomingProgramsTranslations[language] ||
                upcomingProgramsTranslations["en"]}
            </h1>

            <div className="relative z-0 py-12 ">
              <Carousel
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={2000}
                keyBoardControl={true}
                customLeftArrow={<CustomLeftArrow />}
                customRightArrow={<CustomRightArrow />}
                containerClass="carousel-container relative"
                rtl={true}
              >
                {ads.map((ad, index) => (
                  <div key={index}>
                    <a
                      // href={ad.link}
                      href={ad?.link ? ad.link : "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        clickLinkLog({ name: ad.title });
                      }}
                    >
                      <img
                        src={ad.img}
                        alt={`Advertisement ${index + 1}`}
                        style={{
                          height: "40vh",
                          width: "96%",
                          objectFit: "cover",
                          borderRadius: "10px",
                        }}
                      />
                    </a>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home_7_Advertising;
