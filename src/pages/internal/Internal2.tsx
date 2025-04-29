import React, { useEffect, useState } from "react";
import Card from "../../components/cards/Card";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { all_action, userType_action } from "../../allapi/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useLanguage } from "../../context/LanguageContext";

interface card {
  action: string;
  link: string;
  img: string;
  usertype: string;
}

const noActionsMessages: { [key: string]: string } = {
  en: "No actions available.",
  hi: "कोई क्रियाएं उपलब्ध नहीं हैं।",
  kn: "ಯಾವುದೇ ಕ್ರಿಯೆಗಳು ಲಭ್ಯವಿಲ್ಲ.",
  ta: "செயல்கள் எதுவும் இல்லை.",
  te: "ప్రవర్తనలు అందుబాటులో లేవు.",
  gu: "કોઈ ક્રિયાઓ ઉપલબ્ધ નથી.",
  mr: "कृती उपलब्ध नाहीत.",
  ml: "പ്രവർത്തനങ്ങൾ ലഭ്യമല്ല.",
  pa: "ਕੋਈ ਕਾਰਵਾਈਆਂ ਉਪਲਬਧ ਨਹੀਂ ਹਨ।",
  bn: "কোনও কর্ম নেই।",
  ru: "Нет доступных действий.",
  es: "No hay acciones disponibles.",
  zh: "没有可用的操作。",
  mn: "Ашиглах боломжтой үйлдэл алга.",
  pl: "Brak dostępnych działań.",
  bg: "Няма налични действия.",
  fr: "Aucune action disponible.",
  de: "Keine Aktionen verfügbar.",
  nl: "Geen acties beschikbaar.",
  it: "Nessuna azione disponibile.",
  pt: "Nenhuma ação disponível.",
  ja: "利用可能な操作はありません。",
  vi: "Không có hành động nào khả dụng.",
};

function Internal2() {
  const location = useLocation();
  const userType = location.state?.usertype;

  const [loading, setLoading] = useState(true);
  const [internal, setInternal] = useState<card[]>([]);
  const { language } = useLanguage();
  // const [userTypeName, setUSerTypeName] = useState<string | undefined>();

  // console.log(language, "language");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${all_action}/${userType}/${language}`
        );
        // const response = await axios.get(`${userType_action}/${userType}`);
        console.log(response, "response");

        setInternal(response.data);
      } catch (error) {
        console.error("Error fetching user types:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userType) {
      fetchData();
    }
  }, [userType]);

  return (
    <div className="text-center px-4 mt-12 min-h-[100vh]">
      {internal.length > 0 && (
        <h2 className="text-3xl font-bold font-[Cinzel] mb-8 capitalize">
          {internal[0].usertype}
        </h2>
      )}

      <div className="flex gap-12 flex-wrap justify-center">
        {loading ? (
          <div className="flex gap-6 flex-wrap justify-center pb-12">
            {[1, 2, 3, 4].map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 bg-[#ffffff7e] rounded-[16px] w-[150px] h-[150px] sm:w-[15rem] sm:h-[15rem]"
              >
                <Skeleton
                  height="5rem"
                  width="5rem"
                  circle
                  style={{ marginBottom: "1rem" }}
                />
                <Skeleton width="70%" height="1.5rem" />
              </div>
            ))}
          </div>
        ) : internal.length > 0 ? (
          internal.map((item, index) => (
            <Card
              key={index}
              link={item.link}
              name={item.action}
              img={item.img}
            />
          ))
        ) : (
          <p className="text-gray-500 text-lg mt-4">
            {noActionsMessages[language] || "No actions available."}
          </p>
        )}
      </div>
    </div>
  );
}

export default Internal2;
