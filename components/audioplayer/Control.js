'use client'

import { useState, useEffect, useRef, useCallback } from 'react';

// icons
import {
  IoPlayBackCircle,
  IoPlayForwardCircleSharp,
} from 'react-icons/io5';
import { BiPause, BiPlayCircle } from 'react-icons/bi';
import { IoMdVolumeHigh, IoMdVolumeLow, IoMdVolumeOff } from 'react-icons/io';

const Control = ({audioRef, progressBarRef, duration, setTimeProgress }) => {

  const playAnimationRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const [muteVolume, setMuteVolume] = useState(false);

  function togglePlayPause() {
    setIsPlaying(!isPlaying)
  }

  const repeat = useCallback(() => {
    const currentTime = audioRef.current?.currentTime;
    setTimeProgress(currentTime);
    let progressTime = progressBarRef.current?.value;
    progressTime = currentTime;
    progressBarRef.current?.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat)
  }, [isPlaying, audioRef, repeat]);

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  function skipBackward() {
    audioRef.current.currentTime += 15;
  }

  function skipForward() {
    audioRef.current.currentTime -= 15;
  }


  return (
    <>
    <div className="flex-row sm:flex items-center justify-between my-5">
      <div className="flex items-center justify-center gap-5 m-5">
        <button 
        onClick={skipForward}
        >
          <IoPlayBackCircle size={28} />
        </button>
        <button  onClick={togglePlayPause} >
          {isPlaying ? (<BiPause size={45} />) : (<BiPlayCircle size={45} />)}
        </button>
        <button 
        onClick={skipBackward}
        >
          <IoPlayForwardCircleSharp size={28} />
        </button>
      </div>
      <div className="flex items-center justify-center mx-5">
      <button className='mr-2 bg-slate-600 p-[2px] rounded-full flex items-center justify-center'
      onClick={() => setMuteVolume(!muteVolume)}
      >
      {muteVolume || volume <= 0 ? (
    <IoMdVolumeOff size={20} />
  ) : volume < 40 ? (
    <IoMdVolumeLow size={20} />
  ) : (
    <IoMdVolumeHigh size={20} />
  )}
      </button>

      <input type="range" min={0} max={100}
      value={volume}
      onChange={(e) => setVolume(e.target.value)}
       />
    </div>
    </div>
    </>
  )
}

export default Control