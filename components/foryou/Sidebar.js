
'use client'
import Link from "next/link";
import { AiFillCiCircle, AiFillHome } from "react-icons/ai";
import { BiHelpCircle, BiLogOut, BiPencil } from "react-icons/bi";
import { BsBookmark } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";
import { PiMagnifyingGlassLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../redux/userSlice";
import { openLoginModal } from "../../redux/modalSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import LoginModal from "components/modals/LoginModal";

export default function Sidebar() {

  const user = useSelector(state => state.user.email)
  

  const dispatch = useDispatch()

  async function handleSignOut() {
    await signOut(auth)
    dispatch(signOutUser())
  }


  return (
    <>
        <div className="h-screen top-0 left-0 md:flex fixed w-[250px] hidden pt-2 pl-2 pr-2 bg-[#f7faf9] flex-col text-left justify-between">
          <div>
            <div className="flex justify-start py-3 px-3 mb-5">
              <img src="/assets/logo.png" width={200} height={34} alt="" />
            </div>
            <Link href="/foryou">
              <SidebarLinkActive Icon={AiFillHome} text={"For You"}/>
            </Link>
            <SidebarLink Icon={BsBookmark} text={"My Library"} />
            <SidebarLink Icon={BiPencil} text={"Highlights"} />
            <SidebarLink Icon={PiMagnifyingGlassLight} text={"Search"} />
          </div>
          <div className="flex flex-col justify-end">
            <Link href="/setting">
              <SidebarLinkActive Icon={IoIosSettings} text={"Settings"} />
            </Link>
            <SidebarLink Icon={BiHelpCircle} text={"Help & Support"} />

            {/* <Link href="/"> */}

            {user ? (

            <div
            onClick={handleSignOut}
            >

              <SidebarLinkActive Icon={BiLogOut} text={"Logout"}/>
            </div>
            ) : (

              <div onClick={() => dispatch(openLoginModal())}>


            <SidebarLinkActive Icon={AiFillCiCircle} text={"Login"}/>
              </div>
            )}

            {/* </Link> */}
          </div>
        </div>

      <LoginModal/>
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
      <span className="hidden md:inline">{text}</span>
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
      <span className="hidden md:inline">{text}</span>
    </li>
  );
}
