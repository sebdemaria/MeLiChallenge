import React from 'react';
import '../css/header.css';
import { useHistory } from "react-router";
import {
    Link
  } from "react-router-dom";
  

export const Header = () => {

    //function to send prop with input value for product listing
    const history = useHistory();
    const valueSend = (data) => {
        history.push({
            pathname:  "/items",
            search: 'q=' + data
        })
    }
    
    const imgTag = process.env.PUBLIC_URL;

    const getInputDataForSearch = (event) =>{
        const inputValue = event[0].value;
        valueSend(inputValue);
    }

    return (
        <div className="header">

            <Link to="/">
                <img className="meli-logo" src={imgTag + "/img/Logo_ML.png"} alt="meli-logo"/>        
            </Link>

            <form onSubmit={(ev) => { 
                getInputDataForSearch(document.getElementsByClassName('search'));
                ev.preventDefault();
                }
            }>
                <input className="search" type="text" placeholder="Nunca dejes de buscar"/>

                <button type="submit" className="find">
                    <img src={imgTag + "/img/ic_Search.png"} alt=""/>
                </button>
            </form>            
        </div>
    )
}

export default Header;
