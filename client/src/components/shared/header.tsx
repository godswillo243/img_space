import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

import MenuBar from "./menu-bar";
import { LucideHome, LucideSearch, LucideUpload } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";

const Header = () => {
  const { user } = useAuthStore();
  const { pathname } = useLocation();

  return (
    <header className="fixed z-10 top-0 left-0 w-full p-4 py-2 flex items-center justify-between gap-2 bg-background">
      <Link to={"/"} className="">
        <span className="font-bold font-[montserrat] text-xl">ImgSpace </span>
      </Link>

      {user ? (
        <div className="flex gap-2 items-center ">
          {pathname !== "/" && (
            <Link to={"/"}>
              <Button variant={"ghost"}>
                <LucideHome className="size-5" />
                <span className="text-sm max-sm:hidden">Home</span>
              </Button>
            </Link>
          )}
          {/* <Link to={"/search"}>
            <Button variant={"ghost"}>
              <LucideSearch className="size-5" />
              <span className="text-sm max-sm:hidden">Search</span>
            </Button>
          </Link> */}
          <Link to={"/upload"}>
            <Button variant={"ghost"}>
              <LucideUpload className="size-5" />
              <span className="text-sm max-sm:hidden">Upload</span>
            </Button>
          </Link>
          <MenuBar />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link to={"/sign-in"}>
            <Button variant={"default"}>Sign in</Button>
          </Link>
          <Link to={"/sign-up"}>
            <Button variant={"outline"}>Sign up</Button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
