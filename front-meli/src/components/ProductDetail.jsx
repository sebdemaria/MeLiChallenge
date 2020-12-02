import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Link
  } from "react-router-dom";
import '../sass/productDetail.scss';
import Modal from 'react-modal';
import logo from '../success.gif';

Modal.setAppElement('#root');
const ProductDetail = (props) => {
    
    const imgTag = process.env.PUBLIC_URL;

    const [modaIsOpen, setModalIsOpen] = useState(false);

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
        <section className="container">
                <div className="row col-12">
                    <p className="col-12 category">
                        {resultado.item.category}
                    </p>
                </div>

            <div className='row product'>

                <div className="productDetails">
                    <div class="col-12 col-sm-12 col-md-7 col-lg-7 foto">                        
                        <img className="item" src={resultado.item.picture} alt={resultado.item.title}/>
                    </div>

                    <div className="col-12 col-sm-12 col-md-5 col-lg-5 details">
                        <p className="condition">
                            {(resultado.item.condition === 'new' ? "Nuevo" : "Usado") + soldItemsSwitch(resultado.item.sold_quantity)}
                        </p>

                        <p className="title" >
                            <strong>
                                {resultado.item.title}
                            </strong> 
                        </p>

                        {/** price parce to currency */}
                        <p className="price">
                            {new Intl.NumberFormat('es-AR', { style: 'currency', currency: resultado.item.price.currency }).format(resultado.item.price.amount)}
                        </p>

                        <button onClick={() => setModalIsOpen(true)} type="button" className="btn btn-primary buy">Comprar</button>                        
                        
                    </div>

                </div>

                <div className="row description">
                    <h2 className="col-12 description-title">
                        Descripción del producto
                    </h2>
                    <p className="col-12 col-md-7 col-lg-7 description-text">
                        {resultado.item.description}
                    </p>
                </div>
            </div>

            <div className="modal">
                <Modal 
                    isOpen={modaIsOpen} 
                    onRequestClose={() => setModalIsOpen(false)}                                     
                >
                    <img src={logo} alt="All done!" class="success"/>
                    <div class="modal-msg">                            
                        <h4>
                            Listo! Ya realizaste tu compra!
                        </h4>   
                        <p>
                            Muchas gracias por confiar en nosotros
                        </p>
                    </div>
                    <Link style={{ textDecoration: 'none' }} to="/">
                            <button onClick={() => setModalIsOpen(false)} type="button" className="btn btn-primary back">Quiero seguir comprando!</button>                                         
                    </Link>
                </Modal>
            </div>

        </section>
    )
}

export default ProductDetail