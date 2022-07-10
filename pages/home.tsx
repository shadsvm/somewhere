import { database } from "../src/firebase"
import { collection, getDocs } from "firebase/firestore"
import Post from "../src/components/Post"
import {Post as PostType} from '../src/types'

export const getStaticProps = async () => {
  const posts:any[] = []
  const response = await getDocs(collection(database, 'posts'))
  if (!response.size) return
  response.forEach(post => {
    posts.push(post.data())
  })

  return {
    props: {posts}
  }
}

const Home = ({posts}: {posts:PostType[]}) => {

  return posts.length > 0 && (
    <main className="flex-1 container mx-auto p-3 pt-5 sm:pt-10">
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7'>
        {posts.map((post: PostType) => <Post key={post.id} data={post} />)}
      </div>
    </main>
    
  )
}

export default Home