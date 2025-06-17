import { createContext, useContext, useMemo, useState } from "react";
import { zhCN, enUS } from "@mui/material/locale";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import enLocale from "date-fns/locale/en-US";
import zhLocale from "date-fns/locale/zh-CN";

const LanguageContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);

const localeMap = {
  en: { muiLocale: enUS, dateFnsLocale: enLocale },
  zh: { muiLocale: zhCN, dateFnsLocale: zhLocale },
};

export const LanguageContextProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "zh" : "en"));
  };

  const contextValue = useMemo(() => ({ language, toggleLanguage }), [language]);

  return (
    <LanguageContext.Provider value={contextValue}>
      <LocalizationProvider
        dateAdapter={AdapterDateFns}
        adapterLocale={localeMap[language].dateFnsLocale}
      >
        {children}
      </LocalizationProvider>
    </LanguageContext.Provider>
  );
};
