import React, { useEffect, useState } from "react"
import { burgersTypeData } from "../../burgersTypeDetails";
import OrderSummary from "../OrderSummary/OrderSummary";
import "./ProductsDisplayContainer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose, faMessage, faPen, faSearch, faShare, faSquare,} from "@fortawesome/free-solid-svg-icons";

function ProductsDisplayContainer(){

    const [productsChanged, isProductsChanged ] = useState(false),
        [orderData, setOrderData] = useState([])

    const handleItemClick = (e) => {
        if(e.target.className !== "products-display-container"){
            let productId = e.target.id.match(/\d+$/)[0]
            if(!localStorage.getItem('productsAddedToCartIds')){
                let newObj = {}
                newObj[productId] = 1
                localStorage.setItem('QuantityOfEachItem', JSON.stringify(newObj))
                localStorage.setItem('productsAddedToCartIds', JSON.stringify([productId]))
                isProductsChanged(!productsChanged)
            } else if(!JSON.parse(localStorage.getItem('productsAddedToCartIds')).includes(productId)) {
                let ids = JSON.parse(localStorage.getItem('productsAddedToCartIds'))
                let quantityObject = JSON.parse(localStorage.getItem('QuantityOfEachItem'))
                quantityObject[productId] = 1
                localStorage.setItem('QuantityOfEachItem', JSON.stringify(quantityObject))
                localStorage.setItem('productsAddedToCartIds', JSON.stringify([...ids, productId]))
                isProductsChanged(!productsChanged)
            } else {
                alert('You already have the item in cart')
            }
        }
    }

    const handleRemoveItem = (idToRemove) => {
        let productIds = JSON.parse(localStorage.getItem('productsAddedToCartIds')) || []
        let quantityObject = JSON.parse(localStorage.getItem('QuantityOfEachItem'))
        delete quantityObject[idToRemove.toString()]
        localStorage.setItem('QuantityOfEachItem', JSON.stringify(quantityObject))
        let productIdsAfterRemoval = productIds.filter(item => item !== idToRemove.toString())
        let orderSummaryData = burgersTypeData.filter(item => productIdsAfterRemoval.includes(item.id.toString()))
        localStorage.setItem('productsAddedToCartIds', JSON.stringify(productIdsAfterRemoval))
        setOrderData(orderSummaryData)
    }

    useEffect(() => {
        console.log("sharan")
        let productIds = JSON.parse(localStorage.getItem('productsAddedToCartIds')) || []
        let orderSummaryData = burgersTypeData.filter(item => productIds.includes(item.id.toString()))
        setOrderData(orderSummaryData)
    },[productsChanged])

    return(
        <>
            <div className="product-details-container">
                <div className="top-nav">
                    <div className="searchBar-with-icon">
                        <FontAwesomeIcon icon={faSearch}/>
                        <input className="search-bar" placeholder="Search menu ..."/>
                        <FontAwesomeIcon className="close-icons" icon={faClose} />
                    </div>
                    <div className="user-options">
                        <div className="user-options-item">
                            <FontAwesomeIcon icon={faMessage} className="menu-item-icon"/>
                            <p>Chat</p>
                        </div>
                        <div className="user-options-item">
                            <FontAwesomeIcon icon={faSquare} className="menu-item-icon"/>
                            <p>More</p>
                        </div>
                        <div className="menu-catch-text catch-text-white">
                            <FontAwesomeIcon icon={faShare} className="menu-item-icon"/>
                            <p>Share</p>
                        </div>
                        <div className="menu-catch-text">
                            <FontAwesomeIcon icon={faPen} className="menu-item-icon"/>
                            <p>Your Notes</p>
                        </div>
                    </div>
                </div>
                <div className="product-order-container">
                    <div className="product-item-show">
                        <div className="product-name-header">
                            <div>
                                <h1>Hamburger</h1>
                                <p>Discover whatever you need easily</p>
                            </div>
                            <div className="para">
                                <p >MENUS > FOOD ></p>
                            </div>
                        </div>
                        <div className="products-display-container" onClick={handleItemClick}>
                            {burgersTypeData.map(item => {
                                return (
                                    <div className="each-item" id={`each-item-${item.id}`} key={item.id}>
                                        <img className="product-image" id={`product-image-${item.id}`} src={item.image} alt={item.name}></img>
                                        <p className="product-name" id={`product-name-${item.id}`}>{item.name}</p>
                                        <span id={`item-price-${item.id}`}>{item.price}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <OrderSummary orderData = {orderData} productsChanged={productsChanged} removeItemHandler={handleRemoveItem}/>
                </div>
            </div>
        </>
    )
}

export default ProductsDisplayContainer;