"use client";

import { LoginData } from "@/app/api/auth/types/LoginData";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signin } from "../actions/authActions";
import { loginSchema } from "../lib/validation";

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [textError, setTextError] = useState("");

  async function onsubmit(loginData: LoginData) {
    const result = await signin(loginData);
    if (result.error) {
      setShowAlert(true);
      setTextError(result.error);
    } else if (result.token) {
      setCookie(undefined, "tracker_and_manage", result.token, {
        maxAge: 60 * 60,
        path: "/",
      });
      router.push("/");
    }
  }

  return (
    <>
      <div className="h-screen bg-[#f58220] flex flex-col justify-center">
        <div className="bg-white flex flex-col xl:flex-row justify-center gap-5  p-5 rounded-md mx-auto shadow-lg shadow-black/50">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center">
            <Image
              src="/img/tmsa_logo_1.png"
              alt="tmsa logo"
              width={350}
              height={100}
              quality={100}
              priority={false}
            />
          </div>

          <div className="sm:mx-auto sm:w-full sm:max-w-sm  flex flex-col justify-center align-middle gap-5">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
              Tracker & Manage
            </h2>
            <form onSubmit={handleSubmit(onsubmit)} method="POST">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-600"
                >
                  Username
                </label>
                <div className="mt-2">
                  <input
                    {...register("username")}
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    className="block w-full rounded-md border-0 p-1.5 bg-white text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-100 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  />
                  {errors.username && <span>{errors.username.message}</span>}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-600"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    {...register("password")}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 p-1.5 bg-white text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-100 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
                  />
                  {errors.password && <span>{errors.password.message}</span>}
                </div>
              </div>

              {showAlert && (
                <span className=" align-middle">
                  <span className="h-4 w-4" />
                  <span>{textError}</span>
                </span>
              )}

              <div>
                <button
                  type="submit"
                  className="mt-10 flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 ease-out duration-300 text-white shadow-sm hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
