import Gallery from "../../components/shared/gallery";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useAuthStore } from "@/lib/store/auth-store";
import { getUser, getUserImages } from "@/services/actions";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const { id } = useParams();
  const { user: authUser } = useAuthStore();
  const isAuthUser = !id || id === authUser?._id;
  const { data } = useQuery({
    queryKey: [id && !isAuthUser ? "profile" : "user", id],
    queryFn: async () => getUser(id!),
    enabled: !isAuthUser,
  });
  const user = isAuthUser ? authUser : data;
  const { data: images, isPending: isGettingImages } = useQuery({
    queryKey: ["user-image"],
    queryFn: async () => getUserImages(user._id),
  });
  if (!user) return <div>Error fetching user data</div>;

  return (
    <>
      <div className="min-h-100dvh space-y-6">
        <header className="relative p-4 space-y-6 ">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={user.profilePictureUrl || "/profile.png"}
                alt={user.username}
                className="w-24 h-24 rounded-full object-cover block "
              />
            </div>

            {/* Identity */}
            <div className="">
              <h4 className="font-semibold text-xl">{user.username}</h4>
              <p className="text-sm font-light text-neutral-300">
                {user.email}
              </p>
            </div>
          </div>
          {isAuthUser && (
            <div className="p-2 space-x-2">
              <Button variant={"outline"}>Edit profile</Button>
              <Button variant={"outline"}>Delete account</Button>
            </div>
          )}
        </header>

        {
          <div className="flex flex-col gap-4 px-4">
            <div className="flex items-center gap-2 justify-between">
              <h5 className="text-lg font-medium">
                {" "}
                Images uploaded by user.{" "}
              </h5>
              {isAuthUser && (
                <Link to={"/upload"}>
                  <Button variant={"outline"}>Upload image</Button>
                </Link>
              )}
            </div>
            {isGettingImages ? (
              <Loader2Icon className="animate-spin size-12" />
            ) : (
              images &&
              (images.length === 0 ? (
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="default"></EmptyMedia>
                    <EmptyTitle>Images not found</EmptyTitle>
                    <EmptyDescription>No images uploaded yet!</EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent></EmptyContent>
                </Empty>
              ) : (
                <Gallery images={images} />
              ))
            )}
          </div>
        }
      </div>
    </>
  );
};

export default Profile;
