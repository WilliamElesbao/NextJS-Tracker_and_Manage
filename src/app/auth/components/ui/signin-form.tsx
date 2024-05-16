"use client";

import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthContext/authContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../lib/signInFormSchema";
import { AlertDestructive } from "./alert";
import { LoginData } from "@/lib/types/LoginData";

export function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ resolver: zodResolver(loginSchema) });
  const [showAlert, setShowAlert] = useState(false);
  const [textError, setTextError] = useState("");

  const { signIn, user } = useContext(AuthContext);

  async function onsubmit(loginData: LoginData) {
    const result: true | { error: string } = await signIn(loginData);

    if (result === true) {
    } else if (result && "error" in result) {
      setShowAlert(true);
      setTextError(result.error);
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
