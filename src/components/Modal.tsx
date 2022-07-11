import { CgSpinner } from 'react-icons/cg'
import { database, storage } from "../../src/firebase"
import { deleteDoc, doc, getDoc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { useState } from 'react'
import { useAuth } from '../useAuth'
import { useRouter } from 'next/router'
import { Post } from '../types'

const Modal = ({post, closeModal }: {post:Post, closeModal: () => void}) => {

  const router = useRouter()
  const {user} = useAuth()
  const [loading, setLoading] = useState(false)

  const deletePost = async () => {
    if (post.author !== user.displayName) return
    setLoading(true)

    // Delete files from storage
    for (let file in post.images){
      await deleteObject(ref(storage, 'images/' + file))
    }

    // Delete document from firestore
    await deleteDoc(doc(database, 'posts', post.id))
    router.push('/home')
  }
  

  return (
    <main className="w-full h-full flex justify-center items-center shadow-2xl">
      <div className="max-w-sm md:max-w-md lg:max-w-lg bg-neutral-100 dark:bg-neutral-900 rounded overflow-hidden text-lg">
        <header className="bg-neutral-300 dark:bg-black px-4 py-2">Are you sure about this?</header>
        <p className="px-4 py-4 mb-5 font-normal">
          This action is inreversible, after you will press <code className="bg-neutral-200 dark:bg-neutral-700 p-1 rounded">Delete</code> button, 
          this post will be deleted permanently!
          You wont be able to restore it afterwards.
        </p>
        <div className="flex items-center justify-end gap-2 p-2">
          <button disabled={loading} onClick={deletePost} className={`px-3 py-1 rounded text-white bg-red-500 transition duration-200 ${loading ? 'bg-red-600' : 'hover:bg-red-600'} `}>
            {loading ? <CgSpinner className='animate-spin text-3xl mx-3' /> : 'Delete'}
          </button>
          <button disabled={loading} onClick={closeModal} className="px-3 py-1 border rounded border-neutral-400 text-neutral-600 dark:text-neutral-400 hover:text-black hover:border-black  dark:hover:text-white dark:hover:border-white transition duration-200">Cancel</button>
        </div>
      </div>
    </main>
  )
}

export default Modal
