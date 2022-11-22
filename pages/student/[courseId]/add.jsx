import { ButtonBase, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ButtonAppBar from "../../components/Appbar";
import BottomNav from "../../components/BottomNav";
import { createTimetableEntry, getCourses } from "../../utils/apiUtils";
import MenuItem from "@mui/material/MenuItem";
import "react-toastify/dist/ReactToastify.css";
import { WEEK_DAYS } from ".";

export default function AddStudent() {
  
  const [courseList, setCourseList] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    const data = await getCourses();
    setCourseList(data);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    } else {
      fetchData();
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submit data: ", timetableData);
    try {
      const submit_data = await createTimetableEntry(timetableData);
      localStorage.setItem("timetable_created", "true");
      router.push("/timetable");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  const handleChange = (value, field) => {
    setTimetableData((state) => {
      return { ...state, [field]: value };
    });
  };

  return (
    <>
      <ToastContainer />
      <ButtonAppBar title="Timetable" />
      <div className="min-h-screen py-16 flex justify-center items-center px-10">
        <form onSubmit={handleSubmit} className="w-full grid gap-4">
          <h1 className="text-xl font-bold mb-4 text-center">
            Add Timetable Entry
          </h1>
          <TextField
            id="start_time"
            label="Start Time"
            variant="outlined"
            type="time"
            value={timetableData.start_time}
            onChange={(e) => handleChange(e.target.value, "start_time")}
            className="w-full"
          />
          <TextField
            id="end_time"
            label="End Time"
            variant="outlined"
            type="time"
            value={timetableData.end_time}
            onChange={(e) => handleChange(e.target.value, "end_time")}
            className="w-full"
          />
          <TextField
            id="day"
            label="Select Day"
            select
            variant="outlined"
            className="w-full"
            value={timetableData.day}
            onChange={(e) => handleChange(e.target.value, "day")}
          >
            {WEEK_DAYS.map((day, i) => {
              return (
                <MenuItem key={i} value={i}>
                  {day}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            id="course"
            label="Select Course"
            select
            variant="outlined"
            value={timetableData.course}
            onChange={(e) => handleChange(e.target.value, "course")}
            className="w-full"
          >
            {courseList.map((course) => {
              return (
                <MenuItem key={course.id} value={course.id}>
                  {course.name}
                </MenuItem>
              );
            })}
          </TextField>
          <ButtonBase
            type="submit"
            className="mt-4 text-lg px-6 py-2 bg-blue-500 rounded-md text-white shadow-lg"
          >
            Add Entry
          </ButtonBase>
        </form>
      </div>
      <div className="fixed bg-white bottom-0 flex justify-center border-t-2 w-full">
        <BottomNav routeNum={3} />
      </div>
    </>
  );
}
