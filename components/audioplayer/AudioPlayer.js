
import { useRef, useState } from 'react';

import DisplayTrack from './DisplayTrack'
import Control from './Control'
import ProgressBar from './ProgressBar'


const AudioPlayer = ({bookData}) => {
 
 
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  
  // reference
  const audioRef = useRef();
  // console.log(audioRef)

  const progressBarRef = useRef();
  // console.log(progressBarRef)


  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-around fixed bottom-0 mt-auto bg-[#042330] w-[100%] left-0 text-white">
        <DisplayTrack 
        song={bookData}
        audioRef={audioRef}
        progressBarRef={progressBarRef}
        setDuration={setDuration}
         />
         <div className='md:flex-col sm:flex'>
        <Control
        audioRef={audioRef}
        progressBarRef={progressBarRef}
        duration={duration}
        setTimeProgress={setTimeProgress}
         />
        <ProgressBar
        progressBarRef={progressBarRef}
        audioRef={audioRef}
        timeProgress={timeProgress}
        duration={duration}
         />
         </div>
      </div>
    </div>
  );
};
export default AudioPlayer;
