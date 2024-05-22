import { AuthProvider } from "@/contexts/AuthContext/authContext";
import { NavHeader } from "@/ui/navHeader";
import { Sidebar } from "@/ui/sidebar";
import { ToastContainer } from "react-toastify";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <div>
        <div className="relative h-full">
          <NavHeader />
          <div className="absolute left-5 top-1/2 transform -translate-y-1/2 ">
            <Sidebar />
          </div>
        </div>

        <main>{children}</main>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          pauseOnHover={false}
          closeButton={false}
          toastStyle={{ background: "black", color: "white" }}
        />
      </div>
    </AuthProvider>
  );
}
