import React from 'react'
import ImageCard from "./image-card.tsx"
interface GalleryProps {
  imageSrcs: string[];
}
const Gallery = ({imageSrcs}:GalleryProps) => {
  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      {imageSrcs.map((imgSrc, index) => <ImageCard imageSrc={imgSrc}/>)}
    </div>
  )
}

export default Gallery