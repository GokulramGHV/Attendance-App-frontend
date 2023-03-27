import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function LoadingState() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url, { shallow }) => setLoading(true);
    const handleComplete = (url, { shallow }) => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  return <Loading isLoading={loading} />;
}
