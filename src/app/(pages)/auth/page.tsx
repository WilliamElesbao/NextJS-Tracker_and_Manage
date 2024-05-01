import Image from "next/image";
import { SignInForm } from "./components/ui/signin-form";

export default function SignInPage() {
  return (
    <>
      <div className="bg-foreground min-h-screen flex flex-col justify-center">
        <div className="bg-card flex flex-col xl:flex-row justify-center gap-5 p-5 rounded-md mx-auto shadow-lg shadow-black/50">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm flex justify-center items-center">
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
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-black">
              Tracker & Manage
            </h2>

            <SignInForm />
          </div>
        </div>
      </div>
    </>
  );
}
