
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
import { useDebounce } from "@uidotdev/usehooks";
import SignupModal from "../../components/modals/SignupModal";

export default function SearchBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.user.email);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 100);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setloading(true);
        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${debouncedSearchTerm}`
        );
        const data = await response.json();
        setSearchResults(data);
        setTimeout(() => {
          setloading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (debouncedSearchTerm.trim() !== "") {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const removeInput = () => {
    setSearchTerm("");
  };

  async function handleSignOut() {
    await signOut(auth);
    dispatch(signOutUser());
  }

  return (
    <>
      <div>
        <SignupModal/>
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

                {searchTerm ? (
                  <div className="absolute right-0 border-l-[2px] border-[#e1e7ea] p-[10px] cursor-pointer">
                    <RxCross1 className="w-[40px] " onClick={removeInput} />
                  </div>
                ) : (
                  <div className="absolute right-0 border-l-[2px] border-[#e1e7ea] p-[10px] cursor-pointer">
                    <AiOutlineSearch className="w-[40px] " />
                  </div>
                )}

                {searchTerm ? (
                  <div>
                    {searchResults.length > 0 ? (
                      <div>
                        {loading ? (
                          <div className="absolute w-full max-h-[360px] overflow-y-scroll right-0 top-16 rounded-sm border-[2px] border-[#afb2b4] p-[10px] bg-gray-100">
                            {new Array(3).fill("").map((book, index) => (
                          <div className="relative pb-10 flex items-center " key={index}>
                            <div className="w-[100px] h-[140px] bg-[#959c9f]" />
                            <div className="ml-7">
                              <div className="my-2 w-[130px] h-[20px] bg-[#959c9f]" />
                              <div className="my-2 w-[110px] h-[20px] bg-[#959c9f]" />
                            </div>
                          </div>
                            ))}
                          </div>
                        ) : (
                          <div className="absolute w-full max-h-[360px] overflow-y-scroll right-0 top-16 rounded-sm border-[2px] border-[#afb2b4] p-[10px] bg-gray-100">
                            {searchResults.map((results, index) => (
                              <Link href={"/book/" + results.id} key={index}>
                                <div className="flex items-center w-full">
                                  <div className="mb-4 w-[100px]">
                                    <img
                                      src={results.imageLink}
                                      alt="bookImg"
                                    />
                                  </div>
                                  <div className="ml-6">
                                    <h5 className="text-xs font-bold text-black mb-2">
                                      Type: {results.type}
                                    </h5>
                                    <p className="text-sm text-gray-400 font-light mb-2">
                                      {results.author}
                                    </p>
                                  </div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="absolute w-full right-0 top-16 rounded-sm border-[2px] border-[#afb2b4] p-[10px] bg-gray-100">
                        No books found!
                      </div>
                    )}
                  </div>
                ) : null}
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
