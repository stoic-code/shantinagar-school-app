import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img src="/404.svg" width={100} height={100} alt="404" />
      <h1 className="mb-2 text-3xl font-bold">Page Not Found</h1>
      <p className="mb-3 text-lg text-muted-foreground">
        The page you're looking for doesn't seem to exist.
      </p>
      <Link to="/" className="text-blue-500 underline underline-offset-4">
        Back to Home Page
      </Link>
    </div>
  );
};
