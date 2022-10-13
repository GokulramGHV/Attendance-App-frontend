import { ButtonBase, TextField } from "@mui/material";
import Link from "next/link";

export default function SignUp() {
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold mb-10">Attendance App</h1>

      <div className="grid gap-6">
        <TextField required label="Username" />
        <TextField required label="Name" />
        <TextField required label="Email" />
        <TextField
          label="Password"
          type="password"
          required
          autoComplete="current-password"
        />
        <TextField
          label="Retype Password"
          type="password"
          required
          autoComplete="current-password"
        />
      </div>
      <div className="flex gap-[1.3rem] mt-12">
        <ButtonBase className="text-lg px-7 py-2 bg-blue-600 ring-blue-600 ring-2 rounded-md text-white shadow-lg">
          Sign Up
        </ButtonBase>
      </div>
    </div>
  );
}
