import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import Inbox from "../Components/Containers/Inbox";
import Today from "../Components/Containers/Today";
import Upcoming from "../Components/Containers/Upcoming";
import FilterAndLabels from "../Components/Containers/FilterAndLabels";
import ProjectDetail from "../Components/Containers/ProjectDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/app",
        element: <HomePage />,
        children: [
          {
            path: "inbox",
            element: <Inbox />,
          },
          {
            path: "today",
            element: <Today />,
          },
          {
            path: "upcoming",
            element: <Upcoming />,
          },
          {
            path: "filter-labels",
            element: <FilterAndLabels />,
          },
          {
            path: "project/:project_detail",
            element: <ProjectDetail />,
          },
        ],
      },
    ],
  },
]);
