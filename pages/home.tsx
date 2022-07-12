import { database } from "../src/firebase"
import { collection, getDocs } from "firebase/firestore"
import Post from "../src/components/Post"
import {Post as PostType} from '../src/types'
import Link from "next/link"

export const getStaticProps = async () => {
  const posts:any[] = []
  const response = await getDocs(collection(database, 'posts'))
  if (response.size) {
    response.forEach(post => {
      posts.push(post.data())
    })
  }

  return {
    props: {posts}
  }
}

const Home = ({posts}: {posts:PostType[]}) => {

  console.log(posts);
  

  if (posts && posts.length > 0) return (
    <main className="flex-1 container mx-auto p-3 pt-5 sm:pt-10">
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 sm:gap-7'>
        {posts.map((post: PostType) => <Post key={post.id} data={post} />)}
      </div>
    </main>
  )
  else return (
    <div className="flex-1 flex flex-col justify-center items-center text-3xl">
      <div>There's no posts</div>
      <Link href={'/create'} >
        <button className="font-normal text-lg dark:text-emerald-100 text-emerald-900">
          Click here to upload your first post
        </button>
      </Link>
    </div>
  )
}

export default Home