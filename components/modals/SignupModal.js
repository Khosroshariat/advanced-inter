'use client'
import { closeSignupModal, openLoginModal } from '../../redux/modalSlice';
import { Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import Link from 'next/link';
import { setUser } from '../../redux/userSlice';
import { useRouter } from 'next/router';

function SignupModal() {

  const isOpen = useSelector(state => state.modals.singupModalOpen )

  const dispatch = useDispatch()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null);

  const router = useRouter()
 

  async function handleSingup() {

    try {
      
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      router.push("/foryou")
      dispatch(closeSignupModal())
    } catch (error) {
      setError("Invalid Email or Short Password!")
      setEmail("")
      setPassword("")

      setTimeout(() => {
        setError(null)
          }, 1500)
      
    }


  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
       if(!currentUser) return
      //  console.log(currentUser)
      dispatch(setUser({
        email: currentUser.email,
        subscription: "Premium"
      }))

    })

    return unsubscribe
  },[])


  return (
    <>
    <Modal
    open={isOpen}
    onClose={() => dispatch(closeSignupModal())}
    className="flex justify-center items-center"
    >
    <div
          className="w-[60%] h-fit relative 
        bg-white text-black md:w-[400px] 
         border border-gray-700 rounded-lg flex flex-col text-center justify-center"
        >
          <button className="absolute top-3 right-5" onClick={() => dispatch(closeSignupModal())}>X</button>
          <div className="p-[24px] flex flex-col space-y-5 ">
            <h2 className="text-lg font-bold text-[#032b41] mb-[24px]">
              Sign Up to Summarist
            </h2>
            {(error && !email && !password) && (
                <p className="text-red-600 p-0 m-0 bg-red-200 rounded-md">{error}</p>
              )}
            
            <input
              className="w-[100%] h-[36px] border-2 border-solid boder-gray-300 rounded-md p-3"
              placeholder="Email Address"
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="w-[100%] h-[36px] border-2 border-solid boder-gray-300 rounded-md p-3"
              placeholder="Password"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
            />
           
            <button
              className="w-[100%] bg-[#2bd97c] h-[40px] rounded-md
              hover:bg-[#24ba6a] transition  duration-300 ease-in-out"
              onClick={handleSingup}
              >Sign Up
            </button>
               
           
            <button
              className="w-[100%] bg-slate-300 hover:bg-slate-400 rounded-md"
              onClick={() => {
                dispatch(closeSignupModal());
                dispatch(openLoginModal());
              }}
            >
              Already have an account <br/>
              or <br/>
              Login as Guest
            </button>
          </div>
        </div>
    </Modal>
    </>
  )
}

export default SignupModal