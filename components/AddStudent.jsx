import React from "react";
import { useState } from "react";
import { Button } from "@mui/material";
import { TextField } from "@mui/material"
import { createStudent } from "../utils/apiUtils";



export default function AddStudent({ courseId, fetchData }) {
    const [comped, setComped] = useState(true);
    let [buttonName, setButtonName] = useState("Add Student");
    // let [name, setName] = useState("");
    // let [email, setEmail] = useState("");
    // let [regno, setRegno] = useState("");
    // let [attPer, setAttPer] = useState("");

    let name, email, regno, attPer;

    const toggleComp = () => {
        setComped(!comped);
        setButtonName(`${!comped ? "Add Student" : "Cancel"}`);
    };

    const submitData = async () => {
        const data = {
            "name": name,
            "email": email,
            "reg_no": regno,
            "attendance_percentage": attPer,
            "course_enrolled": courseId
        };
        await createStudent(data);
    };

    return (
        <div className={`w-15 ${comped ? "h-12" : "h-70"} overflow-y-hidden mx-auto mb-15 pb-15`}>
            <Button variant="text" size="large" className="mx-auto block text-center" onClick={() => toggleComp()}>
                { buttonName }
            </Button>

            <form className="h-65 w-50 mx-auto mt-4 gap-5 flex-col justify-evenly items-center">
                <TextField variant="outlined" required label="Name" className="mx-auto my-4 block" onChange={(e) => {name=e.target.value}} />
                <TextField variant="outlined" required label="Email" className="mx-auto my-4 block" onChange={(e) => { email = e.target.value }} />
                <TextField variant="outlined" required label="Register Number" className="mx-auto my-4 block" onChange={(e) => { regno = e.target.value }} />
                <TextField variant="outlined" label="Attendance Percentage" className="mx-auto my-4 block" onChange={(e) => { attPer = e.target.value }} />

            <Button type="submit" variant="outlined" size="small" className="mx-auto block" onClick={() => submitData()}>
                Submit
            </Button>
            </form>
        </div>
    );
}