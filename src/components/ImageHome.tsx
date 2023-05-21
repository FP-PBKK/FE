import React from 'react'
import { ImageCard } from './image/ImageCard'
import Image from 'next/image';
import foto1 from "./image/foto1.webp"
import foto2 from "./image/foto2.webp"
import foto3 from "./image/foto3.webp"
const ImageHome = () => {
    const style = "contrast-50 hover:scale-105 hover:contrast-100 transition ease-in-out duration-500"
    return (
        <div className="flex flex-col items-center justify-center w-full h-full space-y-4 md:w-screen md:h-1/2 md:flex-row md:items-start md:justify-evenly">
            <ImageCard><Image src={foto1} width={500} height={500} alt={`${foto1}`} /></ImageCard>
            <ImageCard><Image src={foto2} width={500} height={500} alt={`${foto2}`} /></ImageCard>
            <ImageCard><Image src={foto3} width={500} height={500} alt={`${foto3}`} /></ImageCard>
        </div>
    )
}

export default ImageHome