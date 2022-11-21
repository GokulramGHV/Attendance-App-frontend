import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ButtonAppBar from "../../../components/Appbar";
import BottomNav from "../../../components/BottomNav";
import {
  createSession,
  getCourseStudents,
  submitAttendance,
  submitBulkAttendance,
} from "../../../utils/apiUtils";

export default function TakeAttendance() {
  const router = useRouter();
  const { courseId } = router.query;

  const [courseStudents, setCourseStudents] = useState([]);
  const [sessionId, setSessionId] = useState(17);
  const fetchData = async () => {
    const data = await getCourseStudents(courseId);
    // const session_data = await createSession({
    //   session: new Date(),
    //   course: courseId,
    // });
    // console.log("session_data: ", session_data);
    for (let i = 0; i < data.length; i++) {
      data[i]["absent"] = false;
    }
    setCourseStudents(data);
  };

  const submit_attendance = async () => {
    let l = [];
    for (let i = 0; i < courseStudents.length; i++) {
      if (courseStudents[i].absent) {
        l.push({
          student: courseStudents[i].id,
          session: sessionId,
        });
      }
    }
    const data = await submitBulkAttendance(l);
    console.log(data);
    console.log("Attendance Submitted!");
  };

  useEffect(() => {
    if (!courseId) {
      return;
    }
    fetchData();
  }, [courseId]);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen py-16">
        <ButtonAppBar title="Courses" />
        <div className="mt-5">
          {courseStudents.map((student) => {
            return (
              <div
                key={student.id}
                className={`${
                  student.absent ? "bg-red-200" : "bg-green-200"
                } cursor-pointer rounded-lg px-8 py-4 mx-10 shadow-md border-[2px] border-gray-200 mb-4`}
                onClick={() => {
                  setCourseStudents((state) => {
                    return state.map((s) => {
                      if (s.id === student.id)
                        return { ...s, absent: !s.absent };
                      return s;
                    });
                  });
                }}
              >
                {student.reg_no} - {student.name}
              </div>
            );
          })}
        </div>
        <button
          onClick={submit_attendance}
          className="fixed bg-blue-500 text-white hover:bg-blue-400 py-5 bottom-0 flex justify-center border-t-2 w-full"
        >
          Submit Attendance
        </button>
      </div>
    </>
  );
}
