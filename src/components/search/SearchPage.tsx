import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../cards/Card";
import MobSearchPage from "./MobSearchPage";
import { useLanguage } from "../../context/LanguageContext";

// Define the translations object for all languages
const translations = {
  en: {
    searchResults: "Search Results",
    noResultsFound: "No results found",
  },
  hi: {
    searchResults: "खोज परिणाम",
    noResultsFound: "कोई परिणाम नहीं मिला",
  },
  kn: {
    searchResults: "ಹುಡುಕುವ ಫಲಿತಾಂಶಗಳು",
    noResultsFound: "ಯಾವುದೇ ಫಲಿತಾಂಶಗಳನ್ನು ಕಂಡುಹಿಡಿದಿಲ್ಲ",
  },
  ta: {
    searchResults: "தேடும் முடிவுகள்",
    noResultsFound: "ஏதும் முடிவுகள் இல்லை",
  },
  te: {
    searchResults: "వెతుకుతున్న ఫలితాలు",
    noResultsFound: "ఏ ఫలితాలు కనుగొనబడలేదు",
  },
  gu: {
    searchResults: "શોધ પરિણામો",
    noResultsFound: "કોઈ પરિણામો મળ્યા નથી",
  },
  mr: {
    searchResults: "शोध निकाल",
    noResultsFound: "कुठलेही निकाल मिळाले नाहीत",
  },
  ml: {
    searchResults: "തിരച്ചിൽ ഫലങ്ങൾ",
    noResultsFound: "ഏതെങ്കിലും ഫലങ്ങൾ കണ്ടെത്തിയില്ല",
  },
  pa: {
    searchResults: "ਖੋਜ ਨਤੀਜੇ",
    noResultsFound: "ਕੋਈ ਨਤੀਜੇ ਨਹੀਂ ਮਿਲੇ",
  },
  bn: {
    searchResults: "অনুসন্ধান ফলাফল",
    noResultsFound: "কোনও ফলাফল পাওয়া যায়নি",
  },
  ru: {
    searchResults: "Результаты поиска",
    noResultsFound: "Результаты не найдены",
  },
  es: {
    searchResults: "Resultados de búsqueda",
    noResultsFound: "No se encontraron resultados",
  },
  zh: {
    searchResults: "搜索结果",
    noResultsFound: "未找到结果",
  },
  mn: {
    searchResults: "Хайлтын үр дүн",
    noResultsFound: "Үр дүн олдсонгүй",
  },
  pl: {
    searchResults: "Wyniki wyszukiwania",
    noResultsFound: "Nie znaleziono wyników",
  },
  bg: {
    searchResults: "Резултати от търсенето",
    noResultsFound: "Не са намерени резултати",
  },
  fr: {
    searchResults: "Résultats de recherche",
    noResultsFound: "Aucun résultat trouvé",
  },
  de: {
    searchResults: "Suchergebnisse",
    noResultsFound: "Keine Ergebnisse gefunden",
  },
  nl: {
    searchResults: "Zoekresultaten",
    noResultsFound: "Geen resultaten gevonden",
  },
  it: {
    searchResults: "Risultati della ricerca",
    noResultsFound: "Nessun risultato trovato",
  },
  pt: {
    searchResults: "Resultados da pesquisa",
    noResultsFound: "Nenhum resultado encontrado",
  },
  ja: {
    searchResults: "検索結果",
    noResultsFound: "結果が見つかりませんでした",
  },
  vi: {
    searchResults: "Kết quả tìm kiếm",
    noResultsFound: "Không tìm thấy kết quả",
  },
};

// Define the type for supported languages
type Language = keyof typeof translations;

type ResultItem = {
  link: string;
  name: string;
  img: string;
};

const SearchPage: React.FC = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const results: ResultItem[] = location.state?.searchResults || [];
  // console.log(results, "results");

  // Assuming language is stored in the location state or some global state
  const Gobal_language: Language = (language || "en") as Language; // Cast to the Language type

  // Get the translations for the current language
  const searchResultsText =
    translations[Gobal_language]?.searchResults ||
    translations.en.searchResults;
  const noResultsFoundText =
    translations[Gobal_language]?.noResultsFound ||
    translations.en.noResultsFound;

  // 🔁 Redirect back if no search data
  useEffect(() => {
    if (!location.state?.searchResults) {
      navigate("/");
    }
  }, [location.state, navigate]);

  return (
    <div className="sm:p-6 p-2 min-h-[70vh]">
      <MobSearchPage />
      <h2 className="text-2xl text-center sm:text-left sm:pl-8 font-semibold sm:mb-6 my-3 mt-20 sm:mt-0">
        {searchResultsText}
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
        <p className="text-gray-500">{noResultsFoundText}</p>
      )}
    </div>
  );
};

export default SearchPage;
