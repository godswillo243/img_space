import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

// Components
import Header from "./components/shared/header.tsx";
// Public routes
import Home from "./routes/home.tsx";
import ImageView from "./routes/image.tsx";
import Search from "./routes/search.tsx";
// Auth routes
import AuthLayout from "./routes/auth/_layout.tsx";
import SignIn from "./routes/auth/sign-in.tsx";
import SignUp from "./routes/auth/sign-up.tsx";
// Private routes
import { ProtectedRoute } from "./components/shared/protected-routes.tsx";
import Upload from "./routes/protected/upload.tsx";
import Profile from "./routes/protected/profile.tsx";

import { getAuthUser } from "./services/actions.ts";
import { useAuthStore } from "./lib/store/auth-store.ts";
import NotFound from "./routes/not-found.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

function App() {
  const { user, accessToken } = useAuthStore();
  const { data, isPending: isFetchingUser } = useQuery({
    queryKey: ["user"],
    queryFn: getAuthUser,
  });
  useEffect(() => {
    if (isFetchingUser) return;

    useAuthStore.setState((state) => ({
      ...state,
      user: accessToken ? data : null,
    }));
  }, [data, isFetchingUser, accessToken]);

  return (
    <>
      <div className="relative pt-20 w-screen h-full max-w-screen max-h-screen overflow-auto">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/images/:id" element={<ImageView />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile/" element={<Profile />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/upload" element={<Upload />} />
          </Route>
          <Route element={!user ? <AuthLayout /> : <Navigate to={"/"} />}>
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
