import React from 'react'

interface ImageCardProps {
  imageSrc: string;
}

const ImageCard = ({imageSrc}: ImageCardProps) => {
  return (
    <div className="w-full h-full " >
      <img src={imageSrc} alt={imageSrc}/>
    </div>
  )
}

export default ImageCard