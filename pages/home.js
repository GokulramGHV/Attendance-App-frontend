import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BottomNav from "../components/BottomNav";

export default function Home() {
  useEffect(() => {
    let l = localStorage.getItem("login");
    if (l === "true") {
      toast.success("Login Sucessful!");
      localStorage.setItem("login", "false");
    }
    console.log("i fire once");
  }, []);
  return (
    <>
      <div>Hello</div>
      <div className="fixed bottom-0 flex justify-center border-2 w-full">
        <BottomNav routeNum={0} />
      </div>

      <ToastContainer />
    </>
  );
}
