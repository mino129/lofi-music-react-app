import React, { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft,faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";


const Player = ({currentSong, setisPlaying, isPlaying, audioRef, setSongInfo, songInfo, songs, setcurrentSong, setSongs, currentVolume, setcurrentVolume}) => {

    const volumeRef = useRef(null);

    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) =>{
            if(song.id === nextPrev.id){
                return{
                    ...song,
                    active: true,
                }
            }else{
                return{
                    ...song,
                    active: false,
                }
            }
        })
        setSongs(newSongs)
    }

    //handlers
    const dragHandler = (e) => {
        setSongInfo({...songInfo, currentTime:e.target.value});
        audioRef.current.currentTime = e.target.value;
    }

    const volumeChangeHandler = (e) =>{
        setcurrentVolume(e.target.value);
        audioRef.current.volume = (currentVolume / 100);
    }

    const skipTrackHandler = async (direction) =>{
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === "skip-forward"){
            if(!((songs.length - 1) === currentIndex)){
                await setcurrentSong(songs[currentIndex + 1]);
                activeLibraryHandler(songs[currentIndex + 1]);
            }else{
                await setcurrentSong(songs[0]);
                activeLibraryHandler(songs[0]);
            }
        }else{
            if(currentIndex != 0){
                await setcurrentSong(songs[currentIndex - 1]);
                activeLibraryHandler(songs[currentIndex - 1]);
            }else{
                await setcurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
            }
        }
        if(isPlaying) audioRef.current.play();
    }

    const playSongHandler = () =>{
        if(isPlaying == false){
            audioRef.current.play();
            setisPlaying(!isPlaying);
        }else{
            audioRef.current.pause();
            setisPlaying(!isPlaying);
        }
    }
    const getTime = (time) => {
        return(
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        )
    }
    //add the styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }
    return(
        <div className="Player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})` }} className="track">
                    <input type="range" onChange={dragHandler} min={0} max={songInfo.duration || 0} value={songInfo.currentTime} name="" id=""/>
                    <div className="animate-track" style={trackAnim}>

                    </div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : '0:00'}</p>
            </div>
            <div className="player-control">
                <FontAwesomeIcon onClick={() => skipTrackHandler("skip-back")} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSongHandler} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={() => skipTrackHandler("skip-forward")} className="skip-foward" size="2x" icon={faAngleRight} />
                <input ref={volumeRef} type="range" min={0} max={100} onChange={volumeChangeHandler} />
            </div>
        </div>
    )
}

export default Player;