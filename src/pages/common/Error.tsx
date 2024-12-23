import { Link } from "react-router-dom";

export const Error = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <img src="/error.svg" height={100} width={100} alt="" />
      <h1 className="mb-2 text-3xl font-bold">Oops! Something Went Wrong</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        We're sorry, but it seems like something went wrong.
        <div className="text-center">
          <Link to="/" className="text-blue-600 underline underline-offset-2">
            Go To Home
          </Link>
        </div>
      </p>
    </div>
  );
};
