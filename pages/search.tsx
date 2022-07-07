import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { database } from "../src/firebase"
import { useStore } from "../src/store"
import { CgSpinner } from 'react-icons/cg'
import Post from "../src/components/Post"
import {Post as PostType} from '../src/types'

const Search = () => {

  const searchQuery = useStore(state => state.query)

  const [data, setData] = useState<any>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const q = query(collection(database, "posts"), where("city", "==", searchQuery.toLowerCase()));
      const response = await getDocs(q)
      if (!response.size) return setLoading(false)

      response.forEach(async post => {
        setData((prev:any) => {
          if (prev.length && prev.find((i:PostType) => i.id === post.id)) return [...prev]
          else return [...prev, post.data()]
        })
      })
      setLoading(false)
    }

    fetchPosts()

  }, [searchQuery])

  if (loading) return <div className="h-full flex justify-center items-center"><CgSpinner className="text-3xl animate-spin" /></div>

  return data && (
    <main className="flex-1 container mx-auto p-3 ">
      <header className="text-3xl text-center py-5 sm:py-10">{data.length} results</header>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7'>
        {data.map((post: PostType) => <Post key={post.id} data={post} />)}
      </div>
    </main>
    
  )
}

export default Search