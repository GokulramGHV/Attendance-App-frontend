import { Button, ButtonBase } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ButtonAppBar from "../../components/Appbar";
import BottomNav from "../../components/BottomNav";
// import AddStudent from "../../components/AddStudent";
import { getCourse, getCourseStudents } from "../../utils/apiUtils";
import "react-toastify/dist/ReactToastify.css";
export default function CourseDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [details, setDetails] = useState({});
  const [students, setStudents] = useState([]);

  const fetchData = useCallback(async () => {
    const data = await getCourse(id);
    const student_data = await getCourseStudents(id);
    setDetails(data);
    setStudents(student_data);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    } else {
      let l = localStorage.getItem("student_created");
      if (l === "true") {
        toast.success("Student successfully created!");
        localStorage.setItem("student_created", "false");
      }
      fetchData();
    }
  }, [id, router, fetchData]);

  return (
    <>
      <ToastContainer />
      <div className="max-h-full py-16">
        <ButtonAppBar title="Courses" />
        <div className="grid gap-4 drop-shadow-lg mt-5 px-10">
          <h2 className="text-xl font-bold">Course Details</h2>
          <p>{details.name}</p>
          <p>Course ID: {details.id}</p>
          <p>No. of students enrolled: {students.length}</p>
        </div>
        <div className="flex flex-wrap mx-10 justify-left mt-5 gap-2">
          {" "}
          <Button
            variant="outlined"
            className=""
            onClick={() => router.push(`/student/add/${id}`)}
          >
            <i className="fa fa-plus mr-2"></i>
            Add Student
          </Button>{" "}
          <Button
            variant="outlined"
            className=""
            onClick={() => router.push(`/student/add/file/${id}`)}
          >
            {/*fontawewome icon for upload*/}
            <i class="fa-solid fa-file-arrow-up mr-2"></i>
            Upload Students List
          </Button>
        </div>

        <div className="w-full mt-5">
          {students.map((student) => {
            return (
              <div
                key={student.id}
                className="flex bg-white rounded-lg items-center px-8 py-3 gap-4 hover:scale-105 cursor-pointer"
                onClick={() => router.push(`/student/${student.id}/`)}
              >
                <div className="bg-blue-200 rounded-full h-fit px-5 py-3 text-xl font-bold text-white">
                  {student.name.slice(0, 1)}
                </div>
                <div>
                  <div className="font-semibold w-[100px]">
                    <div className="whitespace-nowrap text-ellipsis overflow-hidden">
                      {student.name}
                    </div>
                    <div> {student.reg_no}</div>
                  </div>
                </div>
                <div className="flex-1 flex justify-end">
                  <div
                    className={`text-white rounded-lg h-full w-fit px-4 py-3 flex justify-center items-center ${
                      student.attendance_percentage > 0.75
                        ? "bg-green-500"
                        : "bg-red-400"
                    }`}
                  >
                    {(student.attendance_percentage * 100).toFixed(1)}%
                  </div>
                </div>
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
