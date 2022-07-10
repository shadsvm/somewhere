import { RiImageAddFill } from 'react-icons/ri'
import { IoPersonCircleOutline, IoSearch, IoMenu,  } from 'react-icons/io5'
import { IoMdLogOut, IoMdLogIn } from 'react-icons/io'
import { useStore } from '../store'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from '../useAuth'
import { useState} from 'react'

const Navbar = () => {

  const setQuery = useStore(state => state.setQuery)
  const query = useStore(state => state.query)
  const {user, signOut} = useAuth()
  const router = useRouter()
  const [menu, setMenu] = useState(false)

  const submit = (event:any) => {
    event.preventDefault()
    router.push('/search')
  }

  const logOut = async () => {
    try { signOut() } 
    catch (error:any) { alert(error.message) }

  }

  return (
    <div className='bg-white dark:bg-neutral-900'>
      
      {/* Main NAV */}
      <nav className="container mx-auto flex items-center justify-between gap-5 sm:gap-12 md:gap-24 lg:gap-48 p-4 ">
        
        {/* Logo */}
        <Link href='/'>
          <div className='text-lg tracking-widest cursor-pointer flex items-center'>
            <img src="/logo.png" className='w-12 h-12' alt="" />
            {/* <span className='sm:hidden'>SW</span> */}
            <span className='hidden sm:block '>SOMEWHERE</span>
          </div>
        </Link>
        
        {/* Search bar */}
        <form onSubmit={submit} className="flex-intial sm:flex-1 flex items-center bg-neutral-100 text-black dark:bg-neutral-700 dark:text-white  rounded-full px-5 py-2">
          <input type="text" value={query} onChange={evt => setQuery(evt.target.value)} className='bg-inherit w-36 sm:flex-1' placeholder='Search by city... '/>
          <button type="submit"><IoSearch className='text-xl text-neutral-400' /></button>
        </form>
        
        {/* Navigation for user */}
        {user && <div className="hidden sm:flex items-center text-2xl gap-3 sm:gap-5 md:gap-7">

          <Link href={'/create'}>
            <div className='cursor-pointer'><RiImageAddFill /></div>
          </Link>

          <Link href={'/user/' + user.displayName}>
            <div className='cursor-pointer'><IoPersonCircleOutline /></div>
          </Link>
          <button onClick={logOut}><IoMdLogOut /></button>
          
        </div>}
          
        
        {user ? 
          <button className='sm:hidden' onClick={() => setMenu(!menu)}><IoMenu className='text-2xl' /></button>
          :<Link href={'/login'}>
            <button className='flex justify-center items-center gap-3 text-emerald-500'>
              <IoMdLogIn className='text-3xl sm:hidden' />
              <span className='hidden sm:block text-md border rounded-full border-emerald-500 px-4 py-1'>Sign In</span>              
            </button>
          </Link>
        }

      </nav>

      {/* Mobile Menu NAV + USER */}
      {menu && user && <div className='flex sm:hidden  justify-center items-center gap-2 py-5 text-lg'>
        
        <Link href={'/create'}>
          <div className='cursor-pointer flex gap-1'><RiImageAddFill className='text-2xl' /> Create</div>
        </Link>
          
        /
        <Link href={'/user/' + user.displayName}>
          <div className='cursor-pointer flex gap-1'><IoPersonCircleOutline className='text-2xl' /> Profile</div>
        </Link>
        /
        <button className='flex gap-1' onClick={logOut}><IoMdLogOut className='text-2xl' /> Logout</button>
        
      </div>}

      

    </div>
  )
}

export default Navbar