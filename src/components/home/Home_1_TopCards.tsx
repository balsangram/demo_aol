// src/components/Home_1_TopCards.tsx
import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import img1 from "../../assets/images/guruji1.jpg";
import img2 from "../../assets/images/guruji2.png";
import img3 from "../../assets/images/guruji3.jpg";
import img4 from "../../assets/images/guruji4.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

// Define type for the content of each item
interface Item {
  Contents: {
    [key: string]: string;
  };
  Links: string;
  img: string;
}

const items: Item[] = [
  {
    Contents: {
      en: "Our Founder",
      hi: "हमारा संस्थापक",
      kn: "ನಮ್ಮ ಸಂಸ್ಥಾಪಕ",
      ta: "எங்கள் நிறுவனர்",
      te: "మన స్థాపకుడు",
      gu: "અમારા સ્થાપક",
      mr: "आपले संस्थापक",
      ml: "നമ്മുടെ സ്ഥാപകൻ",
      pa: "ਸਾਡਾ ਸੰਸਥਾਪਕ",
      bn: "আমাদের প্রতিষ্ঠাতা",
      ru: "Наш основатель",
      es: "Nuestro Fundador",
      zh: "我们的创始人",
      mn: "Бидний үндэслэгч",
      pl: "Nasz Założyciel",
      bg: "Нашият основател",
      fr: "Notre Fondateur",
      de: "Unser Gründer",
      nl: "Onze Oprichter",
      it: "Il nostro Fondatore",
      pt: "Nosso Fundador",
      ja: "私たちの創設者",
      vi: "Người sáng lập của chúng tôi",
    },
    Links: "https://gurudev.artofliving.org/",
    img: img1,
  },
  {
    Contents: {
      en: "Bengaluru International Center",
      hi: "बैंगलोर अंतर्राष्ट्रीय केंद्र",
      kn: "ಬೆಂಗಳೂರು ಅಂತಾರಾಷ್ಟ್ರೀಯ ಕೇಂದ್ರ",
      ta: "பெங்களூரு பன்னாட்டு மையம்",
      te: "బెంగళూరు అంతర్జాతీయ కేంద్రం",
      gu: "બેંગલુરુ આંતરરાષ્ટ્રીય કેન્દ્ર",
      mr: "बेंगळुरू आंतरराष्ट्रीय केंद्र",
      ml: "ബംഗളൂരു അന്താരാഷ്ട്ര കേന്ദ്രം",
      pa: "ਬੈਂਗਲੁਰੂ ਅੰਤਰਰਾਸ਼ਟਰੀ ਕੇਂਦਰ",
      bn: "বেঙ্গালুরু আন্তর্জাতিক কেন্দ্র",
      ru: "Бангалорский международный центр",
      es: "Centro Internacional de Bangalore",
      zh: "班加罗尔国际中心",
      mn: "Бангалорын Олон улсын төв",
      pl: "Międzynarodowe Centrum w Bangalore",
      bg: "Международен център в Бангалор",
      fr: "Centre International de Bangalore",
      de: "Internationales Zentrum Bangalore",
      nl: "Internationaal Centrum Bangalore",
      it: "Centro Internazionale di Bangalore",
      pt: "Centro Internacional de Bangalore",
      ja: "バンガロール国際センター",
      vi: "Trung tâm Quốc tế Bangalore",
    },
    Links: "https://bangaloreashram.org/",
    img: img2,
  },
  {
    Contents: {
      en: "Register for Programs",
      hi: "कार्यक्रमों के लिए पंजीकरण करें",
      kn: "ಕಾರ್ಯಕ್ರಮಗಳಿಗಾಗಿ ನೋಂದಾಯಿಸಿ",
      ta: "பணிகள் பதிவு செய்யவும்",
      te: "ప్రోగ్రామ్‌ల కోసం నమోదు చేసుకోండి",
      gu: "કાર્યક્રમો માટે નોંધણી કરો",
      mr: "कार्यक्रमांसाठी नोंदणी करा",
      ml: "പ്രോഗ്രാമുകൾക്ക് രജിസ്റ്റർ ചെയ്യുക",
      pa: "ਕਾਰਜਕ੍ਰਮਾਂ ਲਈ ਰਜਿਸਟਰ ਕਰੋ",
      bn: "অনুষ্ঠানগুলির জন্য নিবন্ধন করুন",
      ru: "Зарегистрируйтесь на программы",
      es: "Regístrate para programas",
      zh: "注册项目",
      mn: "Хөтөлбөрүүдэд бүртгүүлнэ үү",
      pl: "Zarejestruj się na programy",
      bg: "Регистрирайте се за програми",
      fr: "Inscrivez-vous aux programmes",
      de: "Für Programme registrieren",
      nl: "Registreer voor programma's",
      it: "Registrati ai programmi",
      pt: "Registre-se para programas",
      ja: "プログラムに登録する",
      vi: "Đăng ký cho các chương trình",
    },
    Links: "https://programs.vvmvp.org/",
    img: img3,
  },
  {
    Contents: {
      en: "Visitor Services",
      hi: "आगंतुक सेवाएं",
      kn: "ಸಂದರ್ಶಕರ ಸೇವೆಗಳು",
      ta: "பார்வையாளர் சேவைகள்",
      te: "సందర్శక సేవలు",
      gu: "મુલાકાત સેવાઓ",
      mr: "पर्यटक सेवाएं",
      ml: "സന്ദർശക സേവനങ്ങൾ",
      pa: "ਦਰਸ਼ਕ ਸੇਵਾਵਾਂ",
      bn: "দর্শনার্থী পরিষেবাসমূহ",
      ru: "Сервисы для посетителей",
      es: "Servicios para Visitantes",
      zh: "访客服务",
      mn: "Зочдод зориулсан үйлчилгээ",
      pl: "Usługi dla gości",
      bg: "Услуги за посетители",
      fr: "Services aux visiteurs",
      de: "Besucherservices",
      nl: "Bezoekersdiensten",
      it: "Servizi per i visitatori",
      pt: "Serviços para visitantes",
      ja: "訪問者サービス",
      vi: "Các dịch vụ khách tham quan",
    },
    Links: "http://aolic.org/kiosk",
    img: img4,
  },
];

