import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ButtonAppBar from "../../components/Appbar";
import BottomNav from "../../components/BottomNav";
import { getStudent } from "../../utils/apiUtils";
import { Card, CardContent } from "@mui/material";

export default function StudentDetails() {
  const router = useRouter();
  const { studentId } = router.query;

  const [details, setDetails] = useState({});

  const fetchData = async () => {
    const data = await getStudent(studentId);
    setDetails(data);
  };

  useEffect(() => {
    if (!studentId) return;
    fetchData();
  }, [studentId]);

  return (
    <>
      <div className="min-h-screen py-16 px-10">
        <ButtonAppBar title="Students" />
        <h2 className="text-xl font-bold my-5 text-gray-800">
          Student Details
        </h2>

        <Card variant="outlined">
          <CardContent className="pb-4">
            <h3 className="font-medium text-gray-800 mb-1 text-lg">
              {details.name}
            </h3>
            <div className="grid gap-1">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Reg No:</span> {details.reg_no}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Email:</span> {details.email}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-medium">Attendance Percentage:</span>{" "}
                {(details.attendance_percentage * 100).toFixed(3)} %
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="fixed bg-white bottom-0 flex justify-center border-t-2 w-full">
          <BottomNav routeNum={1} />
        </div>
      </div>
    </>
  );
}
