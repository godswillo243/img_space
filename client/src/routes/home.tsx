import { useEffect, useState } from "react";
import Gallery from "../components/shared/gallery";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getImageFeed } from "@/services/actions";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import API from "@/services/api";

const Home = () => {
  const [images, setImages] = useState<I_Image[]>([]);
  const { data, isPending } = useQuery<
    { images: I_Image[] },
    AxiosError,
    { images: I_Image[]; pagination: Record<string, string> },
    ["images"]
  >({
    queryKey: ["images"],
    queryFn: getImageFeed,
    refetchInterval: 60000,
  });

  console.log(data);

  useEffect(() => {
    if (data?.images) {
      setImages(data.images);
    }
  }, [data]);

  if (isPending) return <div>Loading...</div>;
  if (!images)
    return (
      <div>
        {" "}
        <p>Error fetching images</p>{" "}
      </div>
    );

  return (
    <div className="w-full  relative px-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold" data-slot="title">
          Feed
        </h3>
      </div>
      {!images.length ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="default"></EmptyMedia>
            <EmptyTitle>Images not found</EmptyTitle>
            <EmptyDescription>No images uploaded yet!</EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link to="/upload">
              <Button>Upload one now</Button>
            </Link>
          </EmptyContent>
        </Empty>
      ) : (
        <Gallery images={images} />
      )}
    </div>
  );
};

export default Home;
