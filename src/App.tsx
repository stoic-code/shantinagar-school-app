import { createBrowserRouter, RouterProvider } from "react-router-dom";
import QueryProvider from "./providers/QueryProvider";
import { ThemeProvider } from "./providers/ThemeProvider";
import Home from "./pages/Home";
import { NotFound, Error } from "./pages/common";
import { ClassLayout, HomeLayout } from "./pages/layout";
import { AddResult, AddStudent, ClassRoom, Student } from "./pages/class";
import { useEffect } from "react";
import { connectdb } from "./db/db";
import { studentMigration } from "./db/student.migration";

// ROUTES
const router = createBrowserRouter([
  {
    path: "",
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
          { path: "", element: <Home /> },
          {
            path: "/class/:slug",
            element: <ClassLayout />,
            children: [
              { path: "", element: <ClassRoom /> },
              { path: "student/:id", element: <Student /> },
              { path: "student/new", element: <AddStudent /> },
              {
                path: "result/:term/:roll",
                element: <AddResult />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => {
  useEffect(() => {
    const handleMigration = async () => {
      const db = await connectdb();
      await studentMigration(db);
    };
    handleMigration();
  }, []);
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryProvider>
  );
};

export default App;
