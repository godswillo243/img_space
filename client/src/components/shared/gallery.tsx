// gallery.tsx
import ImageCard from "./image-card";

interface Props {
  images: I_Image[];
}

const Gallery = ({ images }: Props) => {
  return (
    <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 w-full">
      {images.map((image) => (
        <ImageCard key={image._id} image={image} />
      ))}
    </div>
  );
};

export default Gallery;
