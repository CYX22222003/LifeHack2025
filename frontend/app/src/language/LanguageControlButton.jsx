import React from "react";
import { useLanguage } from "./LanguageContext";
import { Button } from "@mui/material";

export default function LanguageControlButton() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button onClick={toggleLanguage} color="inherit">
      {language === "en" ? "中文" : "English"}
    </Button>
  );
}
