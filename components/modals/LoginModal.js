'use client'

// import { Modal } from "@mui/base";
import { auth } from "../../firebase";
import { closeLoginModal, openSignupModal } from "../../redux/modalSlice";
import { Modal } from "@mui/material";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/userSlice";

function LoginModal() {

  const isOpen = useSelector(state => state.modals.loginModalOpen )

  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null);
  const router = useRouter()

  function toggleToSignUpModal() {
    dispatch(closeLoginModal());
    dispatch(openSignupModal());
  }

  async function handleLogin() {
    try {
      
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/foryou")
      setEmail("")
      setPassword("")
      dispatch(closeLoginModal())
    } catch (e) {
      setError("Invalid Email or Password!")
      setEmail("")
      setPassword("")
      setTimeout(() => {
        setError(null)
      }, 1500)
    }
  }

  async function handleGuestLogin(email, password) {
    await signInWithEmailAndPassword(auth, "guest000111222333@email.com", "123456")
    router.push("/foryou")
    dispatch(closeLoginModal())
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
        onClose={() => dispatch(closeLoginModal())}
        className="flex justify-center items-center"
      >
        <div
          className="w-[60%]
        bg-white text-black md:w-[400px] h-fit
         border border-gray-700 rounded-lg flex flex-col text-center justify-center
         "
        >
          <div className="p-[24px] flex flex-col space-y-5 ">
            <h2 className="text-lg font-bold text-[#032b41] mb-[24px] mt-6">
              Log in to Summarist
            </h2>
            {(error && !email && !password) && (
                <p className="text-red-600 p-0 m-0 bg-red-200 rounded-md">{error}</p>
              )}
            
            <div className="bg-[#3a579d] flex items-center cursor-pointer p-1 rounded-md hover:bg-gray-500 transition duration-300 ease-in-out ">
              {" "}
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 p-1 rounded-md h-10 text-white"
              >
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
              </svg>
              {/* <Link href={"/foryou"}> */}
              <h3
                className="ml-20 text-white "
                onClick={handleGuestLogin}
                >
                Login as Guest
                
              </h3>
                {/* </Link> */}
            </div>
            <h3>or</h3>
            <div className=" bg-[#4285f4] flex items-center cursor-pointer p-1 rounded-md hover:bg-gray-500 transition duration-300 ease-in-out">
              <img
                src="/assets/google.png"
                className="w-9 bg-white p-1 rounded-md"
              />
              <h3
                className="ml-20 text-white rounded-md"
                // onClick={handleGoogleSignIn}
              >
                Login with Google
              </h3>
            </div>
            <h2>
            {/* {(error && !email && !password) && (
                <p className="text-red-600 p-0 m-0 bg-red-200 rounded-md">{error}</p>
              )} */}
            </h2>
            <input
              className="w-[100%] h-[36px] border-2 border-solid boder-gray-300 rounded-md p-3"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              type={"email"}
              value={email}
            />
            
            <input
              className="w-[100%] h-[36px] border-2 border-solid boder-gray-300 rounded-md p-3"
              placeholder="Password"
              type={"password"}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
           
            <button
              className="w-[100%] bg-[#2bd97c] h-[40px] rounded-md hover:bg-gray-300 transition duration-300 ease-in-out"
              onClick={handleLogin}
              >
              Login
              
            </button>
            
            <button className="w-[100%]">Forgot your password</button>
            <button
              className="w-[100%]"
              onClick={toggleToSignUpModal}
            >
              Don't have an account{" "}
            </button>
          </div>
        </div>
      </Modal>

    </>
  );
}

export default LoginModal;
