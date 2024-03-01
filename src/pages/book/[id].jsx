"use client";

import SearchBar from "../../../components/foryou/SearchBar";
import Sidebar from "../../../components/foryou/Sidebar";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import {
  AiOutlineBook,
  AiOutlineBulb,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { BiBookmark, BiStar } from "react-icons/bi";
import { BsMic } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "../../../redux/modalSlice";
import LoginModal from "components/modals/LoginModal";

export async function getServerSideProps(context) {
  const id = context.query.id;
  return {
    props: {
      id: id,
    },
  };
}

export default function Book({ id }) {
  const user = useSelector((state) => state.user.email);
  const dispatch = useDispatch();
  const [loading, setloading] = useState(false);
  const [durations, setDurations] = useState({});
  const durationsRef = useRef({});

  const [bookData, setBooks] = useState({
    author: "",
    title: "",
    imageLink: "",
    subTitle: "",
    totalRating: "",
    averageRating: "",
    type: "",
    keyIdeas: "",
    bookDescription: "",
    authorDescription: "",
    tags: [],
  });

  useEffect(() => {
    async function getData() {
      setloading(true)
      const url = `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`;
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data);
      setTimeout(() => {
        setloading(false);
      }, 2000);
    }
    getData();
  }, []);

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  const onLoadedData = (id) => {
    const time = durationsRef.current[id]?.duration || 0;
    setDurations((prev) => ({ ...prev, [id]: time }));
  };

  return (
    <>
      <SearchBar />
      <Sidebar />
      <LoginModal />
      <audio
        src={bookData?.audioLink}
        ref={(audioRef) => (durationsRef.current[bookData.id] = audioRef)}
        onLoadedData={() => onLoadedData(bookData.id)}
      />

      <div className="flex flex-col width-full md:ml-[260px] mx-8">
        <div className=" max-w-[1070px] w-full mx-auto p-2 mt-10">
          <div className=" w-full">

           {loading ? (

            <div className="flex flex-col lg:flex-row-reverse gap-[16px]">
              <div className="mr-16 w-[250px] h-[300px] bg-[#959c9f]" />

              <div className="flex flex-col w-[100%] max-w-[700px]">
                <div className="my-2 w-[180px] h-[40px] bg-[#959c9f]" />
                <div className="my-2 w-[160px] h-[20px] bg-[#959c9f]" />
                <div className="my-2 w-[130px] h-[20px] bg-[#959c9f]" />
                <div className="border-t border-b border-gray-300 p-4 my-6">
                  <div className="flex flex-wrap max-w-[420px] ">
                    <div className="flex items-center w-1/2 text-[#032b41] font-bold text-[14px]">
                      <div className="flex h-[24px] mr-[4px] items-center">
                        <BiStar className="w-[100%]" />
                      </div>
                      <div className="my-2 w-[40px] h-[20px] bg-[#959c9f]" />
                    </div>
                    <div className="flex items-center w-1/2 text-[#032b41] font-bold text-[14px]">
                      <div className="flex h-[24px] mr-[4px] items-center">
                        <AiOutlineClockCircle className="w-[100%]" />
                      </div>
                      <div className="my-2 w-[40px] h-[20px] bg-[#959c9f]" />
                    </div>
                    <div className="flex items-center w-[50%] text-[#032b41] font-bold text-[14px]">
                      <div className="flex h-[24px] mr-[4px] items-center">
                        <BsMic className="w-[100%]" />
                      </div>
                      <div className="my-2 w-[40px] h-[20px] bg-[#959c9f]" />
                    </div>
                    <div className="flex items-center w-[50%] text-[#032b41] font-bold text-[14px]">
                      <div className="flex h-[24px] mr-[4px] items-center">
                        <AiOutlineBulb className="w-[100%]" />
                      </div>
                      <div className="my-2 w-[40px] h-[20px] bg-[#959c9f]" />
                    </div>
                  </div>
                </div>
                {/* //buttons */}
                <div className="flex gap-[16px] mb-[24px] ">
                  <div className="my-2 w-[144px] h-[48px] bg-[#959c9f] rounded-[4px]" />
                  <div className="my-2 w-[144px] h-[48px] bg-[#959c9f] rounded-[4px]" />
                </div>
              </div>
            </div>
           ) : (

            <div className="flex flex-col lg:flex-row-reverse gap-[16px]">
              <div className="flex max-w-[300px] min-w-[300px] max-h-[300px] justify-center">
                <img src={bookData?.imageLink} />
              </div>

              <div className="flex flex-col w-[100%] max-w-[700px]">
                <h1 className="text-4xl">{bookData?.title}</h1>
                <h1 className="text-2xl">{bookData?.author}</h1>
                <h3 className="text-xl font-thin">{bookData?.subTitle}</h3>
                <div className="border-t border-b border-gray-300 p-4 my-6">
                  <div className="flex flex-wrap max-w-[420px] ">
                    <div className="flex items-center w-1/2 text-[#032b41] font-bold text-[14px]">
                      <div className="flex h-[24px] mr-[4px] items-center">
                        <BiStar className="w-[100%]" />
                      </div>
                      <p>
                        {bookData?.averageRating}
                        &nbsp;
                      </p>
                      <p>({bookData?.totalRating} ratings)</p>
                    </div>
                    <div className="flex items-center w-1/2 text-[#032b41] font-bold text-[14px]">
                      <div className="flex h-[24px] mr-[4px] items-center">
                        <AiOutlineClockCircle className="w-[100%]" />
                      </div>
                      <p>{formatTime(durations[bookData.id]) || "0:00"}</p>
                    </div>
                    <div className="flex items-center w-[50%] text-[#032b41] font-bold text-[14px]">
                      <div className="flex h-[24px] mr-[4px] items-center">
                        <BsMic className="w-[100%]" />
                      </div>
                      <p>
                        {bookData?.type}
                        &nbsp;
                      </p>
                    </div>
                    <div className="flex items-center w-[50%] text-[#032b41] font-bold text-[14px]">
                      <div className="flex h-[24px] mr-[4px] items-center">
                        <AiOutlineBulb className="w-[100%]" />
                      </div>
                      <p>{bookData?.keyIdeas} Key Ideas</p>
                    </div>
                  </div>
                </div>
                {/* //buttons */}
                <div className="flex gap-[16px] mb-[24px] ">
                  {user ? (
                    <Link href={`/player/${id}`}>
                      <button
                        className="flex items-center justify-center w-[144px] h-[48px] bg-[#032b41] 
                 text-[#fff] text-[16px] rounded-[4px] cursor-pointer gap-[8px] 
                 transition-opacity duration-200 ease-in-out hover:bg-gray-400"
                      >
                        <AiOutlineBook />
                        <div>Read</div>
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => dispatch(openLoginModal())}
                      className="flex items-center justify-center w-[144px] h-[48px] bg-[#032b41] 
                 text-[#fff] text-[16px] rounded-[4px] cursor-pointer gap-[8px] 
                 transition-opacity duration-200 ease-in-out hover:bg-gray-400"
                    >
                      <AiOutlineBook />
                      <div>Read</div>
                    </button>
                  )}

                  {user ? (
                    <Link href={`/player/${id}`}>
                      <button
                        className="flex items-center justify-center w-[144px] h-[48px] bg-[#032b41] 
          text-[#fff] text-[16px] rounded-[4px] cursor-pointer gap-[8px] 
          transition-opacity duration-200 ease-in-out hover:bg-gray-400"
                      >
                        <BsMic />
                        <div>Listen</div>
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => dispatch(openLoginModal())}
                      className="flex items-center justify-center w-[144px] h-[48px] bg-[#032b41] 
          text-[#fff] text-[16px] rounded-[4px] cursor-pointer gap-[8px] 
          transition-opacity duration-200 ease-in-out hover:bg-gray-400"
                    >
                      <BsMic />
                      <div>Listen</div>
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-[8px] text-[#0365f2] font-semibold cursor-pointer mb-[40px] text-[18px] transition-color duration 200 ease-in-out">
                  <BiBookmark className="w-[20px]" />
                  <div>Add title to My Library</div>
                </div>
                <div className="font-extrabold mb-3">What's it about? </div>
                <div className="flex max-w-[420px] gap-3 mb-6">
                  {bookData?.tags.map((tag, index) => (
                    <div
                      className="bg-[#f1f6f4] px-[16px] h-[48px] flex items-center cursor-not-allowed text-[#032b41] rounded-md"
                      key={index}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
                <p className="mb-6">{bookData?.bookDescription}</p>
                <p className="font-bold mb-6">About the author</p>
                <p>{bookData?.authorDescription}</p>
              </div>
            </div>
           )}
          </div>
        </div>
      </div>
    </>
  );
}
