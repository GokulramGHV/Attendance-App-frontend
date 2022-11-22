import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ButtonAppBar from "../../components/Appbar";
import BottomNav from "../../components/BottomNav";
import { getStudent } from "../../utils/apiUtils";

export default function StudentDetails() {
  const router = useRouter();
  const { studentId } = router.query;

  const [details, setDetails] = useState({});
  const [students, setStudents] = useState([]);

  const fetchData = async () => {
    const data = await getStudent(studentId);
    setDetails(data);
  };

  useEffect(() => {
    if (!studentId) return;
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    } else {
      fetchData();
    }
  }, [router, studentId]);

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen py-16">
        <ButtonAppBar title="Students" />
        <div className="grid gap-4 drop-shadow-lg mt-5 px-10">
          <h2 className="text-xl font-bold">Student Details</h2>
          <p>Name: {details.name}</p>
          <p>Reg No.: {details.reg_no}</p>
          <p>Email: {details.email}</p>
          <p>
            Attendance Percentage:{" "}
            {(details.attendance_percentage * 100).toFixed(3)} %
          </p>
        </div>

        <div className="fixed bg-white bottom-0 flex justify-center border-t-2 w-full">
          <BottomNav routeNum={1} />
        </div>
      </div>
    </>
  );
}
