import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonAppBar from "../components/Appbar";
import BottomNav from "../components/BottomNav";
import { getTimetables } from "../utils/apiUtils";
import { WEEK_DAYS } from "./timetable";

export default function Home() {
  useEffect(() => {
    let l = localStorage.getItem("login");
    if (l === "true") {
      toast.success("Login Sucessful!");
      localStorage.setItem("login", "false");
    }
  }, []);

  const [timetables, setTimetables] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    const data = await getTimetables();
    console.log(data);
    setTimetables(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="min-h-screen py-16">
        <ButtonAppBar title="Home" />
        <div className="grid gap-4 drop-shadow-lg mt-5">
          {timetables.map((elem, i) => {
            return (
              <div key={i}>
                <h3 className="text-lg font-semibold mb-3 mx-10">
                  {WEEK_DAYS[elem.day]}
                </h3>
                <div className="flex justify-between rounded-lg px-8 py-4 mx-10 shadow-md border-[2px] border-gray-200 mb-4">
                  <div>
                    <p className="font-medium">{elem.course.name}</p>
                    <div className="mt-1 text-gray-500 text-sm">
                      {" "}
                      {elem.start_time} - {elem.end_time}
                    </div>
                  </div>
                  <div className="flex">
                    <Button
                      variant="outlined"
                      onClick={() =>
                        router.push(`/attendance/create/${elem.course.id}`)
                      }
                    >
                      Mark
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="fixed bg-white bottom-0 flex justify-center border-t-2 w-full">
          <BottomNav routeNum={0} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
