// "use client";

// import axios from "axios";
// import { useEffect, useState, useCallback } from "react";
// import {
//   display_facourite,
//   display_facourite_home,
//   Home_Type_importance_id,
//   Home_user_Type_importance,
//   user_Type,
//   user_Type_importance,
// } from "../../allapi/api";
// import Card from "../../components/cards/Card";
// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
// import img1 from "../../assets/images/guruji1.jpg";
// import img2 from "../../assets/images/guruji2.png";
// import img3 from "../../assets/images/guruji3.jpg";
// import img4 from "../../assets/images/guruji4.png";

// interface CardItem {
//   _id: string;
//   name: string;
//   link: string;
//   img: string;
// }

// interface Item {
//   Contents: {
//     [key: string]: string;
//   };
//   Links: string;
//   img: string;
// }

// const items: Item[] = [
//   {
//     Contents: {
//       en: "Our Founder",
//       hi: "हमारा संस्थापक",
//       kn: "ನಮ್ಮ ಸಂಸ್ಥಾಪಕ",
//       ta: "எங்கள் நிறுவனர்",
//       te: "మన స్థాపకుడు",
//       gu: "અમારા સ્થાપક",
//       mr: "आपले संस्थापक",
//       ml: "നമ്മുടെ സ്ഥാപകൻ",
//       pa: "ਸਾਡਾ ਸੰਸਥਾਪਕ",
//       bn: "আমাদের প্রতিষ্ঠাতা",
//       ru: "Наш основатель",
//       es: "Nuestro Fundador",
//       zh: "我们的创始人",
//       mn: "Бидний үндэслэгч",
//       pl: "Nasz Założyciel",
//       bg: "Нашият основател",
//       fr: "Notre Fondateur",
//       de: "Unser Gründer",
//       nl: "Onze Oprichter",
//       it: "Il nostro Fondatore",
//       pt: "Nosso Fundador",
//       ja: "私たちの創設者",
//       vi: "Người sáng lập của chúng tôi",
//     },
//     Links: "https://gurudev.artofliving.org/",
//     img: img1,
//   },
//   {
//     Contents: {
//       en: "Bengaluru International Center",
//       hi: "बैंगलोर अंतर्राष्ट्रीय केंद्र",
//       kn: "ಬೆಂಗಳೂರು ಅಂತಾರಾಷ್ಟ್ರೀಯ ಕೇಂದ್ರ",
//       ta: "பெங்களூரு பன்னாட்டு மையம்",
//       te: "బెంగళూరు అంతర్జాతీయ కేంద్రం",
//       gu: "બેંગલુરુ આંતરરાષ્ટ્રીય કેન્દ્ર",
//       mr: "बेंगळुरू आंतरराष्ट्रीय केंद्र",
//       ml: "ബംഗളൂരു അന്താരാഷ്ട്ര കേന്ദ്രം",
//       pa: "ਬੈਂਗਲੁਰੂ ਅੰਤਰਰਾਸ਼ਟਰੀ ਕੇਂਦਰ",
//       bn: "বেঙ্গালুরু আন্তর্জাতিক কেন্দ্র",
//       ru: "Бангалорский международный центр",
//       es: "Centro Internacional de Bangalore",
//       zh: "班加罗尔国际中心",
//       mn: "Бангалорын Олон улсын төв",
//       pl: "Międzynarodowe Centrum w Bangalore",
//       bg: "Международен център в Бангалор",
//       fr: "Centre International de Bangalore",
//       de: "Internationales Zentrum Bangalore",
//       nl: "Internationaal Centrum Bangalore",
//       it: "Centro Internazionale di Bangalore",
//       pt: "Centro Internacional de Bangalore",
//       ja: "バンガロール国際センター",
//       vi: "Trung tâm Quốc tế Bangalore",
//     },
//     Links: "https://bangaloreashram.org/",
//     img: img2,
//   },
//   {
//     Contents: {
//       en: "Register for Programs",
//       hi: "कार्यक्रमों के लिए पंजीकरण करें",
//       kn: "ಕಾರ್ಯಕ್ರಮಗಳಿಗಾಗಿ ನೋಂದಾಯಿಸಿ",
//       ta: "பணிகள் பதிவு செய்யவும்",
//       te: "ప్రోగ్రామ్‌ల కోసం నమోదు చేసుకోండి",
//       gu: "કાર્યક્રમો માટે નોંધણી કરો",
//       mr: "कार्यक्रमांसाठी नोंदणी करा",
//       ml: "പ്രോഗ്രാമുകൾക്ക് രജിസ്റ്റർ ചെയ്യുക",
//       pa: "ਕਾਰਜਕ੍ਰਮਾਂ ਲਈ ਰਜਿਸਟਰ ਕਰੋ",
//       bn: "অনুষ্ঠানগুলির জন্য নিবন্ধন করুন",
//       ru: "Зарегистрируйтесь на программы",
//       es: "Regístrate para programas",
//       zh: "注册项目",
//       mn: "Хөтөлбөрүүдэд бүртгүүлнэ үү",
//       pl: "Zarejestruj się na programy",
//       bg: "Регистрирайте се за програми",
//       fr: "Inscrivez-vous aux programmes",
//       de: "Für Programme registrieren",
//       nl: "Registreer voor programma's",
//       it: "Registrati ai programmi",
//       pt: "Registre-se para programas",
//       ja: "プログラムに登録する",
//       vi: "Đăng ký cho các chương trình",
//     },
//     Links: "https://programs.vvmvp.org/",
//     img: img3,
//   },
//   {
//     Contents: {
//       en: "Visitor Services",
//       hi: "आगंतुक सेवाएं",
//       kn: "ಸಂದರ್ಶಕರ ಸೇವೆಗಳು",
//       ta: "பார்வையாளர் சேவைகள்",
//       te: "సందర్శక సేవలు",
//       gu: "મુલાકાત સેવાઓ",
//       mr: "पर्यटक सेवाएं",
//       ml: "സന്ദർശക സേവനങ്ങൾ",
//       pa: "ਦਰਸ਼ਕ ਸੇਵਾਵਾਂ",
//       bn: "দর্শনার্থী পরিষেবাসমূহ",
//       ru: "Сервисы для посетителей",
//       es: "Servicios para Visitantes",
//       zh: "访客服务",
//       mn: "Зочдод зориулсан үйлчилгээ",
//       pl: "Usługi dla gości",
//       bg: "Услуги за посетители",
//       fr: "Services aux visiteurs",
//       de: "Besucherservices",
//       nl: "Bezoekersdiensten",
//       it: "Servizi per i visitatori",
//       pt: "Serviços para visitantes",
//       ja: "訪問者サービス",
//       vi: "Các dịch vụ khách tham quan",
//     },
//     Links: "http://aolic.org/kiosk",
//     img: img4,
//   },
// ];

