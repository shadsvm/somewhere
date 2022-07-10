import Image from "next/image"
import { useState } from "react"


const ImageEffect = ({src, alt=''}: {src:any, alt?:string}) => {
  
  const [loading, setLoading] = useState(true)
  const classCombo = (...classes:string[]) => classes.join(' ')

  return <Image
      src={src}
      alt={alt} priority
      className={classCombo(
        ' group-hover:scale-105 ease-in-out duration-700 rounded-lg', 
        loading ? 'blur-md grayscale' : '')} 

      layout="fill" objectFit="cover"
      onLoadingComplete={() => setLoading(false)}
    />
}

export default ImageEffect