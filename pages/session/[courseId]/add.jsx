import { ButtonBase, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ButtonAppBar from "../../../components/Appbar";
import BottomNav from "../../../components/BottomNav";
import { createSession, getCourse } from "../../../utils/apiUtils";

export default function TimeTableAdd() {
  const [datetime, setDatetime] = useState("");
  const [blockHours, setBlockHours] = useState(1);
  const router = useRouter();
  const { courseId } = router.query;

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const data = await getCourse(courseId);
        setBlockHours(data.block_hours);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCourseData();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (blockHours < 1) {
      toast.error("Block hours cannot be less than 1!");
      setIsLoading(false);
      return;
    }
    console.log("DateTime: ", datetime);
    try {
      const session_data = await createSession({
        session: datetime,
        course: courseId,
        block_hours: blockHours,
      });
      console.log("Session Data: ", session_data);
      router.push(`/attendance/create/${courseId}/${session_data.id}/`);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      <ButtonAppBar title="Attendance" />
      <div className="min-h-screen py-16 flex justify-center items-center px-10">
        <form onSubmit={handleSubmit} className="w-full grid gap-4">
          <h1 className="text-xl font-bold mb-4 text-center">
            Create New Session
          </h1>
          <TextField
            id="session_datetime"
            label="Session Datetime"
            variant="outlined"
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            className="w-full"
            required
          />
          <TextField
            id="blockHours"
            label="Block Hours"
            variant="outlined"
            type="number"
            value={blockHours}
            onChange={(e) => setBlockHours(e.target.value)}
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
        <BottomNav routeNum={3} />
      </div>
    </>
  );
}
