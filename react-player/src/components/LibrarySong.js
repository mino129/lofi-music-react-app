import React from "react";

const LibrarySong = ({song, setcurrentSong, songs, id, audioRef, isPlaying, setSongs}) => {

    const songSelectHandler = async () => {
        
        await setcurrentSong(song);
        
        //add active state
        const newSongs = songs.map((song) =>{
            if(song.id === id){
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
        });
        setSongs(newSongs);
        if(isPlaying) audioRef.current.play();
    }

    return(
        <div onClick={songSelectHandler} className={`library-song ${song.active ? 'selected' : ''}`}>
            <img src={song.cover} alt={song.name} />
            <div className="song-descriptions">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;