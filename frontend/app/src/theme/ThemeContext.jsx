// ThemeContext.jsx
import { createContext, useMemo, useState, useContext } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const ColorModeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useColorMode = () => useContext(ColorModeContext);

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    }
  }), []);

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
    },
  }), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
