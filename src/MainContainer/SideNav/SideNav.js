import React from "react"
import "./SideNav.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBolt, faEllipsis, faFilter, faGear, faHistory, faLessThan, faMoon, faPercentage, faSquareEnvelope, faStar, faSun, faTableColumns, faWallet } from '@fortawesome/free-solid-svg-icons'

function SideNav(){
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ],
        weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return (
        <div className="bottom-nav">
            <div className="company-name">
                <div>
                    <span className="bolt-icon-style">
                        <FontAwesomeIcon icon={faBolt} />
                    </span>
                </div>
                <div>
                    <h3>ProductsKart</h3>
                    <p>{`${weekday[new Date().getDay()]} ${new Date().getDate()} ${monthNames[new Date().getMonth()]}`}</p>
                </div>
                <div className="less-icon">
                    <FontAwesomeIcon icon={faLessThan} />
                </div>
            </div>
            <div className="nav-header">
                <div className="menu-name">
                    <img className="image" alt="burger" src="http://dummyimage.com/70x79.png/cc0000/ffffff"/>
                    <h3>Burger</h3>
                </div>
                <div className="filter">
                    <p>Filter</p>
                    <FontAwesomeIcon icon={faFilter} />
                </div>
            </div>
            <div className="menu-dashboard">
                <div className="menu-item-header">
                    <p>MENU DASHBOARD</p>
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
                <div className="menu-item highlighted-item">
                    <FontAwesomeIcon icon={faTableColumns} className="menu-item-icon"/>
                    <p>Dashboard</p>
                </div>
                <div className="menu-item">
                    <FontAwesomeIcon icon={faSquareEnvelope} className="menu-item-icon"/>
                    <p>Menus</p>
                    <span className="menu-catchy-text">NEW</span>
                </div>
                <div className="menu-item">
                    <FontAwesomeIcon icon={faHistory} className="menu-item-icon"/>
                    <p>History</p>
                </div>
                <div className="menu-item">
                    <FontAwesomeIcon icon={faWallet} className="menu-item-icon"/>
                    <p>Wallet</p>
                </div>
                <div className="menu-item">
                    <FontAwesomeIcon icon={faPercentage} className="menu-item-icon"/>
                    <p>Promotion</p>
                    <span className="menu-catchy-text">12+</span>
                </div>
            </div>
            <div className="menu-dashboard">
                <div className="menu-item-header">
                    <p>GENERAL</p>
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
                <div className="menu-item">
                    <FontAwesomeIcon icon={faGear} className="menu-item-icon"/>
                    <p>Settings</p>
                </div>
                <div className="menu-item">
                    <FontAwesomeIcon icon={faStar} className="menu-item-icon"/>
                    <p>Give Rating</p>
                </div>
            </div>
            <div className="mode">
                <span className="dark-span">
                    <FontAwesomeIcon icon={faMoon} className="menu-item-icon"/>
                    Dark
                </span>
                <span className="light-span">
                    <FontAwesomeIcon icon={faSun} className="menu-item-icon"/>
                    Light
                </span>
            </div>
        </div>
    )
}

export default SideNav