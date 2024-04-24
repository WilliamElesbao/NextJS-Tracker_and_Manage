import { NavHeader } from "@/shared/header/navHeader";
import { AuthProvider } from "@/shared/test/authDataProvider";

export default function Home() {
  return (
    <>
      <AuthProvider>
        <NavHeader />
        <h1>Hello World</h1>
      </AuthProvider>
    </>
  );
}
