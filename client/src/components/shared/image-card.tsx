import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  image: I_Image;
};

const ImageCard = ({ image }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      to={`/images/${image._id}`}
      className="block mb-3 break-inside-avoid group"
    >
      <div className="relative overflow-hidden rounded-xl bg-muted">
        {/* Skeleton shown until image loads */}
        {!loaded && (
          <div className="w-full h-48 animate-pulse bg-muted-foreground/10 rounded-xl" />
        )}
        <img
          src={image.url}
          alt={image.title ?? image._id}
          onLoad={() => setLoaded(true)}
          className={`w-full h-auto object-cover rounded-xl transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0 absolute inset-0"
          }`}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-end p-3">
          {image.title && (
            <p className="text-white text-sm font-medium line-clamp-2">
              {image.title}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ImageCard;
