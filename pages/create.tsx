import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"

import { useAuth } from "../src/useAuth"
import { storage, database } from "../src/firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, setDoc } from "firebase/firestore"; 

import { v4 } from "uuid"
import dayjs from "dayjs"

import { CgSpinner } from 'react-icons/cg'
import Rating from "../src/components/Rating"
import Carousel from "../src/components/Carousel"

const Create = () => {

  const router = useRouter()
  const {user} = useAuth()

  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)

  const [images, setImages] = useState<String[]>([])
  const [files, setFiles] = useState<File[]>([])
  
  const city = useRef<HTMLInputElement>(null)
  const title = useRef<HTMLInputElement>(null)

  const handleImg = (evt: any) => {
    setImages([])
    setFiles([])
    if (!evt.target.files) return
    for (let file of evt.target.files){
      try {
        if (file.type.split('/')[0] !== 'image') throw Error('This file is no an image')
        let url = URL.createObjectURL(file)
        setFiles(prev => {
          if (prev.length && prev.find(f => f.name === file.name)) return [...prev]
          else return [...prev, file]
        })
        setImages(prev => {
          if (prev && prev.includes(url)) return [...prev]
          else return [...prev, url]
        })
      } catch (error) { console.warn('file skipped, not an image') }
    }
  }


  const upload = async (evt:any) => {
    evt.preventDefault()
    if (!files || !city.current!.value || !title.current!.value || !rating) return
    setLoading(true)
    
    const id = v4()
    const uploadedImages:any = {}

    for (let file of files) {
      const imageRef = ref(storage, 'images/' + file.name)
      const uploadResult = await uploadBytes(imageRef, file)
      const imageUrl = await getDownloadURL(uploadResult.ref)
      uploadedImages[file.name] = imageUrl
    }

    // console.log('URLs of files pushed to storage', uploadedImages);

    await setDoc(doc(database, "posts", id), {
      id: id,
      time: dayjs().format(),
      user: user.displayName,
      city: city.current?.value.toLowerCase(),
      title: title.current?.value,
      images: uploadedImages,
      rating: {
        [user.displayName]: rating
      }
    });

    // It's not secure solution. In future revalidation will be invoked by firebase functions.  
    const url = typeof window === 'undefined' ? process.env.NEXT_PUBLIC_URL : window.location.origin
    await fetch(url + `/api/revalidate?key=${process.env.NEXT_PUBLIC_REVALIDATE_KEY}`)
    
    router.push('/home')  
  }


  useEffect(() => {
    if (!user) router.push('/login')
  }, [user])



  return user && (
    <div className="flex-1 flex flex-col justify-center items-center p-5">

      <div className="flex flex-col gap-6 w-10/12 sm:w-7/12 lg:w-5/12 xl:w-4/12 overflow-auto">

        {/* Preview */}
        {images.length > 0 && <Carousel images={images} /> }

        {/* Details */}
        <form onSubmit={upload} className=" w-full flex flex-col justify-center items-center gap-2">
          
          <div className="w-full grid grid-cols-4 gap-3 justify-center items-center">
            
            {/* File input */}
            <input type="file" className={` col-span-3 block text-sm text-slate-400 
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-neutral-100 dark:file:bg-neutral-700
              file:text-emerald-500 
              hover:file:bg-emerald-500 dark:hover:file:bg-emerald-600
              hover:file:text-white`}
            onChange={handleImg}
            disabled={loading}
            multiple accept="image/*" />

            {images.length > 0 && (<>
              <button type="submit" disabled={loading} className="col-span-1 flex justify-center items-center px-4 py-1 text-white bg-emerald-500 hover:bg-emerald-600 rounded-full">{loading ? <CgSpinner className="text-2xl animate-spin" /> : 'Upload'}</button>
              <input type="text" name="city"  disabled={loading} ref={city} required placeholder="City" className="col-span-2 w-full px-5 py-2 bg-neutral-100 dark:bg-neutral-700 font-normal rounded-full border-neutral-300 dark:border-neutral-600" />
              <Rating className="col-span-2 " userRating={rating} setUserRating={setRating}  />
              <input type="text" name="title"  disabled={loading} ref={title} required placeholder="Title" className="col-span-4 w-full px-5 py-2 bg-neutral-100 dark:bg-neutral-700 font-normal rounded-full border-neutral-300 dark:border-neutral-600" />
            </>)}


          </div>

        </form>

      </div>
    </div>

  )
}

export default Create