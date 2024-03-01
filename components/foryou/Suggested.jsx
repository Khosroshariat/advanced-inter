"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BsClock } from "react-icons/bs";

export default function Suggested() {

  const [durations, setDurations] = useState({});
  const durationsRef = useRef({});
  const [bookData, setBookData] = useState([]);
  const [loading, setloading] = useState(false);

  async function getBookData() {
    setloading(true)
    const url =
      "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested";
    const response = await fetch(url);
    const data = await response.json();
    setBookData(data);
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }

  useEffect(() => {
    getBookData();
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
      <div className="mx-auto mb-10 ml-0 md:max-w-[1100px] md:w-[calc(100vw-400px)] w-[calc(100vw-100px)]">
        <h1 className="font-bold text-xl mb-2 mt-2">Suggested for you</h1>
        <h3 className="text-l  mt-2 mb-2"> We'll think you'll like these</h3>
        {loading? (
          <div className="overflow-x-scroll flex max-w-[1200px] w-[100%]" >
          {new Array(7).fill("").map((book, index) => (
          <div className="relative pt-7 mx-3 min-w-[200px] pb-10 " key={index}>
            <div className="w-[150px] h-[200px] bg-[#959c9f]" />
            <div className="my-2 w-[130px] h-[20px] bg-[#959c9f]" />
            <div className="my-2 w-[110px] h-[20px] bg-[#959c9f]" />
            <div className="my-2 w-[120px] h-[20px] bg-[#959c9f]" />
            <div className="flex items-center gap-1">
              <BsClock />
              <div className="my-2 w-[40px] h-[20px] bg-[#959c9f]" />
              <AiOutlineStar />
              <div className="my-2 w-[40px] h-[20px] bg-[#959c9f]" />
            </div>
          </div>
          ))}
            </div>
          
        ) : (

        <div className="overflow-x-scroll flex max-w-[1200px] w-[100%]">
          {bookData.map((book, index) => (
            <Link
              className="w-[230px] mx-4       
               hover:bg-gray-100
                transition duration-300 ease-in-out"
              href={"/book/" + book.id}
              key={index}
            >
              <audio
                src={book?.audioLink}
                ref={(audioRef) => (durationsRef.current[book.id] = audioRef)}
                onLoadedData={() => onLoadedData(book.id)}
              />
              <div className="relative pt-7 mx-3 min-w-[200px] pb-10">
                <img src={book.imageLink} className="w-[200px]" alt="" />
                <h1 className="text-[16px] font-bold mb-[8px]">{book.title}</h1>
                <h2 className="text-[14px] font-semibold mb-[8px] text-[#6b757b]">
                  {book.author}
                </h2>
                <h2 className="text-[14px] text-[#394547] mb-[8px]">
                  {book.subTitle}
                </h2>

                <div className="flex items-center gap-1">
                  <BsClock />
                  {formatTime(durations[book.id]) || "0:00"}
                  <AiOutlineStar />
                  {book.averageRating}
                </div>

                {book.subscriptionRequired && (
                  <div className="absolute right-4 top-[0px] text-[12px] text-white bg-red-500 px-2 py-[1px] rounded-md">
                    Premium
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
        )}
      </div>
    </>
  );
}
