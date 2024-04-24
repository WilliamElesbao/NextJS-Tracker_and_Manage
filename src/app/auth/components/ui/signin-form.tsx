"use client";

import { LoginData } from "@/app/api/auth/types/LoginData";
import { Button } from "@/app/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signin } from "../actions/authActions";
import { loginSchema } from "../lib/validation";
import { AlertDestructive } from "./alert";

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
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
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
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
        </div>

        {showAlert && (
          <div className="mt-5">
            <AlertDestructive description={`${textError}`} />
          </div>
        )}

        <div className="flex flex-col mt-5">
          <Button type="submit" variant={"default"}>
            Sign in
          </Button>
        </div>
      </form>
    </>
  );
}
