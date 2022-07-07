import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import {Post} from '../types'

const Post = ({data}: {data: Post}) => {

  const [loading, setLoading] = useState(true)
  const classCombo = (...classes:string[]) => classes.join(' ')
  
  return (
    <Link href={'/post/'+data.id} className="group">
      <div className="flex flex-col">
      <div className="
        w-full rounded-lg overflow-hidden bg-inherit
        aspect-square relative
      ">
        <Image 
          src={data.url}
          alt="" 
          priority
          className={classCombo(
            ' group-hover:scale-105 ease-in-out duration-700', 
            loading ? 'blur-md grayscale' : '')} 

          layout="fill"
          objectFit="cover"
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-2 text-sm text-neutral-400">{data.user}</h3>
      <p className="text-lg font-medium text-neutral-700 dark:text-neutral-200">{data.title}</p>
    </div>
    </Link>
  )
}

export default Post