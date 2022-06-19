import React from "react"
import SideNav from "./SideNav/SideNav"
import "./index.css"
import ProductsDisplayContainer from "./ProductsDisplayContainer/ProductsDisplayContainer"

function BottomContainer(){
    return (
        <div className="bottom-container">
            <SideNav/>
            <ProductsDisplayContainer/>
        </div>
    )
}

export default BottomContainer