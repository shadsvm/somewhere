import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import Link from "next/link"

import { doc, getDoc } from "firebase/firestore"
import { database } from "../../src/firebase"

import Rating from "../../src/components/Rating"
// import { useAuth } from "../../src/useAuth"
import { CgSpinner } from 'react-icons/cg'
import dayjs from "dayjs"

const Post = () => {

  const router = useRouter()
  const {id} = router.query

  // const {user} = useAuth()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>({})

  // const [rating, setRating] = useState(0)
  // const [ratingState, setRatingState] = useState(false)
  // const submitRating = () => {
  //   if(!rating || !user) return
  //   setData((prev:any) => {
  //     return {
  //       ...prev,
  //       rating: {
  //         ...prev.rating,
  //         [user.displayName]: rating
  //       }
  //     }
  //   })
  //   setRatingState(false)
  // }

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

  // useEffect(() => {
  //   if(!data.rating) return
  //   let sum:any = Object.values(data.rating).reduce((sum:any, current:any) => sum + current, 0)
  //   console.log('avg rating', sum/Object.values(data.rating).length);
    
  // }, [data.rating])

  if (loading) return <div className="h-full flex justify-center items-center"><CgSpinner className="text-3xl animate-spin" /></div>

  return data && (
    <div className="flex-1 flex flex-col justify-center items-center p-5">
      
      <div className="bg-neutral-100 dark:bg-neutral-700 shadow-2xl rounded-lg overflow-hidden w-full md:max-w-4xl h-full md:h-96 md:flex">

        <section className="w-full md:w-96 bg-inherit aspect-square relative">
          <Image 
            className="" 
            src={data.url} 
            priority
            layout='fill'
            objectFit="cover"
            alt="" />
        </section>

        <section className="flex-1 flex flex-col justify-between items-start gap-5 p-5">
          <div className="flex flex-col items-start">
            <header className="text-2xl">{data.title}</header>
            <Rating userRating={data.rating[data.user]} />
            <p className="font-normal my-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus maxime sapiente incidunt, quaerat nobis vel nihil recusandae voluptates soluta dolorum nam asperiores sit cupiditate natus placeat sed omnis minus accusamus.</p>

            {/* {user && !Object.keys(data.rating).includes(user.displayName) &&
              <div className="flex flex-col gap-2">
                { ratingState && <Rating userRating={rating} setUserRating={setRating} />}
                <button onClick={() => ratingState ? submitRating() : setRatingState(true)} className="text-emerald-500 border-emerald-500 border px-3 py-1 rounded-full">{ratingState ? 'Submit' : 'Rate this place'}</button>
              </div>
            } */}
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
