import { Button } from "@mui/material";
import { ToastContainer } from "react-toastify";
import ButtonAppBar from "../../components/Appbar";
import BottomNav from "../../components/BottomNav";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCourses } from "../../utils/apiUtils";

export default function AttendanceHome() {
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    } else {
      fetchData();
    }
  }, [router]);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen py-16">
        <ButtonAppBar title="Attendance" />
        <h2 className="mx-10 text-2xl font-bold mt-5">Courses List</h2>
        <div className="grid gap-4 drop-shadow-lg mt-5">
          {courses.length === 0 && (
            <div className="flex justify-center items-center gap-5 mx-10 px-8 py-4 text-lg font-medium bg-white rounded-xl shadow">
              No courses found!
            </div>
          )}
          {courses.map((course, i) => {
            return (
              <div
                className="flex justify-between items-center gap-5 mx-10 px-8 py-4 text-lg font-medium bg-white rounded-xl shadow"
                key={i}
              >
                {course.name}
                <Button
                  variant="outlined"
                  onClick={() => router.push(`/attendance/course/${course.id}`)}
                >
                  View
                </Button>
              </div>
            );
          })}
        </div>
        <div className="fixed bg-white bottom-0 flex justify-center border-t-2 w-full">
          <BottomNav routeNum={2} />
        </div>
      </div>
    </>
  );
}
