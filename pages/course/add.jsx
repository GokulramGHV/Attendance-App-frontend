import { ButtonBase, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import ButtonAppBar from "../../components/Appbar";
import BottomNav from "../../components/BottomNav";
import { createCourse, getCourses } from "../../utils/apiUtils";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../components/Loading";

export default function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }
  }, [router]);

  const submit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const resp = await createCourse({ name: courseName });
      localStorage.setItem("course_created", "true");
      router.push("/course");
    } catch (err) {
      console.log(err.non_field_errors);
      setIsLoading(true);
      if (err.non_field_errors) {
        for (let i = 0; i < err.non_field_errors.length; i++) {
          toast.error(`${err.non_field_errors[i]}`);
        }
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <ToastContainer />
      <ButtonAppBar title="Timetable" />
      <div className="min-h-screen py-16 flex justify-center items-center px-10">
        <form onSubmit={submit} className="w-full grid gap-4">
          <h1 className="text-xl font-bold mb-4 text-center">
            Create New Course
          </h1>
          <TextField
            id="courseName"
            label="Course Name"
            variant="outlined"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full"
          />
          <ButtonBase
            type="submit"
            className="mt-4 text-lg px-6 py-2 bg-blue-500 rounded-md text-white shadow-lg"
          >
            Create
          </ButtonBase>
        </form>
      </div>
      <div className="fixed bg-white bottom-0 flex justify-center border-t-2 w-full">
        <BottomNav routeNum={1} />
      </div>
    </>
  );
}