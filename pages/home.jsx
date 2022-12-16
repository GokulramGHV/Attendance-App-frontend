import { Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ButtonAppBar from "../components/Appbar";
import BottomNav from "../components/BottomNav";
import Loading from "../components/Loading";
import { createSession, getTimetables, getUser } from "../utils/apiUtils";
import { WEEK_DAYS } from "./timetable";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function Home() {
  const [timetables, setTimetables] = useState([]);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [datee, setDatee] = useState(dayjs(new Date()));
  const [user, setUser] = useState({});
  const fetchData = useCallback(async () => {
    try {
      const data = await getTimetables();
      console.log(data);
      setTimetables(data);
      setIsLoading(false);
    } catch (err) {
      toast.error("Error while fetching data!");
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    } else {
      fetchData();
      const fetchUserData = async () => {
        const data = await getUser();
        setUser(data);
      };
      fetchUserData();
      let l = localStorage.getItem("login");
      if (l === "true") {
        toast.success("Login Sucessful!");
        localStorage.setItem("login", "false");
      }
    }
  }, [router, fetchData]);

  const weekDaysTable = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
  timetables.forEach((timetable) => {
    weekDaysTable[timetable.day].push(timetable);
  });

  const getDayNum = (date) => {
    let day = new Date(date).getDay();
    return day === 0 ? 6 : day - 1;
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="min-h-screen py-16">
        <ButtonAppBar title="Home" />
        <div className="grid gap-4 drop-shadow-lg mt-5">
          <h1 className="mx-10 text-2xl font-bold text-gray-700 mt-2">
            Hi, {user.first_name}!
          </h1>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              value={datee}
              onChange={(newValue) => {
                setDatee(newValue);
              }}
              className="mx-10"
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <div>
            <h3 className="text-lg font-semibold mb-3 mt-5 mx-10">
              {WEEK_DAYS[getDayNum(datee)]}
            </h3>
            {weekDaysTable[getDayNum(datee)].length === 0 && (
              <div className="text-lg text-gray-600 font-semibold flex justify-center rounded-lg px-8 py-4 mx-10 shadow-md border-[2px] border-gray-200 mb-4">
                No Time Table Entry found!
              </div>
            )}
            {weekDaysTable[getDayNum(datee)].map((elem, idx) => {
              return (
                <div
                  key={idx}
                  className="flex justify-between rounded-lg px-8 py-4 mx-10 shadow-md border-[2px] border-gray-200 mb-4"
                >
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
                      onClick={async () => {
                        setIsLoading(true);
                        let session_datetime = new Date(datee);
                        let time = elem.start_time.split(":");
                        console.log("Time:", time[0], time[1], time[2]);
                        session_datetime.setHours(
                          Number(time[0]),
                          Number(time[1]),
                          Number(time[2])
                        );
                        const session_data = await createSession({
                          session: session_datetime,
                          course: elem.course.id,
                          block_hours: elem.course.block_hours,
                        });
                        console.log("session_data: ", session_data);
                        router.push(
                          `/attendance/create/${elem.course.id}/${session_data.id}/`
                        );
                        setIsLoading(false);
                      }}
                    >
                      Mark
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="fixed bg-white bottom-0 flex justify-center border-t-2 w-full">
          <BottomNav routeNum={0} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
