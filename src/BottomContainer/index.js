import React from "react"
import BottomNav from "./BottomNav/BottomNav"
import "./index.css"
import ProductsDisplayContainer from "./ProductsDisplayContainer/ProductsDisplayContainer"

function BottomContainer(){
    return (
        <div className="bottom-container">
            <BottomNav/>
            <ProductsDisplayContainer/>
        </div>
    )
}

export default BottomContainer