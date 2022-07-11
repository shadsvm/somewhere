import { useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import ImageEffect from "./ImageEffect"

const Carousel = ({images}: {images: String[]}) => {

  const [activeImage, setActiveImage] = useState(0)
  const changeImage = (number: 1 | -1) => {
    if (activeImage + number >= images.length) return setActiveImage(0)
    if (activeImage + number < 0) return setActiveImage(images.length-1)
    setActiveImage(activeImage + number)
  }

  return (
    <div className="relative text-3xl aspect-square ">
      <ImageEffect src={images[activeImage]} />
      { images.length > 1 && (<>
        <button onClick={() => changeImage(-1)} className="absolute inset-y-0 left-0 px-2 "><IoIosArrowBack /></button>
        <button onClick={() => changeImage(1)} className="absolute inset-y-0 right-0 px-2"><IoIosArrowForward /></button>
        <div className="absolute h-10 inset-x-0 bottom-0 flex items-center justify-center gap-3">
          { images.map((item:any, index:any) => (
            <div key={index} className={`${index === activeImage && 'bg-white'} transition duration-500 border-2 rounded-full p-1`}></div>
          ))}
        </div>
      </>)}
    </div>
  )
}

export default Carousel