// function Favourite() {
//   const userId = localStorage.getItem("userId");
//   const [internalItems, setInternalItems] = useState<CardItem[]>([]);
//   const [homeItems, setHomeItems] = useState<CardItem[]>([]);
//   const [loadingInternal, setLoadingInternal] = useState(true);
//   const [loadingHome, setLoadingHome] = useState(true);
//   const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

//   // Unified favorite toggle function for internal items
//   const handleToggleInternalFavorite = useCallback(
//     async (cardId: string) => {
//       if (!userId) return;

//       try {
//         await axios.post(`${user_Type_importance}/${userId}`, { cardId });
//         setFavoriteIds((prev) => {
//           const isFavorite = prev.includes(cardId);
//           return isFavorite
//             ? prev.filter((itemId) => itemId !== cardId)
//             : [...prev, cardId];
//         });
//       } catch (error) {
//         console.error("Error toggling internal favorite:", error);
//       }
//     },
//     [userId]
//   );

//   // Unified favorite toggle function for home items
//   const handleToggleHomeFavorite = useCallback(
//     async (cardId: string) => {
//       if (!userId) return;

//       try {
//         await axios.post(`${Home_user_Type_importance}/${userId}`, { cardId });
//         setFavoriteIds((prev) => {
//           const isFavorite = prev.includes(cardId);
//           return isFavorite
//             ? prev.filter((itemId) => itemId !== cardId)
//             : [...prev, cardId];
//         });
//       } catch (error) {
//         console.error("Error toggling home favorite:", error);
//       }
//     },
//     [userId]
//   );

//   // Fetch favorite IDs
//   useEffect(() => {
//     const fetchFavoriteIds = async () => {
//       if (!userId) return;

//       try {
//         const [homeResponse, userResponse] = await Promise.all([
//           axios.get(`${Home_Type_importance_id}/${userId}`),
//           axios.get(`${user_Type}/${userId}`),
//         ]);

//         const combinedIds = [
//           ...(homeResponse.data?.CardTypes || []),
//           ...(userResponse.data?.userTypes || []),
//         ];

//         const uniqueIds = [...new Set(combinedIds)];
//         setFavoriteIds(uniqueIds);
//       } catch (error) {
//         console.error("Error fetching favorite IDs:", error);
//         setFavoriteIds([]);
//       }
//     };

//     fetchFavoriteIds();
//   }, [userId]);

//   // Fetch internal favorites
//   useEffect(() => {
//     const fetchInternalFavorites = async () => {
//       if (!userId) return;

