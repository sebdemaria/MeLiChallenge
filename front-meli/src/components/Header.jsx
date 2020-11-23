import React from 'react'
import '../css/header.css'

const imgTag = process.env.PUBLIC_URL;

export const Header = () => {
    return (
        <div class="header">
            <img class="meli-logo" src={imgTag + "/img/Logo_ML.png"} alt="meli-logo" />
            <input class="search" type="text" placeholder="Nunca dejes de buscar"/>
            <button type="submit" class="find" onClick>
                <img src={imgTag + "/img/ic_Search.png"} alt=""/>
            </button>
        </div>
    )
}

export default Header;