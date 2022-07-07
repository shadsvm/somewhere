import { useState, useEffect } from "react"
import { useRouter } from "next/router"
// import { useAuth } from "../../src/useAuth"

import { collection, getDocs, query, where } from "firebase/firestore"
import { database } from "../../src/firebase"
import { CgSpinner } from 'react-icons/cg'
import {Post as PostType} from '../../src/types'
import Post from "../../src/components/Post"

const Profile = () => {

  // const {user} = useAuth()
  const router = useRouter()
  const {username} = router.query

  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    
    const fetchPosts = async () => {
      setLoading(true)
      const q = query(collection(database, "posts"), where("user", "==", username));
      const response = await getDocs(q)
      if (!response.size) return router.push('/error')

      response.forEach(async post => {
        setData((prev:any) => {
          if (prev.length && prev.find((i:PostType) => i.id === post.id)) return [...prev]
          else return [...prev, post.data()]
        })
      })
      setLoading(false)
    }

    if (!username) router.push('/error')
    else fetchPosts()

  }, [username])

  if (loading) return <div className="h-full flex justify-center items-center"><CgSpinner className="text-3xl animate-spin" /></div>


  return data && username && (

      <div className='container mx-auto flex-1 flex flex-col p-5'>

        <header className='flex flex-col items-center gap-3 py-10 text-3xl'>
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 flex justify-center items-center">{username[0]}</div>
          <div>{username}</div>
        </header>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7'>
          {data.map((post: PostType) => <Post key={post.id} data={post} />)}
        </div>

      </div>

    
  )
}

export default Profile