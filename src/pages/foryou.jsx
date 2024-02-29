'use client'

import SearchBar from "../../components/foryou/SearchBar";
import Recommended from "../../components/foryou/Recommended";
import Sidebar from "../../components/foryou/Sidebar";
import SelectedBook from "../../components/foryou/SelectedBook";
import Suggested from "../../components/foryou/Suggested";

// import Sidebar from "components/foryou/Sidebar";



export default function Foryou() {



   
    return (
        <>
      <SearchBar />
      <Sidebar />
        <div className="flex flex-col width-[100%] md:ml-[150px]">


      <div className=" md:ml-[150px] ml-10">
        <div className="flex flex-col width-[100%] max-w-[1200px]  mx-auto min-w-[400px]">
          <SelectedBook />
          <Recommended />
          <Suggested />
        </div>
      </div>

      {/* ) : (
        <div className="flex flex-col items-center justify-center space-y-2">
                 
                    <img
                      src="/assets/login.png"
                      alt=""
                      className="w-96 m-5"
                    />
               
                  <div className="text-center font-bold">
                    Log in to your account to see your details.
                  </div>
                  <button
                    onClick={() => dispatch(openLoginModal())}
                    className="w-[60%] h-[40px] bg-green-400 text-center m-5"
                  >
                    Login
                  </button>
                </div>
      )} */}

    </div>
        </>
    )
}