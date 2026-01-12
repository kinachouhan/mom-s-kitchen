
import { Outlet } from "react-router-dom";
import { AdminHeader } from "../admin/AdminHeader";
import { Footer } from "../components/Footer"; 


export const AdminLayout = () => {
  return (
    <>
      <AdminHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
