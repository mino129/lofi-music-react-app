import React, {useState, useRef} from "react";
import "./styles/app.css";
//adding components
import Player from "./components/Player";
import Song from "./components/song";
import Library from "./components/Library";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Nav from "./components/Nav";
//import utildata
import data from "./data";
import { library } from "@fortawesome/fontawesome-svg-core";

function App() {
  const timeUpdateHandler = (e) =>{
    const current = e.target.currentTime;
    const duration = e.target.duration;
    //calculate percentage

    const roundedCurrent = Math.round(current);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100)

    setSongInfo({...songInfo, currentTime: current, duration, animationPercentage : animation});
  };
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    console.log(currentIndex);
    console.log(songs.length);
    console.log(currentIndex === songs.length);
    if(currentIndex === (songs.length - 1)){
      await setcurrentSong(songs[0]);
    }else{
      await setcurrentSong(songs[currentIndex + 1]);
    }
    if(isPlaying) audioRef.current.play();
  }
  //State

  const [songs, setSongs] = useState(data());
  const [currentSong, setcurrentSong] = useState(songs[0]);
  const [isPlaying, setisPlaying] = useState(false);
  const [libraryStatus, setlibraryStatus] = useState(false);
  const [currentVolume, setcurrentVolume] = useState(0);

  const [songInfo, setSongInfo] = useState({
      currentTime: 0,
      duration: 0,
      animationPercentage: 0,
  });

  //ref
  const audioRef = useRef(null);

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setlibraryStatus={setlibraryStatus}/>
      <Song currentSong={currentSong}/>
      <Player currentVolume={currentVolume} setcurrentVolume={setcurrentVolume} setSongs={setSongs} setcurrentSong={setcurrentSong} songs={songs} setSongInfo={setSongInfo} songInfo={songInfo} audioRef={audioRef} currentSong={currentSong} isPlaying={isPlaying} setisPlaying={setisPlaying} />
      <Library libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setcurrentSong={setcurrentSong} />
      <audio 
        onLoadedMetadata={timeUpdateHandler} 
        onTimeUpdate={timeUpdateHandler} 
        ref={audioRef} 
        src={currentSong.audio}
        onEnded={songEndHandler}
      >
      </audio>
    </div>
  );
}


export default App;
