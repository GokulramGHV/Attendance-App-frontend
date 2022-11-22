import { CircularProgress } from "@mui/material";
import { useEffect } from "react";

export default function Loading({ isLoading }) {
  useEffect(() => {
    if (isLoading)
      document.getElementsByTagName("body")[0].classList.add("body-class");
    else
      document.getElementsByTagName("body")[0].classList.remove("body-class");
  });
  if (isLoading)
    return (
      <div className="z-50 absolute right-0 top-0 bg-gray-800 min-h-screen w-full bg-opacity-80 flex justify-center items-center">
        <div className="bg-white shadow-xl px-5 pb-3.5 pt-5 rounded-lg">
          <CircularProgress />
        </div>
      </div>
    );
  else return <></>;
}
