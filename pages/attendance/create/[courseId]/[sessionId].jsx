import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ButtonAppBar from "../../../../components/Appbar";
import BottomNav from "../../../../components/BottomNav";
import {
  createSession,
  getCourseStudents,
  submitAttendance,
  submitBulkAttendance,
} from "../../../../utils/apiUtils";
import "react-toastify/dist/ReactToastify.css";

export default function TakeAttendance() {
  const router = useRouter();
  const { courseId, sessionId } = router.query;

  const [courseStudents, setCourseStudents] = useState([]);
  // const [sessionId, setSessionId] = useState(17);
  const fetchData = useCallback(async () => {
    const data = await getCourseStudents(courseId);
    // const session_data = await createSession({
    //   session: new Date(),
    //   course: courseId,
    // });
    // console.log("session_data: ", session_data);
    for (let i = 0; i < data.length; i++) {
      data[i]["absent"] = false;
    }
    console.log(data);
    setCourseStudents(data);
  }, [courseId]);

  useEffect(() => {
    if (!courseId || !sessionId) return;
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    } else {
      fetchData();
    }
  }, [courseId, sessionId, router, fetchData]);

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
    localStorage.setItem("taken_attendance", "true");
    router.push(`/attendance/course/${courseId}`);
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen py-16">
        <ButtonAppBar title="Attendance" />
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
