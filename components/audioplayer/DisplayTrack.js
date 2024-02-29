import { BsMusicNoteBeamed } from "react-icons/bs";


const DisplayTrack = ({song, audioRef, progressBarRef, setDuration}) => {

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };


    return (
    <>
        <div className="mt-3 sm:my-3">
        <audio
          src={song?.audioLink}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
        />
        <div className="flex items-center my-2">
          <div className="mr-5">
            {song?.imageLink ? (
              <img src={song?.imageLink} className="w-24" alt="audio avatar" />
            ) : (
              <div className="flex items-center justify-center mr-5">
                <span className="bg-[#989898] p-4 rounded-md">
                  <BsMusicNoteBeamed size={30} />
                </span>
              </div>
            )}
          </div>
          <div>
            <p className="text-sm">{song?.title}</p>
            <p className="text-sm text-slate-400">{song?.author}</p>
          </div>
        </div>
      </div>
    </>
    );
  };
  export default DisplayTrack;