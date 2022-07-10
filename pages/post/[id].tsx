import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import { doc, getDoc } from "firebase/firestore"
import { database } from "../../src/firebase"

import Carousel from "../../src/components/Carousel"
import Rating from "../../src/components/Rating"
import { CgSpinner } from 'react-icons/cg'
import dayjs from "dayjs"

const Post = () => {

  const router = useRouter()
  const {id} = router.query

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>({})


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (!id) return
      const postRef = doc(database, 'posts', id.toString())
      const postSnap = await getDoc(postRef)
      if (!postSnap.exists()) return router.push('/error')
      setData(postSnap.data())
      setLoading(false)
    }

    fetchData()
    
  }, [id])


  if (loading) return <div className="h-full flex justify-center items-center"><CgSpinner className="text-3xl animate-spin" /></div>

  return data && (
    <div className="flex-1 flex flex-col justify-center items-center p-5">
      
      <div className="bg-neutral-100 dark:bg-neutral-700 shadow-2xl rounded-lg overflow-hidden w-full md:max-w-4xl h-full md:h-96 md:flex">

        <section className="w-full md:w-96 bg-inherit">
          <Carousel images={data.urls} />
        </section>

        <section className="flex-1 flex flex-col justify-between items-start gap-5 p-5">
          <div className="flex flex-col items-start">
            <header className="text-2xl">{data.title}</header>
            <Rating userRating={data.rating[data.user]} />
            <p className="font-normal my-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus maxime sapiente incidunt, quaerat nobis vel nihil recusandae voluptates soluta dolorum nam asperiores sit cupiditate natus placeat sed omnis minus accusamus.</p>
          </div>

          
          <div>
            Posted by 
            <Link href={'/user/'+data.user}>
              <span className="text-emerald-500 cursor-pointer"> {data.user} </span>
            </Link> 
            on {dayjs(data.time).format('DD/MM/YYYY')}
          </div>

        </section>

      </div>
      
    </div>
  )
}

export default Post
