import { createBrowserRouter } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Admin } from "./Pages/Admin";
import { Login } from "./Pages/Login";
import { Networks } from "./Pages/Networks";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/admin',
    element: <Admin/>
  },
  {
    path: '/login',
    element: <Login/>
  },

  {
    path: '/admin/social',
    element: <Networks/>
  }
])