import Link from "next/link"
import { Post } from '../types'
import { BsFiles } from 'react-icons/bs'
import ImageEffect from "./ImageEffect"

const Post = ({data}: {data: Post}) => {

  return data.urls && (
    <Link href={'/post/'+data.id} className="group">
      <div className="flex flex-col">
        
        <div className=" w-full rounded-lg overflow-hidden bg-inherit aspect-square relative">
          <ImageEffect src={data.urls[0]} alt={data.title} />
          { data.urls.length > 1 && <BsFiles className="absolute right-5 bottom-5 text-3xl md:test-xl lg:text-lg" />}
        </div>

        <h3 className="mt-2 text-sm text-neutral-400">{data.user}</h3>
        <p className="text-lg font-medium text-neutral-700 dark:text-neutral-200">{data.title}</p>
      </div>
    </Link>
  )
}

export default Post