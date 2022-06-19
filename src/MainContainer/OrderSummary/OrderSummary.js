import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./OrderSummary.css"
import { faClose, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons"

function OrderSummary(props){

    const {orderData, removeItemHandler} = props,
        [totalPrice, setTotalPrice] = useState(0),
        [taxes, setTaxes] = useState(0),
        [isQuantityChanged, setIsQuantityChanged] = useState(false)

    useEffect(() => {
        let price = 0
        const quantityObject = JSON.parse(localStorage.getItem('QuantityOfEachItem'))
        orderData.forEach(item => {
            let intPrice = parseFloat(item.price.slice(1))
            console.log(intPrice)
            price += ((intPrice) * quantityObject[item.id])
        })
        setTotalPrice(price.toFixed(2))
        setTaxes((0.1 * totalPrice).toFixed(2))
    },[orderData, totalPrice, isQuantityChanged])

    const handlePrintBillClick = () => {
        let pdfDetails = ''
        const quantityObject = JSON.parse(localStorage.getItem('QuantityOfEachItem'))
        orderData.forEach(item => {
                let price = parseFloat(item.price.slice(1)) * quantityObject[item.id]
                console.log(item.price.slice(1))
                console.log(quantityObject[item.id])
                pdfDetails += `<div>
                    <p>Product Name : ${item.name}</p>
                    <p>Product Quantity : ${quantityObject[item.id]}</p>
                    <p>Product Price : ${price}</p>
                </div> <hr/>`
        })
        pdfDetails += `<p><b>Total: ${parseFloat(totalPrice)}</b></p><p><b>Tax (10%): ${parseFloat(taxes)}</b></p><p><b>Total(Including Taxes): ${parseFloat(totalPrice) + parseFloat(taxes)}</b></p>`
        let pdfWindow = window.open("OrderSummary.pdf")
        pdfWindow.document.write(pdfDetails)
    }

    const handleAddMinusQuantityClick = (id, type) => {
        const quantityObject = JSON.parse(localStorage.getItem('QuantityOfEachItem'))
        if(type === 'plus'){
            quantityObject[id] += 1
            localStorage.setItem('QuantityOfEachItem', JSON.stringify(quantityObject))
        } else {
            if(quantityObject[id] !== 1){
                quantityObject[id] -= 1
                localStorage.setItem('QuantityOfEachItem', JSON.stringify(quantityObject))
            }
        }
        setIsQuantityChanged(!isQuantityChanged)
    }

    return (
        <div className="order-summary">
            <div className="Order-summary-header">
                <div>
                    <h3>My Order</h3>
                    <p>Take out</p>
                </div>
                <div className="close-icon">
                    <FontAwesomeIcon icon={faClose} />
                </div>
            </div>
            <div className="product-order-summary">
                {orderData.map(item => {
                    return (
                        <div className="product-item" key={item.id}>
                            <div>
                                <img className="image-order" alt={item.image} src={item.image}/>
                            </div>
                            <div>
                                {item.name}
                                <br/>
                                {item.price}
                            </div>
                            <div className="icon-summary">
                                <br/>
                                <div>
                                    <span className="plus-minus-icon">
                                        <FontAwesomeIcon icon={faMinus} onClick={() => handleAddMinusQuantityClick(item.id, 'minus')}/>
                                    </span>
                                    {JSON.parse(localStorage.getItem('QuantityOfEachItem'))[item.id]}
                                    <span className="plus-icon plus-minus-icon" onClick={() => handleAddMinusQuantityClick(item.id, 'plus')}>
                                        <FontAwesomeIcon icon={faPlus} className="plus-icon-fa"/>
                                    </span>
                                </div>
                            </div>
                            <div onClick={() => removeItemHandler(item.id)} title="Remove" className="remove-icon">
                                <FontAwesomeIcon icon={faClose} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="bill-sum">
                <div className="sub-total">
                    <p>Subtotal</p>
                    <p>${totalPrice}</p>
                </div>
                <div className="sub-total">
                    <p>Tax (10%)</p>
                    <p>${(0.1 * totalPrice).toFixed(2)}</p>
                </div>
                <hr className="hr-tag"/>
                <div className="sub-total">
                    <p>Total</p>
                    <p>${(parseFloat(totalPrice) + parseFloat(taxes)).toFixed(2)}</p>
                </div>
                <button className="btn" onClick={handlePrintBillClick}>Print Bills</button>
            </div>
        </div>
    )
}

export default OrderSummary