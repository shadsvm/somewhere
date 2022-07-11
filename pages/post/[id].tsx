import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Link from "next/link"

import { database } from "../../src/firebase"
import { doc, getDoc } from "firebase/firestore"

import Carousel from "../../src/components/Carousel"
import Rating from "../../src/components/Rating"
import Modal from "../../src/components/Modal"

import dayjs from "dayjs"
import { useAuth } from "../../src/useAuth"

import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { CgSpinner } from 'react-icons/cg'
import { TbDots } from 'react-icons/tb'

const Post = () => {

  const router = useRouter()
  const {id} = router.query
  const {user} = useAuth()

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>({})
  const [menu, setMenu] = useState(false)
  const [modal, setModal] = useState(false)

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


  if (modal) return <Modal post={data} closeModal={() => setModal(false)} />
  if (loading) return <div className="h-full flex justify-center items-center"><CgSpinner className="text-3xl animate-spin" /></div>

  return data && (
    <div className="flex-1 flex flex-col justify-center items-center p-5">
      
      <div className="bg-neutral-100 dark:bg-neutral-700 shadow-2xl rounded-lg overflow-hidden w-full md:max-w-4xl h-full md:h-96 md:flex">

        <section className="w-full md:w-96 bg-inherit">
          <Carousel images={Object.values(data.images)} />
        </section>

        <section className="flex-1 flex flex-col justify-between items-start gap-5 p-5">
          <div className="flex flex-col items-start">
            <header className="text-2xl">{data.title}</header>
            <Rating userRating={data.rating[data.author]} />
            <p className="font-normal my-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus maxime sapiente incidunt, quaerat nobis vel nihil recusandae voluptates soluta dolorum nam asperiores sit cupiditate natus placeat sed omnis minus accusamus.</p>
          </div>

          
          <div className="w-full flex justify-between items-center">
            <div>
              Posted by 
              <Link href={'/user/'+data.author}>
                <span className="text-emerald-500 cursor-pointer"> {data.author} </span>
              </Link> 
              on {dayjs(data.time).format('DD/MM/YYYY')}
            </div>

            {user && data.author === user.displayName && (
            <div className="relative ">
              {menu && (
                <div className="absolute -top-24 -left-12 z-0 bg-neutral-800 overflow-hidden rounded-md flex flex-col items-start ">
                  <button className="w-full flex items-center gap-1 px-3 py-2 hover:bg-neutral-900"><AiOutlineEdit />Edit</button>
                  <button onClick={() => setModal(true)} className="w-full flex items-center gap-1 px-3 py-2 hover:bg-neutral-900 hover:text-red-400"><AiOutlineDelete /> Delete</button>
                </div>
              )}
              <TbDots className="text-2xl" onClick={() => setMenu(!menu)} />
            </div>)}
          </div>

        </section>

      </div>
      
    </div>
  )
}

export default Post
