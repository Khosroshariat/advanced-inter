"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { openLoginModal } from "../../redux/modalSlice";
import LoginModal from "components/modals/LoginModal";

export default function SelectedBook() {

  const [loading, setloading] = useState(false);

  const user = useSelector(state => state.user.email)
  const dispatch = useDispatch()
  const [bookData, setBookData] = useState([
    {
      author: "",
      title: "",
      imageLink: "",
      subTitle: "",
      id: "",
    },
  ]);

  useEffect(() => {
    async function getData() {
      setloading(true)
      const url =
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected";
      const response = await fetch(url);
      const data = await response.json();
      setBookData(data);
      setTimeout(() => {
        setloading(false);
      }, 2000);
    }
    getData();
  }, []);

  return (
    <>
    <LoginModal/>
      <div className="mx-auto mb-10 ml-0 md:max-w-[1100px] md:w-[calc(100vw-400px)] w-[calc(100vw-100px)]">
        <div className=" mb-[50px] xl:w-[700px]">
          <h1 className="font-bold text-xl mb-2 mt-2">Selected just for you</h1>
          {loading ? (
            <div className="w-[550px] h-[400px] sm:h-[200px] bg-[#959c9f]" />
          ) : (
            <div>
            {bookData.map((book, index) => (
              <div
                className="flex bg-slate-200 w-[100%] flex-col lg:flex-row p-5"
                key={index}
              >
                <div className="text-sm text-black mb-2  w-[40%] lg:border lg:border-r-gray-300">
                  {book.subTitle}
                </div>
                <Link href={"/book/" + book.id}>
                  <div className="mb-2 w-[172px] h-[172px] px-5">
                    <img src={book.imageLink} alt="bookImg" />
                  </div>
                </Link>
                <div>
                  <div className="text-base font-bold text-black mb-2 ">
                    {book.title}
                  </div>
                  <div className="text-sm text-gray-400 font-light mb-2  ">
                    {book.author}
                  </div>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1 text-sm font-light ">
                        {user? (
  
                  <Link href={`/player/${book.id}`}>
                        <AiFillPlayCircle size={50} className="text-black" />
                  </Link>
                        ) : (
                          <div onClick={() => dispatch(openLoginModal())}>
                            <AiFillPlayCircle size={50} className="text-black cursor-pointer" />
                          </div>
                        )}
                        <div>3 mins 23 seconds</div>
                      </div>
                    </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
