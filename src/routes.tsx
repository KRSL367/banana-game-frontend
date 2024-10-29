import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import StartGame from "./pages/StartGame";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./components/authcontext";

const publicRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "register", element: <RegisterPage /> },
];

const authenticatedRoutes = [
  { path: "/", element: <HomePage /> },
  { path: "start-game/", element: <StartGame /> },
];

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      ...publicRoutes.map(route => ({
        path: route.path,
        element: route.element
      })),
      ...authenticatedRoutes.map(route => ({
        path: route.path,
        element: (
          <ProtectedRoute requireAuth>
            {route.element}
          </ProtectedRoute>
        )
      })),
    ]
  }
]);

const AppRouter: React.FC = () => (
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);

export default AppRouter;