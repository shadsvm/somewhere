import Link from "next/link"
import { Post } from '../types'
import { BsFiles } from 'react-icons/bs'
import ImageEffect from "./ImageEffect"

const Post = ({data}: {data: Post}) => {

  return data.images && (
    <Link href={'/post/'+data.id} className="group">
      <div className="flex flex-col">
        
        <div className=" w-full rounded-lg overflow-hidden bg-inherit aspect-square relative">
          <ImageEffect src={Object.values(data.images)[0]} alt={data.title} />
          { Object.values(data.images).length > 1 && <BsFiles className="absolute right-5 bottom-5 text-3xl md:test-xl lg:text-lg" />}
        </div>

        <h3 className="mt-2 text-sm text-neutral-400">{data.author}</h3>
        <p className="text-lg font-medium text-neutral-700 dark:text-neutral-200">{data.title}</p>
      </div>
    </Link>
  )
}

export default Post