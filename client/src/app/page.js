'use client'
import { useSelector } from "react-redux"

import { useEffect } from "react"
import { useRouter } from "next/navigation"


const Main = () => {
  const {userDetails} = useSelector(state=>state.user)
  console.log("userdetails", userDetails);
  
  const router = useRouter()
  useEffect(()=>{
    if(userDetails?.isLoggedIn) {
      router.push('/home')
    }else{
      router.push('/login')
    }
  },[userDetails?.isLoggedIn])
  
  return  null
}

export default Main