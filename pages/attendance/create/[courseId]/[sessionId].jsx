import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonAppBar from "../../../../components/Appbar";
import {
  getCourseStudents,
  getSessionDetails,
  submitBulkAttendance,
} from "../../../../utils/apiUtils";
import { Button, TextField } from "@mui/material";
import Loading from "../../../../components/Loading";
import AlertDialog from "../../../../components/AlertDialog";

export default function TakeAttendance() {
  const router = useRouter();
  const { courseId, sessionId } = router.query;

  const [courseStudents, setCourseStudents] = useState([]);
  const [sessionDetails, setSessionDetails] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchData = useCallback(async () => {
    const data = await getCourseStudents(courseId);
    const session_data = await getSessionDetails(sessionId);
    console.log("session_data: ", session_data);
    setSessionDetails(session_data);
    for (let i = 0; i < data.length; i++) {
      data[i]["absent"] = false;
    }
    console.log(data);
    setCourseStudents(data);
  }, [courseId, sessionId]);

  useEffect(() => {
    if (!courseId || !sessionId) return;
    fetchData();
  }, [courseId, sessionId, router, fetchData]);

  const submit_attendance = async () => {
    setLoading(true);
    let l = [];
    for (let i = 0; i < courseStudents.length; i++) {
      if (courseStudents[i].absent) {
        l.push({
          student: courseStudents[i].id,
          session: sessionId,
        });
      }
    }
    const data = await submitBulkAttendance(l, courseId, sessionId);
    setLoading(false);
    console.log(data);
    console.log("Attendance Submitted!");
    toast.success("Attendance successfully recorded!");
    router.push(`/attendance/course/${courseId}`);
  };

  function isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

  return (
    <>
      <AlertDialog
        cancelText="Cancel"
        confirmText="Confirm"
        description={`Are you sure you want to submit the attendance for ${
          sessionDetails?.course?.name
        } session on ${new Date(sessionDetails?.session)
          .toString()
          .slice(0, 24)}?`}
        title="Submit Attendance"
        open={openDialog}
        handleClose={() => {
          setOpenDialog(false);
        }}
        onConfirm={submit_attendance}
      ></AlertDialog>
      <Loading loading={loading} />
      <div className="min-h-screen py-16 px-10">
        <ButtonAppBar title="Attendance" />
        <h2 className="mt-5 text-lg font-bold text-gray-800">
          Course Name: {sessionDetails?.course?.name}
        </h2>
        <h4 className="font-medium text-gray-600 mb-2">
          {new Date(sessionDetails.session).toString().slice(0, 24)}
        </h4>
        <TextField
          id="searchBar"
          label="Search"
          variant="outlined"
          size="small"
          type="search"
          fullWidth
          placeholder="Search by Name or RegNo"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <div className="mt-5 h-[50vh] overflow-y-auto">
          {courseStudents
            .filter((stud) => {
              if (isNumeric(searchTerm))
                return stud.reg_no.toString().includes(searchTerm);
              else
                return stud.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase());
            })
            .map((student) => {
              return (
                <div
                  key={student.id}
                  className={`${
                    student.absent
                      ? "bg-red-200 border-[2px] border-red-300"
                      : "bg-green-200 border-[2px] border-green-300"
                  } cursor-pointer rounded-lg px-6 py-4 mr-2 shadow mb-3`}
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
                  <div className="whitespace-nowrap text-ellipsis overflow-hidden text-sm">
                    {student.reg_no} - {student.name}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="flex justify-between gap-4 mt-5 border-[2px] rounded-lg px-3 py-2">
          <p>Total: {courseStudents.length}</p>
          <p>Present: {courseStudents.filter((stud) => !stud.absent).length}</p>
          <p>Absent: {courseStudents.filter((stud) => stud.absent).length}</p>
        </div>
        <div className="flex mt-2 justify-between gap-2">
          <Button
            color="error"
            size="small"
            onClick={() => {
              setCourseStudents((state) => {
                return state.map((s) => {
                  return { ...s, absent: true };
                });
              });
            }}
          >
            Mark All Absent
          </Button>
          <Button
            color="success"
            size="small"
            onClick={() => {
              setCourseStudents((state) => {
                return state.map((s) => {
                  return { ...s, absent: false };
                });
              });
            }}
          >
            Mark All Present
          </Button>
        </div>
      </div>
      <button
        onClick={() => setOpenDialog(true)}
        className="fixed bg-blue-500 text-white hover:bg-blue-400 py-4 bottom-0 flex justify-center border-t-2 w-full"
      >
        Submit Attendance
      </button>
    </>
  );
}
