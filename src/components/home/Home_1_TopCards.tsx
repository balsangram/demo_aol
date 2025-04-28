// src/components/Home_1_TopCards.tsx
import React, { useState, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import Card from "../cards/Card";
import img1 from "../../assets/images/guruji1.jpg";
import img2 from "../../assets/images/guruji2.png";
import img3 from "../../assets/images/guruji3.jpg";
import img4 from "../../assets/images/guruji4.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Define type for the content of each item
interface Item {
  Contents: {
    [key: string]: string; // { [languageCode: string]: text }
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
      en: "Visitor Service",
      hi: "आगंतुक सेवा",
      kn: "ಭೇಟಿಯಾಳು ಸೇವೆ",
      ta: "பார்வையாளர் சேவை",
      te: "సందర్శక సేవ",
      gu: "મુલાકાત સેવા",
      mr: "पर्यटक सेवा",
      ml: "സന്ദർശക സേവനം",
      pa: "ਦਰਸ਼ਕ ਸੇਵਾ",
      bn: "দর্শনার্থী পরিষেবা",
      ru: "Сервис для посетителей",
      es: "Servicio para Visitantes",
      zh: "访客服务",
      mn: "Зочдын үйлчилгээ",
      pl: "Obsługa Gości",
      bg: "Услуги за посетители",
      fr: "Service des Visiteurs",
      de: "Besucherservice",
      nl: "Bezoekersservice",
      it: "Servizio Visitatori",
      pt: "Serviço de Visitantes",
      ja: "訪問者サービス",
      vi: "Dịch vụ khách tham quan",
    },
    Links: "http://aolic.org/kiosk",
    img: img4,
  },
];

const Home_1_TopCards: React.FC = () => {
  const { language } = useLanguage(); // Use the current language from context
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-4 pt-8 sm:pt-0">
      <div className="flex flex-wrap justify-center gap-6">
        {loading ? (
          items.map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-2xl w-[140px] h-[140px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px]"
            >
              <Skeleton height="5rem" width="5rem" circle />
              <Skeleton width="70%" height="1.5rem" className="mt-2" />
            </div>
          ))
        ) : (
          <div className="flex flex-wrap justify-center gap-6 ">
            {items.map((item, index) => (
              <Card
                key={index}
                link={item.Links}
                name={item.Contents[language] || item.Contents["en"]}
                img={item.img}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home_1_TopCards;
