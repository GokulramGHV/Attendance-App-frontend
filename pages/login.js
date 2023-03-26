import { ButtonBase, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import { login } from "../utils/apiUtils";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const resp = await login(username, password);
      localStorage.setItem("token", resp.key);
      setLoading(false);
      toast.success("Logged in successfully!");
      router.push("home");
    } catch (err) {
      // console.log(err);
      console.log(err.non_field_errors);
      setLoading(false);
      if (err.non_field_errors) {
        for (let i = 0; i < err.non_field_errors.length; i++) {
          toast.error(`${err.non_field_errors[i]}`);
        }
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleOnChange = (val, setState) => {
    setState((state) => val);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/home");
    }
  }, [router]);

  return (
    <>
      <Loading isLoading={loading} />
      <div className="min-h-screen py-16 flex justify-center items-center px-10">
        <form onSubmit={submit} className="w-full grid gap-4">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
            Attendance App
          </h1>
          <TextField
            required
            label="Username"
            value={username}
            onChange={(e) => {
              handleOnChange(e.target.value, setUsername);
            }}
          />
          <TextField
            label="Password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              handleOnChange(e.target.value, setPassword);
            }}
          />
          <div className="grid gap-[1.5rem] mt-5">
            <ButtonBase
              // onClick={submit}
              type="submit"
              className="text-lg px-6 py-2 bg-blue-600 ring-blue-600 ring-2 rounded-md text-white shadow-lg"
            >
              Log In
            </ButtonBase>
            {/* <ButtonBase className="text-lg px-5 py-2 ring-blue-600 ring-2 rounded-md text-blue-600 shadow-lg"> */}
            <div>
              <span className="text-gray-600">
                Don&apos;t have an account?{" "}
              </span>
              <span className="text-blue-700 font-bold">
                <Link href="/signup">Sign Up</Link>
              </span>
            </div>
            {/* </ButtonBase> */}
          </div>
        </form>
      </div>
    </>
  );
}