const FAVORITES_STORAGE_KEY = "favoriteCards";

const Home_1_TopCards: React.FC = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState<boolean>(true);
  const [favorites, setFavorites] = useState<{ [key: number]: boolean }>({});

  // Load favorites from localStorage when component mounts
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Failed to parse saved favorites", error);
      }
    }
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (index: number) => {
    setFavorites((prev) => {
      const newFavorites = {
        ...prev,
        [index]: !prev[index],
      };
      return newFavorites;
    });
  };

  const handleClick = (link: string) => {
    window.open(link, "_blank");
  };

  const logCardClick = (title: string) => {
    console.log(`Card clicked: ${title}`);
  };

  return (
    <div className="px-4 pt-10 lg:pt-0">
      <div className="flex flex-wrap justify-center gap-6">
        {loading ? (
          items.map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-2xl w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px]"
            >
              <div className="mb-3">
                <Skeleton height="5rem" width="5rem" circle />
              </div>
              <div className="w-[70%]">
                <Skeleton
                  height="1rem"
                  baseColor="#e0e0e0"
                  highlightColor="#f5f5f5"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-wrap justify-center gap-6 pb-12 m-auto">
            {items.map((item, index) => {
              const name = item.Contents[language] || item.Contents.en;
              const maxChar = 15;

              return (
                <div
                  key={index}
                  className="flex sm:p-10 p-2 bg-[#ffffff7e] text-[#06202B] 
                            hover:font-bold hover:scale-105 hover:px-8 
                            flex-col cursor-pointer min-w-6 h-[140px] 
                            w-[140px] sm:w-[15rem] sm:h-[15rem] 
                            md:rounded-[4px] rounded-[16px] transition-all duration-500 ease-in-out"
                  onClick={() => {
                    handleClick(item.Links);
                    logCardClick(name);
                  }}
                >
                  <div className="flex flex-row-reverse">
                    {favorites[index] ? (
                      <FavoriteIcon
                        className="text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(index);
                        }}
                      />
                    ) : (
                      <FavoriteBorderIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(index);
                        }}
                      />
                    )}
                  </div>

                  <img
                    src={item.img}
                    alt={name}
                    className="h-20 w-20 mx-auto rounded-full"
                  />

                  <p className="text-center m-auto text-[14px] sm:text-[16px] sm:mt-4 mt-1 flex justify-center items-center font-bold h-[1rem]">
                    {name.length > maxChar
                      ? name.slice(0, maxChar) + "..."
                      : name}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home_1_TopCards;
