import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ButtonAppBar from "../../../../components/Appbar";
import BottomNav from "../../../../components/BottomNav";
import { getCourseSessions } from "../../../../utils/apiUtils";

export default function ListSessions() {
  const router = useRouter();
  const { courseId } = router.query;
  const [sessions, setSessions] = useState([]);

  const fetchData = async () => {
    const data = await getCourseSessions(courseId);
    console.log("Sessions: ", data);
    setSessions(data);
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
        <ButtonAppBar title="Attendance" />
        <Button
          variant="outlined"
          className="mx-10 mt-10"
          onClick={() => router.push("/course/add")}
        >
          View Students attendance
        </Button>
        <div className="grid gap-4 drop-shadow-lg mt-5">
          {sessions.map((session, i) => {
            return (
              <div
                key={i}
                className="mx-10 bg-white shadow-lg px-10 py-3 rounded-lg hover:scale-105 cursor-pointer"
                onClick={() => {
                  router.push(
                    `/attendance/course/${courseId}/session/${session.id}/`
                  );
                }}
              >
                <h4 className="text-xl font-semibold text-gray-800">
                  Session - {i}
                </h4>
                <p>Session ID: {session.id} </p>
                <p>Datetime: {session.session}</p>
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
