import { MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BackBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="group print:hidden flex items-center gap-2 duration-100 text-blue-600"
    >
      <MoveLeft
        size={16}
        className="transition-transform duration-200 group-hover:-translate-x-1"
      />{" "}
      Go Back
    </button>
  );
};
