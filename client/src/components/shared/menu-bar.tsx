import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { LucideLogOut } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";
import { useQueryClient } from "@tanstack/react-query";
import { setLocalStorage } from "@/lib/utils";

const MenuBar = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const handleSignOut = () => {
    useAuthStore.setState((state) => ({
      ...state,
      accessToken: "",
      user: null,
    }));
    setLocalStorage("accessToken", "");
    queryClient.removeQueries({ queryKey: ["user"] });
  };
  if (!user) return;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-fit! p-0!">
          <Avatar className="size-10">
            <AvatarImage src={user.profilePictureUrl} />
            <AvatarFallback className="font-medium text-xl">
              {user.username[0].toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4">
        <Link to={"/profile"}>
          <div className="flex items-center gap-2 hover:bg-accent/80 active:bg-accent/80 p-2 rounded-md">
            <Avatar>
              <AvatarImage src={user.profilePictureUrl} />
              <AvatarFallback className="font-medium text-xl">
                {user.username[0].toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
            <p className="text-foreground/80 font-medium ">{user.username}</p>
          </div>
        </Link>
        <Button variant={"destructive"} onClick={() => handleSignOut()}>
          <LucideLogOut />
          Sign out
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default MenuBar;
