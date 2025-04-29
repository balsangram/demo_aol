import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Advertisement_Img } from "../../allapi/api";
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
  en: "UPCOMING PROGRAMS/ACTIVITIES AT THE CENTER",
  hi: "केंद्र में आगामी कार्यक्रम / गतिविधियाँ",
  kn: "ಕೇಂದ್ರದಲ್ಲಿ ನಿರೀಕ್ಷಿತ ಕಾರ್ಯಕ್ರಮಗಳು / ಚಟುವಟಿಕೆಗಳು",
  ta: "மையத்தில் வரவிருக்கும் நிகழ்ச்சிகள் / செயல்பாடுகள்",
  te: "కేంద్రంలో రాబోయే కార్యక్రమాలు / కార్యకలాపాలు",
  gu: "કેન્દ્રમાં આવનારા કાર્યક્રમો / પ્રવૃત્તિઓ",
  mr: "केंद्रातील आगामी कार्यक्रम / क्रियाकलाप",
  ml: "കേന്ദ്രത്തിലെ വരാനിരിക്കുന്ന പരിപാടികളും പ്രവർത്തനങ്ങളും",
  pa: "ਕੇਂਦਰ ਵਿੱਚ ਆਉਣ ਵਾਲੇ ਕਾਰਜਕ੍ਰਮ / ਗਤਿਵਿਧੀਆਂ",
  bn: "কেন্দ্রে আসন্ন প্রোগ্রাম / কার্যকলাপ",
  ru: "Предстоящие программы / мероприятия в центре",
  es: "Próximos programas/actividades en el centro",
  zh: "中心即将举行的节目/活动",
  mn: "Төвд болох хөтөлбөрүүд / үйл ажиллагаа",
  pl: "Nadchodzące programy / działania w centrum",
  bg: "Предстоящи програми / дейности в центъра",
  fr: "Programmes / activités à venir au centre",
  de: "Bevorstehende Programme / Aktivitäten im Zentrum",
  nl: "Aankomende programma's / activiteiten in het centrum",
  it: "Prossimi programmi / attività al centro",
  pt: "Próximos programas / atividades no centro",
  ja: "センターでの今後のプログラム/活動",
  vi: "Chương trình / hoạt động sắp tới tại trung tâm",
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

  return (
    <div>
      {loading && (
        <div className="flex gap-4 flex-wrap justify-center pb-12">
          {[1, 2, 3].map((_, j) => (
            <Skeleton
              key={j}
              height={300}
              width="100%"
              className="rounded-xl"
              style={{ borderRadius: "1rem" }}
            />
          ))}
        </div>
      )}
      {!loading && (
        <section className="py-8 sm:py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 sm:mb-12 font-cinzel">
              {/* ADVERTISEMENT BAR */}
              {/* UPCOMING PROGRAMS/ ACTIVITIES AT THE CENTER */}
              {upcomingProgramsTranslations[language] ||
                upcomingProgramsTranslations["en"]}
            </h1>

            <div className="relative z-0">
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
                    <a href={ad.link} target="_blank" rel="noopener noreferrer">
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
