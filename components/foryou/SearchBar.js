// "use client";

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  AiFillCiCircle,
  AiFillHighlight,
  AiFillHome,
  AiOutlineSearch,
  AiOutlineUser,
} from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../redux/userSlice";
import { openLoginModal } from "../../redux/modalSlice";


export default function SearchBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const user = useSelector((state) => state.user.email);
  const [results, setresults] = ([]);
  
  const [searchTerm, setSearchTerm] = useState("")
  const dispatch = useDispatch();
  
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

 
    
  async function searchBook () {

    try {
      const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${searchTerm}`)
      const data = await response.json();
      console.log(data)
      setresults(data)
    } catch (error) {
      // console.error("Error fetching data");
      
    }
    
  }
  
      async function handleSignOut() {
      await signOut(auth);
    dispatch(signOutUser());
  }

  

  return (
    <>
      <div>
        <div className="bg-[#fff] border-b border-[#e1e7ea] h-[80px] z-1">
          <div className="flex items-center justify-between px-[32px] max-w-[1070px] mx-auto h-[100%]">
            <figure></figure>
            <div className="relative flex gap-[24px] max-w-[350px] w-[100%] mr-[10px]">
              <div className="flex items-center w-[100%] ">
                <input
                  className="items-center w-[600px] h-[40px] px-[16px] bg-[#f1f6f4] color-[#042330] rounded-[8px] border-[#e1e7ea] "
                  type="text"
                  placeholder="Search for books"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                <div
                 className="absolute right-0 border-l-[2px] border-[#e1e7ea] p-[10px] cursor-pointer">
                  <AiOutlineSearch className="w-[40px] "
                  onClick={searchBook} />
                </div>

                {/* {results.map((result, index) => (
                  
                ))} */}
                <div className="absolute w-full flex right-0 top-16 rounded-sm border-[2px] border-[#afb2b4] p-[10px] bg-gray-100">
                <div className="mb-2 w-[150px] px-5">
                  <img 
                  src="https://firebasestorage.googleapis.com/v0/b/summaristt.appspot.com/o/books%2Fimages%2Fthe-lean-startup.png?alt=media&token=087bb342-71d9-4c07-8b0d-4dd1f06a5aa2" 
                  alt="bookImg" />
                </div>
                <div>
                <div className="text-base font-bold text-black mb-2 ">
                  Title
                </div>
                <div className="text-sm text-gray-400 font-light mb-2  ">
                  Author
                </div>
                </div>
                </div>
         
             

              </div>
            </div>
            <div className="md:hidden">
              <button id="menu-toggle" className="block text-gray-500">
                <GiHamburgerMenu
                  size={28}
                  onClick={() => {
                    setMenuOpen(true);
                  }}
                />
              </button>
              {menuOpen && (
                <div
                  id="menu"
                  className=" bg-white fixed top-0 left-0 w-64 h-full shadow-lg z-20"
                >
                  <nav>
                    <div className="space-y-[20px]">
                      <div className="flex justify-start py-3 px-3 mb-5 ">
                        <img
                          src="/assets/logo.png"
                          width={200}
                          height={34}
                          alt=""
                        />
                      </div>
                      <button
                        className="flex items-center w-full space-x-2 px-3 py-4 bg-slate-300 hover:bg-slate-500
                      border-b-black"
                        onClick={() => setMenuOpen(false)}
                      >
                        <RxCross1 />
                        <h4>Close Menu</h4>
                      </button>
                      <Link href="/foryou">
                        <SidebarLinkActive Icon={AiFillHome} text={"For You"} />
                      </Link>

                      <SidebarLink Icon={AiFillHighlight} text={"Highlights"} />
                      <SidebarLink Icon={AiOutlineSearch} text={"Search"} />
                    </div>
                    <div className="space-y-[20px]">
                      <Link href="/setting">
                        <SidebarLinkActive
                          Icon={IoIosSettings}
                          text={"Settings"}
                        />
                      </Link>
                      <SidebarLink
                        Icon={AiOutlineUser}
                        text={"Help & Support"}
                      />

                      {user ? (
                        <div onClick={handleSignOut}>
                          <SidebarLinkActive Icon={BiLogOut} text={"Logout"} />
                        </div>
                      ) : (
                        <div onClick={() => dispatch(openLoginModal())}>
                          <SidebarLinkActive
                            Icon={AiFillCiCircle}
                            text={"Login"}
                          />
                        </div>
                      )}
                    </div>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SidebarLink({ text, Icon }) {
  return (
    <li
      className="hoverAnimation cursor-not-allowed flex ml-3 mb-3 items-center text-xl space-x-3 text-left hover:bg-gray-100
      transition duration-300 ease-in-out py-3"
    >
      <Icon className="h-7" />
      <span>{text}</span>
    </li>
  );
}

function SidebarLinkActive({ text, Icon }) {
  return (
    <li
      className="hoverAnimation cursor-pointer flex ml-3 mb-3 items-center text-xl space-x-3 text-left hover:bg-gray-100
      transition duration-300 ease-in-out py-3"
    >
      <Icon className="h-7" />
      <span>{text}</span>
    </li>
  );
}
