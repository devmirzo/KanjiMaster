// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RootLayouts from "./layouts/RootLayouts";
import { KanjiProvider } from "./context/KanjiContext";
import { ProtectedRoute } from "./components";

import {
  AboutPage,
  KanjiDetailPage,
  KanjiPage,
  LevelsPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from "./pages";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayouts />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <LevelsPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "kanji/:level", element: <KanjiPage /> },
      { path: "kanji/detail/:id", element: <KanjiDetailPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
]);

function App() {
  return (
    <KanjiProvider>
      {/* 🔥 Global toaster joylashtirildi */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#384B70",
            color: "#FCFAEE",
            borderRadius: "10px",
            padding: "12px 16px",
            fontSize: "15px",
          },
        }}
      />
      <RouterProvider router={router} />
    </KanjiProvider>
  );
}

export default App;
