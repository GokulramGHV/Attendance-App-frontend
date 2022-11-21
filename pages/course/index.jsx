import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ButtonAppBar from "../../components/Appbar";
import BottomNav from "../../components/BottomNav";
import { getCourses } from "../../utils/apiUtils";
import "react-toastify/dist/ReactToastify.css";

export default function Course() {
  const [courses, setCourses] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let l = localStorage.getItem("course_created");
    if (l === "true") {
      toast.success("Course Created!");
      localStorage.setItem("course_created", "false");
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen py-16">
        <ButtonAppBar title="Courses" />
        <Button
          variant="outlined"
          className="mx-10 mt-10"
          onClick={() => router.push("/course/add")}
        >
          <i className="fa fa-plus mr-2"></i>
          Add Course
        </Button>
        <div className="grid gap-4 drop-shadow-lg mt-5">
          {courses.map((course, i) => {
            return (
              <div
                className="flex justify-between items-center gap-5 mx-10 px-8 py-4 text-lg font-medium bg-white rounded-xl shadow"
                key={i}
              >
                {course.name}
                <Button
                  variant="outlined"
                  onClick={() => router.push(`/course/${course.id}`)}
                >
                  Details
                </Button>
              </div>
            );
          })}
        </div>
        <div className="fixed bg-white bottom-0 flex justify-center border-t-2 w-full">
          <BottomNav routeNum={1} />
        </div>
      </div>
    </>
  );
}
