import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { Credentials } from "../src/types"
import { CgSpinner } from 'react-icons/cg'
import { useAuth } from "../src/useAuth"
import styles from '../styles/auth.module.css'

const Login = () => {

  const router = useRouter()
  const {user, signIn} = useAuth()
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState<Credentials>({
    email: '',
    password: ''
  })

  useEffect(() => {
    if (user) router.push('/')
  }, [user])


  const handleInput = (event:any) => setCredentials({...credentials, [event.target.name]: event.target.value})
  const submit = async (event:any) => {
    event.preventDefault()
    
    try {
      setLoading(true)
      await signIn(credentials.email, credentials.password)
    } 
    catch (error:any) { alert(error.message) }
    finally { setLoading(false) }

  }



  return !user && (
    <div className={`${styles.pattern} h-full flex justify-center items-center`}>

      <form onSubmit={submit} className="w-8/12 sm:w-6/12 md:w-4/12 flex flex-col gap-5">
        <div className="text-center text-5xl font-bold pb-5">Hello</div>
        <input type="email"    disabled={loading}  placeholder="E-mail"   required className="px-3 py-2 bg-gray-100 text-black rounded" name="email" value={credentials.email} onChange={handleInput} />
        <input type="password" disabled={loading}  placeholder="Password" required className="px-3 py-2 bg-gray-100 text-black rounded" name="password" value={credentials.password} onChange={handleInput} />
        <button type="submit"  disabled={loading} className="flex justify-center items-center px-4 py-2 bg-emerald-500 rounded text-white ">
          {loading ? <CgSpinner className="animate-spin text-2xl" /> : 'Sign In'}
        </button>
        <Link href={'/register'}><div className="text-center text-neutral-400 cursor-pointer">Don't have an account?</div></Link>
      </form>

    </div>
  )
}

export default Login