//       try {
//         const response = await axios.get(`${display_facourite}/${userId}`);
//         console.log("🚀 ~ fetchInternalFavorites ~ response:", response.data);
//         const data = response.data.userTypes || [];
//         setInternalItems(data);
//       } catch (error) {
//         console.error("Error fetching internal favorites:", error);
//         setInternalItems([]);
//       } finally {
//         setLoadingInternal(false);
//       }
//     };

//     fetchInternalFavorites();
//   }, [userId]);

//   // Fetch home favorites
//   useEffect(() => {
//     const fetchHomeFavorites = async () => {
//       if (!userId) return;

//       try {
//         const response = await axios.get(`${display_facourite_home}/${userId}`);
//         const data = response.data.userTypes || [];
//         setHomeItems(data);
//       } catch (error) {
//         console.error("Error fetching home favorites:", error);
//         setHomeItems([]);
//       } finally {
//         setLoadingHome(false);
//       }
//     };

//     fetchHomeFavorites();
//   }, [userId]);

//   const renderSkeletonCards = (keyPrefix: string) => (
//     <div className="w-full text-center sm:my-4 px-4 mt-4 mb-6">
//       <Skeleton
//         height={30}
//         width={260}
//         className="mx-auto mb-6"
//         style={{ borderRadius: "8px" }}
//       />
//       <div className="flex gap-6 flex-wrap justify-center sm:pb-12">
//         {[1, 2, 3, 4].map((_, index) => (
//           <div
//             key={`${keyPrefix}-skeleton-${index}`}
//             className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-2xl w-[140px] h-[140px] sm:w-[200px] sm:h-[200px]"
//           >
//             <div className="mb-3">
//               <Skeleton height="5rem" width="5rem" circle />
//             </div>
//             <div className="w-[70%]">
//               <Skeleton height="1rem" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const renderFavoriteSection = (
//     title: string,
//     items: CardItem[],
//     loading: boolean,
//     onToggle: (cardId: string) => void,
//     keyPrefix: string
//   ) => (
//     <div className="favorites-section">
//       {loading ? (
//         renderSkeletonCards(keyPrefix)
//       ) : (
//         <div className="text-center px-4">
//           <h2 className="text-2xl sm:text-3xl font-bold font-cinzel mb-2">
//             {title}
//           </h2>
//           {items.length > 0 ? (
//             <div className="flex flex-wrap justify-center gap-3 py-12">
//               {items.map((item) => (
//                 <Card
//                   key={`${keyPrefix}-${item._id}`}
//                   id={item._id}
//                   link={item.link || "#"}
//                   name={item.name}
//                   img={item.img}
//                   isFavorite={favoriteIds.includes(item._id)}
//                   onFavoriteToggle={onToggle}
//                 />
//               ))}
//             </div>
//           ) : (
//             <p className="py-12">No {title.toLowerCase()} found</p>
//           )}
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <div className="favorites-container">
//       {renderFavoriteSection(
//         "Internal Favorites",
//         internalItems,
//         loadingInternal,
//         handleToggleInternalFavorite,
//         "internal"
//       )}
//       {renderFavoriteSection(
//         "Home Favorites",
//         homeItems,
//         loadingHome,
//         handleToggleHomeFavorite,
//         "home"
//       )}
//     </div>
//   );
// }

// export default Favourite;

"use client";

import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import {
  display_facourite,
  display_facourite_home,
  Home_Type_importance_id,
  Home_user_Type_importance,
  user_Type,
  user_Type_importance,
} from "../../allapi/api";
import Card from "../../components/cards/Card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import img1 from "../../assets/images/guruji1.jpg"; // Image to display when no cards are available
import StaticFavourite from "./StaticFavourite";

interface CardItem {
  _id: string;
  name: string;
  link: string;
  img: string;
}

