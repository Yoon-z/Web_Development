import './style_app.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home"
import Login from './pages/auth/Login';
import Register from './pages/auth/Register'
import History from './pages/History';
import Create from './pages/Create';
import Profile from './pages/Profile';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/create",
    element: <Create />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
]);

function App() {
  return (
    <div id='App'>
    <RouterProvider router={router} />
    </div>
  );
}

export default App;
