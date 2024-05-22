import { AuthProvider } from "@/contexts/AuthContext/authContext";
import { Metadata } from "next";
import Image from "next/image";
import { SignInForm } from "./components/ui/signin-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function SignInPage() {
  return (
    <>
      <AuthProvider>
        <div className="min-h-screen flex flex-col justify-center">
          <div className="bg-card border flex flex-col xl:flex-row justify-center gap-5 p-5 rounded-xl mx-auto shadow-lg shadow-black/50">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center items-center">
              <Image
                src="/img/tmsa_logo_1.png"
                alt="tmsa logo"
                width={350}
                height={100}
                quality={100}
                priority={true}
              />
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-sm  flex flex-col justify-center align-middle gap-5">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text">
                Tracker & Manage
              </h2>

              <SignInForm />
            </div>
          </div>
        </div>
      </AuthProvider>
    </>
  );
}
