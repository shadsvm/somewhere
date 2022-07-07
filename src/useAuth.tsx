import { auth } from './firebase'
import { createContext, useContext, useState, useEffect } from "react"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
// import { Auth } from './types'

const AuthContext = createContext<any>({})

export const AuthProvider = ({children}:any) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  const signIn = async (email:string, password:string) => {
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (name:string, email:string, password:string) => {
    const response = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(response.user, {displayName: name})
  }

  const signOut = () => auth.signOut()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( (user:any) => {
      setUser(user)
      setLoading(false)
    })
    return unsubscribe

  }, [])
  

  const value = {
    user, signUp, signOut, signIn
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>)
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) throw Error('Context must be used within Provider')
  return context
}