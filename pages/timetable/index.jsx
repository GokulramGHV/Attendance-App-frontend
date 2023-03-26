import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonAppBar from "../../components/Appbar";
import BottomNav from "../../components/BottomNav";
import { getTimetables } from "../../utils/apiUtils";

export const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function TimeTable() {
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

  useEffect(() => {
    let l = localStorage.getItem("timetable_created");
    if (l === "true") {
      toast.success("Timetable Created!");
      localStorage.setItem("timetable_created", "false");
    }
  }, []);

  const weekDaysTable = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };
  timetables.forEach((timetable) => {
    weekDaysTable[timetable.day].push(timetable);
  });

  return (
    <>
      <div className="min-h-screen py-16 px-10">
        <ButtonAppBar title="Timetable" />
        <h2 className=" text-2xl font-bold mt-5 text-gray-800">
          Timetable Entries
        </h2>
        <Button
          variant="outlined"
          className="mt-4"
          onClick={() => router.push("/timetable/add")}
        >
          <i className="fa fa-plus mr-2"></i>
          Add Timetable Entry
        </Button>
        <div className="grid gap-4 mt-5">
          {WEEK_DAYS.map((day, i) => {
            if (weekDaysTable[i].length > 0)
              return (
                <div key={i}>
                  <h3 className="text-lg font-semibold mb-3">{day}</h3>
                  {weekDaysTable[i].map((elem, idx) => {
                    return (
                      <div
                        key={idx}
                        className="rounded-lg px-8 py-4 shadow-md border-[2px] border-gray-200 mb-4"
                      >
                        <p className="font-medium">{elem.course.name}</p>
                        <div className="mt-1 text-gray-500 text-sm">
                          {" "}
                          {elem.start_time} - {elem.end_time}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            else
              return (
                <div key={i}>
                  <h3 className="text-lg font-semibold mb-3">{day}</h3>
                  <div className="text-gray-700 font-medium flex justify-center rounded-lg px-8 py-4 shadow-md border-[2px] border-gray-200 mb-4">
                    No Time Table Entry found!
                  </div>
                </div>
              );
          })}
        </div>
      </div>
      <div className="fixed bg-white bottom-0 flex justify-center border-t-2 w-full z-50">
        <BottomNav routeNum={3} />
      </div>
    </>
  );
}
