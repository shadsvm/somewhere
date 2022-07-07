import { AiFillStar } from 'react-icons/ai'

const Rating = ({className, userRating, setUserRating}: 
{className?: String, userRating: number, setUserRating?: (star: number) => void}) => {
  
  const rating = [1,2,3,4,5]

  return (
    <div className={`${className} flex justify-end items-center py-1 `}>
      {rating.map(star => <AiFillStar className={`${userRating >= star ? 'text-emerald-500' : 'text-neutral-300 dark:text-neutral-600 '} text-3xl  `} key={star} onClick={() => setUserRating && setUserRating(star)}  />)}
    </div>
  )
}

export default Rating