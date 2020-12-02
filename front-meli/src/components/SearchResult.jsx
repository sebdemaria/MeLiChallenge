import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../sass/searchResult.scss';
import { Link } from 'react-router-dom';

const SearchResult = (props) => {

    const imgTag = process.env.PUBLIC_URL;

    //save search results
    const [resultado, setResultado] = useState();

    //Send request to enpoint
    const getResults = async (search) => {
        try {
            const searchData = await axios.get(`http://localhost:9000/api/items${search}`)
            setResultado(searchData.data);                 
        } catch (err) {
            console.error(err)
        } 
    }

    //send request when component is rendered
    useEffect(() => {
    getResults(props.location.search);
    }, [props.location.search])
    
    //loader
    if(resultado === undefined){
        return ( 
            <div className="loadContainer">
                <img className="loading" src={imgTag + "/img/loading-Gif.gif"} alt="loading..." />
            </div>     
        )
    //listing
    }else{
        return (
            <section className="container">

                <div className="row col-12">
                    <p className="breadcrumb">
                        { resultado.categories[0] ? resultado.categories[0] + "  >  " + resultado.categories[1] : ""}                             
                    </p>
                </div>
                
                <div className="results">
                    {resultado.items.map(item => 
                    
                        //redirect to item
                        <Link style={{ textDecoration: 'none' }} to={`/items/${item.id}`}>

                            <div class="row producto">                                    
                                {/* loader for img */}
                                <div className="col-5 col-md-3 col-lg-3 thumbnailContainer"> 
                                    <img className="thumbnail" src={item.picture} alt={item.title}/>
                                </div>     

                                <div className="col-5 col-md-6 col-lg-6 detalles">
                                
                                    <div className="precio-y-shipping">
                                        <p className="precio">
                                            {new Intl.NumberFormat('es-AR', { style: 'currency', currency: item.price.currency }).format(item.price.amount)}                                        
                                        </p>
                                        <img className="shipping" src={item.free_shipping === true ? imgTag + "/img/ic_shipping.png" : ""} alt=""/>
                                    </div>

                                    <p className="articulo">
                                        <strong>
                                                {item.title}
                                        </strong>
                                    </p>

                                </div>

                                <div className="col-2 col-md-3 col-lg-2 city">
                                    {item.city}
                                </div>

                            </div>

                        </Link>
                    )}      
                </div>
                
            </section>
        )
    }
}

export default SearchResult;