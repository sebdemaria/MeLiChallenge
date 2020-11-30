import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/productDetail.css';

const ProductDetail = (props) => {
    
    const imgTag = process.env.PUBLIC_URL;

    //get id from url for search on api
    const id = props.match.params.id;

    
    //Send request to enpoint
    const getResults = async (id) => {
        try {
            const searchData = await axios.get(`http://localhost:9000/api/items/${id}`)
            return setResultado(searchData.data); 
        } catch (err) {
            console.error(err)
        } 
    }
    
    //save search result
    const [resultado, setResultado] = useState();

    //execute req everytime the component renders with a new id
    useEffect(() => {
        getResults(id);
      }, [id]);

      console.log(resultado)
    
    //function for parsing sold items text
    const soldItemsSwitch = (soldItems) => {
            switch (soldItems){ 
            case 0:
                return "";
            case 1:
                return " - " + soldItems + " vendido";
            default:
                return " - " + soldItems + " vendidos";
        }              
    }

    if(resultado === undefined){
        return ( 
            <div className="loadContainer">
                <img className="loading" src={imgTag + "/img/loading-Gif.gif"} alt="loading..." />
            </div>     
        )
    }return (
        <div className="container">
            {/*HACER REQUEST PARA TRAER CATEGORIA PROPIA DEL PRODUCTO */}
            <p className="col-12 category">
                {resultado.item.category}
            </p>
            <section className='row product' >

                <div className="col-12 productDetails">
                    <img className="col-7 thumbnail" src={resultado.item.picture} alt={resultado.item.title}/>

                    <div className="col-5 details">
                        <p className="condition">
                            {(resultado.item.condition === 'new' ? "Nuevo" : "Usado") + soldItemsSwitch(resultado.item.sold_quantity)}
                        </p>

                        <p className="title" >
                            <strong>
                                {resultado.item.title}
                            </strong> 
                        </p>

                        <p className="price">
                            {new Intl.NumberFormat('es-AR', { style: 'currency', currency: resultado.item.price.currency }).format(resultado.item.price.amount)}
                        </p>

                        <button type="button" className="btn btn-primary buy">Comprar</button>
                    </div>

                </div>

                <div className="col-12 description">
                    <h2 className="description-title">
                        Descripción del producto
                    </h2>
                    <p className="col-7 description-text">
                        {resultado.item.description}
                    </p>
                </div>
            </section>
        </div>
    )
}

export default ProductDetail