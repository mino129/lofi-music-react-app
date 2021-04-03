import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";

const Nav = ({setlibraryStatus, libraryStatus}) =>{
    return(
        <nav>
            <h1>Poggers</h1>
            <button onClick={() => setlibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faMusic}/>
            </button>
        </nav>
    );
}

export default Nav