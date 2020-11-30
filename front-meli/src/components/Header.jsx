import React, { useState } from 'react';
import axios from 'axios';
import '../css/header.css';
import SearchResult from '../components/SearchResult';
import {
    Link
  } from "react-router-dom";

const Header = () => {
    
    const imgTag = process.env.PUBLIC_URL;

    //save search results
    const [resultado, setResultado] = useState([]);

    //Send request to enpoint
    const getResults = async (input) => {
        try {
            const searchData = await axios.get(`http://localhost:9000/api/items?q=${input}`)
            searchData ? setResultado(searchData.data) : setResultado(null);                 
        } catch (err) {
            console.error(err)
        } 
    }


    //get data from input for search
    const getQueryFromInput = (event) => {
        const input = event[0].value;
        getResults(input);
    }
//SOLUCIONAR ENVIO DE PROPS A VISTA SEARCH RESULT, LO INTENTE PERO NO LLEGA LA DATA, VER A FONDO
    // console.log(resultado);

    return (
        <div className="header">

            <Link to="/">
                <img className="meli-logo" src={imgTag + "/img/Logo_ML.png"} alt="meli-logo"/>        
            </Link>

            <form onSubmit={(ev) => { 
                getQueryFromInput(document.getElementsByClassName('search'));
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