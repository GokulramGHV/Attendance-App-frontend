import { ButtonBase, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../components/Loading";
import { register, updateUser } from "../utils/apiUtils";

export default function SignUp() {
  const [state, setState] = useState({
    username: "",
    email: "",
    name: "",
    password1: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const submit = async (e) => {
    e.preventDefault();
    if (state.password1 !== state.password2) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      setLoading(true);
      const resp = await register(state);
      localStorage.setItem("token", resp.key);
      const resp2 = await updateUser({
        first_name: state.name,
      });
      toast.success("Account created successfully!");
      setLoading(false);
      router.push("/home");
    } catch (err) {
      setLoading(false);
      // console.log(err);
      console.log(err.non_field_errors);
      if (err.non_field_errors) {
        for (let i = 0; i < err.non_field_errors.length; i++) {
          toast.error(`${err.non_field_errors[i]}`);
        }
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleOnChange = (e, val) =>
    setState((state) => ({ ...state, [val]: e.target.value }));

  return (
    <>
      <ToastContainer />
      <Loading isLoading={loading} />
      <div className="h-screen flex justify-center items-center flex-col px-10">
        <h1 className="text-3xl font-bold mb-10">Attendance App</h1>
        <form onSubmit={submit} className="w-full">
          <div className="grid gap-4">
            <TextField
              required
              label="Username"
              value={state.username}
              onChange={(e) => handleOnChange(e, "username")}
            />
            <TextField
              required
              label="Name"
              value={state.name}
              onChange={(e) => handleOnChange(e, "name")}
            />
            <TextField
              required
              label="Email"
              value={state.email}
              onChange={(e) => handleOnChange(e, "email")}
            />
            <TextField
              label="Password"
              type="password"
              required
              autoComplete="current-password"
              value={state.password1}
              onChange={(e) => handleOnChange(e, "password1")}
            />
            <TextField
              label="Retype Password"
              type="password"
              required
              autoComplete="current-password"
              value={state.password2}
              onChange={(e) => handleOnChange(e, "password2")}
            />
          </div>
          <div className="flex gap-[1.3rem] mt-10">
            <ButtonBase
              type="submit"
              className="text-lg px-7 py-2 bg-blue-600 ring-blue-600 ring-2 rounded-md text-white shadow-lg w-full"
            >
              Sign Up
            </ButtonBase>
          </div>
        </form>
      </div>
    </>
  );
}
