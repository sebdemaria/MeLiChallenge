import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Link
  } from "react-router-dom";
import '../css/productDetail.css';
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

                        {/** price parce to currency */}
                        <p className="price">
                            {new Intl.NumberFormat('es-AR', { style: 'currency', currency: resultado.item.price.currency }).format(resultado.item.price.amount)}
                        </p>

                        <button onClick={() => setModalIsOpen(true)} type="button" className="btn btn-primary buy">Comprar</button>                        
                        
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

            <div className="modal">
                <Modal isOpen={modaIsOpen} onRequestClose={() => setModalIsOpen(false)}
                    // styles of button needed in tag otherwise all the fabric styles get lost
                    style={
                        {
                            overlay:{
                                transition: '0.5s'
                            },
                            content:{     
                                textAlign: "center",
                                top: '25%',
                                left: '30%',
                                right: '25%',
                                bottom: '30%',                       
                                width: '40%',
                                height: '50%',
                                borderRadius: '5px',   
                                transition: '0.5s',
                                boxShadow: '0 1px 2px 0 rgba(0,0,0,.1)'                    
                            }                            
                        }
                    }   
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
                        <Link to="/">
                            <button onClick={() => setModalIsOpen(false)} type="button" className="btn btn-primary back">Quiero seguir comprando!</button>                                         
                        </Link>
                </Modal>
            </div>

        </div>
    )
}

export default ProductDetail