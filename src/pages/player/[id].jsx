'use client'

import SearchBar from "../../../components/foryou/SearchBar"
import Sidebar from "../../../components/foryou/Sidebar"
import AudioPlayer from '../../../components/audioplayer/AudioPlayer'
import { useEffect, useState } from "react";

export function getServerSideProps(context) {
    const id = context.query.id;
  
    return {
      props: {
        id: id
      },
    };
  }

export default function Player ({id}) {

    const [bookData, setBooks] = useState({
        summary: "",
        title: "",
    });
      
    
      useEffect(() => {
        async function getData() {
          const url = `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`;
          const response = await fetch(url);
          const data = await response.json();
          setBooks(data);
        }
        getData();
      }, []);


    return(
        <>
        <SearchBar />
        <Sidebar/>

        <div className="pb-[100px]  md:ml-[255px] mx-10 mb-[100px]">
        <div className="flex flex-col max-w-2xl  mx-auto">
          <h1 className="text-4xl margin-[#e1e7ea] mb-[32px] pb-[16px] border-b-2">
            {bookData?.title}
            
          </h1>
          <p className="whitespace-pre-line mb-28">
            {bookData?.summary}
            </p>
            <AudioPlayer bookData={bookData}  />
        </div>
      </div>


       

        </>
    )
}