// import { createContext, useContext, useEffect, useState } from "react";

// const LanguageContext = createContext<{
//   language: string;
//   setLanguage: (lang: string) => void;
// }>({
//   language: "en",
//   setLanguage: () => {},
// });

// export function LanguageProvider({ children }: { children: React.ReactNode }) {
//   const [language, setLanguage] = useState<string>(
//     localStorage.getItem("language") || "en"
//   );

//   useEffect(() => {
//     const handleLanguageChange = () => {
//       const newLang = localStorage.getItem("language") || "en";
//       setLanguage(newLang);
//     };

//     window.addEventListener("languageChange", handleLanguageChange);

//     return () => {
//       window.removeEventListener("languageChange", handleLanguageChange);
//     };
//   }, []);

//   return (
//     <LanguageContext.Provider value={{ language, setLanguage }}>
//       {children}
//     </LanguageContext.Provider>
//   );
// }

// export const useLanguage = () => useContext(LanguageContext);

import React, { createContext, useContext, useState, useEffect } from "react";

// Language Context
const LanguageContext = createContext<{
  language: string;
  setLanguage: (lang: string) => void;
}>({
  language: "en", // default language
  setLanguage: () => {},
});

// Language Provider component
export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("language") || "en"
  );

  // Change language based on localStorage
  useEffect(() => {
    const lang = localStorage.getItem("language");
    if (lang) {
      setLanguage(lang);
    }
  }, []);

  // Update language globally
  const changeLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => useContext(LanguageContext);
