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

const Create = () => {

  const router = useRouter()
  const {user} = useAuth()

  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string>()
  const [image, setImage] = useState<any>()
  const [rating, setRating] = useState(0)
  
  const city = useRef<HTMLInputElement>(null)
  const title = useRef<HTMLInputElement>(null)

  const handleImg = (evt: any) => {
    let file = evt.target.files[0]
    if(file?.type.split('/')[0] !== 'image') {
      setImage(undefined)
      setPreview('')
    }
    else setImage(file)
  }

  const upload = async (evt:any) => {
    evt.preventDefault()
    if (!image || !city.current!.value || !title.current!.value || !rating) return
    setLoading(true)
    const id = v4()
    const imageRef = ref(storage, 'images/' + id)
    const uploadResult = await uploadBytes(imageRef, image)
    const imageURL = await getDownloadURL(uploadResult.ref)
    
    await setDoc(doc(database, "posts", id), {
      id: id,
      url: imageURL,
      user: user.displayName,
      city: city.current?.value.toLowerCase(),
      title: title.current?.value,
      time: dayjs().format(),
      rating: {
        [user.displayName]: rating
      }
    });

    setLoading(false)
    router.push('/')
  }

  useEffect(() => {
    if (image) setPreview(URL.createObjectURL(image))
  }, [image])

  useEffect(() => {
    if (!user) router.push('/login')
  }, [user])

  return user && (
    <div className="flex-1 flex flex-col justify-center items-center p-5">

      <div className="flex flex-col gap-6 w-10/12 sm:w-7/12 lg:w-5/12 xl:w-4/12 overflow-auto">

        {/* Preview */}
        {preview && <img src={preview} alt="Uploaded image preview" className="w-full aspect-square object-cover rounded-lg" />}

        {/* Details */}
        <form onSubmit={upload} className=" w-full flex flex-col justify-center items-center gap-2">
          
          <div className="w-full grid grid-cols-4 gap-3	justify-center items-center">
            
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

            {preview && (<>
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