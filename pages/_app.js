import { StyledEngineProvider } from "@mui/material";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <Component {...pageProps} />
      </StyledEngineProvider>
    </>
  );
}

export default MyApp;
