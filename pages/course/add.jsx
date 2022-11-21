import { ButtonBase, Link, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import ButtonAppBar from "../../components/Appbar";
import BottomNav from "../../components/BottomNav";
import { createCourse, getCourses } from "../../utils/apiUtils";
import "react-toastify/dist/ReactToastify.css";

export default function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const router = useRouter();
  const submit = async (e) => {
    e.preventDefault();
    try {
      const resp = await createCourse({ name: courseName });
      localStorage.setItem("course_created", "true");
      router.push("/course");
    } catch (err) {
      console.log(err.non_field_errors);
      if (err.non_field_errors) {
        for (let i = 0; i < err.non_field_errors.length; i++) {
          toast.error(`${err.non_field_errors[i]}`);
        }
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleOnChange = (val, setState) => {
    setState((state) => val);
  };

  return (
    <div className="min-h-screen py-16">
      <ButtonAppBar title="Courses" />
      <div className="mx-auto w-fit h-full flex flex-col justify-center items-center">
        {/* <ToastContainer /> */}
        <h1 className="text-2xl font-bold mb-10">Add a new course</h1>

        <form onSubmit={submit}>
          <div className="grid gap-6">
            <TextField
              required
              label="Course Name"
              value={courseName}
              onChange={(e) => {
                handleOnChange(e.target.value, setCourseName);
              }}
            />
          </div>
          <div className="flex gap-[1.3rem] mt-5">
            <ButtonBase
              type="submit"
              className="text-lg px-6 py-2 bg-blue-600 ring-blue-600 ring-2 rounded-md text-white shadow-lg"
            >
              Create Course
            </ButtonBase>
          </div>
        </form>
      </div>
      <div className="fixed bg-white bottom-0 flex justify-center border-t-2 w-full">
        <BottomNav routeNum={1} />
      </div>
    </div>
  );
}
