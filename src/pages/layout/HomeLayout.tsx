import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
