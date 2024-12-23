import { Link } from "react-router-dom";

const StudentNotFoundPage = () => {
  return (
    <div className="h-full w-full flex items-center text-center justify-center gap-y-8 flex-col min-h-[70vh]">
      <img src="/check.svg" width={200} alt="check" />
      <div className="text-5xl font-semibold">
        Student Finished <br /> Hurray!!
      </div>
      <div>
        <Link to="/" className="text-blue-600 underline underline-offset-2">
          Go To Home
        </Link>
      </div>
    </div>
  );
};

export default StudentNotFoundPage;