const Favourite: React.FC = () => {
  const userId = localStorage.getItem("userId");
  const [internalItems, setInternalItems] = useState<CardItem[]>([]);
  const [homeItems, setHomeItems] = useState<CardItem[]>([]);
  const [loadingInternal, setLoadingInternal] = useState(true);
  const [loadingHome, setLoadingHome] = useState(true);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Toggle favorite for internal items
  const handleToggleInternalFavorite = useCallback(
    async (cardId: string) => {
      if (!userId) return;

      try {
        await axios.post(`${user_Type_importance}/${userId}`, { cardId });
        setFavoriteIds((prev) =>
          prev.includes(cardId)
            ? prev.filter((itemId) => itemId !== cardId)
            : [...prev, cardId]
        );
      } catch (error) {
        console.error("Error toggling internal favorite:", error);
      }
    },
    [userId]
  );

  // Toggle favorite for home items
  const handleToggleHomeFavorite = useCallback(
    async (cardId: string) => {
      if (!userId) return;

      try {
        await axios.post(`${Home_user_Type_importance}/${userId}`, { cardId });
        setFavoriteIds((prev) =>
          prev.includes(cardId)
            ? prev.filter((itemId) => itemId !== cardId)
            : [...prev, cardId]
        );
      } catch (error) {
        console.error("Error toggling home favorite:", error);
      }
    },
    [userId]
  );

  // Fetch favorite IDs
  useEffect(() => {
    const fetchFavoriteIds = async () => {
      if (!userId) {
        setFavoriteIds([]);
        return;
      }

      try {
        const [homeResponse, userResponse] = await Promise.all([
          axios.get(`${Home_Type_importance_id}/${userId}`),
          axios.get(`${user_Type}/${userId}`),
        ]);

        const combinedIds = [
          ...(homeResponse.data?.CardTypes || []),
          ...(userResponse.data?.userTypes || []),
        ];
        setFavoriteIds([...new Set(combinedIds)]);
      } catch (error) {
        console.error("Error fetching favorite IDs:", error);
        setFavoriteIds([]);
      }
    };

    fetchFavoriteIds();
  }, [userId]);

  // Fetch internal favorites
  useEffect(() => {
    const fetchInternalFavorites = async () => {
      if (!userId) {
        setInternalItems([]);
        setLoadingInternal(false);
        return;
      }

      try {
        const response = await axios.get(`${display_facourite}/${userId}`);
        setInternalItems(response.data.userTypes || []);
      } catch (error) {
        console.error("Error fetching internal favorites:", error);
        setInternalItems([]);
      } finally {
        setLoadingInternal(false);
      }
    };

    fetchInternalFavorites();
  }, [userId]);

  // Fetch home favorites
  useEffect(() => {
    const fetchHomeFavorites = async () => {
      if (!userId) {
        setHomeItems([]);
        setLoadingHome(false);
        return;
      }

      try {
        const response = await axios.get(`${display_facourite_home}/${userId}`);
        setHomeItems(response.data.userTypes || []);
      } catch (error) {
        console.error("Error fetching home favorites:", error);
        setHomeItems([]);
      } finally {
        setLoadingHome(false);
      }
    };

    fetchHomeFavorites();
  }, [userId]);

  // Render skeleton cards during loading
  const renderSkeletonCards = (keyPrefix: string) => (
    <div className="w-full text-center sm:my-4 px-4 mt-4 mb-6">
      <Skeleton
        height={30}
        width={260}
        className="mx-auto mb-6"
        style={{ borderRadius: "8px" }}
      />
      <div className="flex gap-6 flex-wrap justify-center sm:pb-12">
        {[1, 2, 3, 4].map((_, index) => (
          <div
            key={`${keyPrefix}-skeleton-${index}`}
            className="flex flex-col items-center justify-center p-4 bg-white/50 rounded-2xl w-[140px] h-[140px] sm:w-[200px] sm:h-[200px]"
          >
            <div className="mb-3">
              <Skeleton height="5rem" width="5rem" circle />
            </div>
            <div className="w-[70%]">
              <Skeleton height="1rem" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render favorite section with cards
  const renderFavoriteSection = (
    title: string,
    items: CardItem[],
    loading: boolean,
    onToggle: (cardId: string) => void,
    keyPrefix: string
  ) => {
    if (loading) return renderSkeletonCards(keyPrefix);
    if (items.length === 0) return null; // Hide section if no items

    return (
      <div className="text-center px-4">
        <h2 className="text-2xl sm:text-3xl font-bold font-cinzel mb-2">
          {title}
        </h2>
        <div className="flex flex-wrap justify-center gap-3 py-12">
          {items.map((item) => (
            <Card
              key={`${keyPrefix}-${item._id}`}
              id={item._id}
              link={item.link || "#"}
              name={item.name}
              img={item.img}
              isFavorite={favoriteIds.includes(item._id)}
              onFavoriteToggle={onToggle}
            />
          ))}
        </div>
      </div>
    );
  };

  // Render fallback image when no cards are available
  const renderFallbackImage = () => (
    <div className="flex justify-center items-center py-12">
      <img
        src={img1}
        alt="No favorites available"
        className="w-full max-w-md h-auto rounded-lg"
      />
    </div>
  );

  // Check if both sections are empty and not loading
  const isEmpty =
    !loadingInternal &&
    !loadingHome &&
    internalItems.length === 0 &&
    homeItems.length === 0;

  return (
    <div className="favorites-containe min-h-[70vh]">
      {isEmpty ? (
        renderFallbackImage()
      ) : (
        <>
        <StaticFavourite />
          {renderFavoriteSection(
            "FAVOURITE INTERNAL LINKS",
            internalItems,
            loadingInternal,
            handleToggleInternalFavorite,
            "internal"
          )}
          {renderFavoriteSection(
            "Home Favorites",
            homeItems,
            loadingHome,
            handleToggleHomeFavorite,
            "home"
          )}
        </>
      )}
    </div>
  );
};

export default Favourite;
