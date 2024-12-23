import { BackBtn } from "@/components/BackBtn";
import { Outlet } from "react-router-dom";

export const ClassLayout = () => {
  return (
    <div className="px-10 print:px-0">
      <BackBtn />
      <Outlet />
    </div>
  );
};
