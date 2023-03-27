import { StyledEngineProvider } from "@mui/material";
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import LoadingState from "../components/LoadingState";
import { useRouter } from "next/router";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  useEffect(() => {
    if (router.pathname === "/signup" || router.pathname === "/login") {
      return;
    }
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }
  }, [router]);
  return (
    <>
      {/* <LoadingState router={router} /> */}
      <StyledEngineProvider injectFirst>
        <Component {...pageProps} />
      </StyledEngineProvider>
      <ToastContainer />
    </>
  );
}

export default MyApp;
