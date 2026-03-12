import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent } from "@/components/ui/card";
import { useImageDownload } from "@/hooks/use-download";
import { useAuthStore } from "@/lib/store/auth-store";
import { formatDate } from "@/lib/utils";
import { getImage } from "@/services/actions";
import API from "@/services/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  LucideDownload,
  LucideLoader2,
  LucideShare2,
  LucideTrash,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Image = () => {
  const { id } = useParams();
  const { data: image, isPending } = useQuery({
    queryKey: ["image", id],
    queryFn: () => getImage(id!),
  });

  const { mutate: deleteImage, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) =>
      await API({ method: "DELETE", url: `/images/${id}/image` }),
  });
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { download: handleDownload, loading: isDownloading } =
    useImageDownload();

  if (isPending) return <div>Loading...</div>;
  if (!image) return <div> Error loading image </div>;

  const handleDelete = () => {
    deleteImage(image._id, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  const { user: imageUser } = image;

  return (
    <div className="p-4 w-full ">
      <div className="grid grid-cols-[1fr_324px] max-lg:grid-cols-[1fr_280px] max-md:grid-cols-1 w-full gap-2">
        <div className="w-full max-h-120 flex items-center justify-center">
          <img
            src={image?.url}
            alt=""
            className="rounded-sm  w-full h-full object-contain"
          />
        </div>

        <div>
          <Card className="py-4 border-0 max-w-xl mx-auto ">
            <CardContent className="space-y-4">
              <Link
                to={`/profile/${imageUser._id}`}
                className="flex items-center gap-2"
              >
                <Avatar>
                  <AvatarImage src={imageUser?.profilePictureUrl} />
                  <AvatarFallback className="font-medium text-xl">
                    {imageUser?.username[0].toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-medium">{imageUser?.username}</h2>
              </Link>
              <div>
                <h4 className="text-lg font-semibold">{image?.title}</h4>
                <p className="text-sm text-foreground">{image?.description}</p>
              </div>
              <p className="text-muted-foreground">
                {formatDate(image?.createdAt)}
              </p>
            </CardContent>
            <CardAction className="px-4 space-x-4">
              <Button
                variant={"ghost"}
                className="aspect-square size-10"
                disabled={isDownloading}
                onClick={() =>
                  handleDownload(image.url, image.title.replace(" ", "_"))
                }
              >
                {isDownloading ? (
                  <LucideLoader2 className="animate-spin" />
                ) : (
                  <LucideDownload className="size-6" />
                )}
              </Button>
              <Button variant={"ghost"} className="aspect-square size-10">
                <LucideShare2 className="size-6" />
              </Button>
              {imageUser._id === user?._id && (
                <Button
                  variant={"ghost"}
                  onClick={() => handleDelete()}
                  className="aspect-square size-10"
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <LucideLoader2 className="animate-spin" />
                  ) : (
                    <LucideTrash className="size-6 text-destructive" />
                  )}
                </Button>
              )}
            </CardAction>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Image;
