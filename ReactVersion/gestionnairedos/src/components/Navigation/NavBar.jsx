import React from "react";
import { BrowserView } from "react-device-detect";
import { Link } from "react-router-dom";
 
export const NavBar = () => {
    return (
        <div className="navbar">
            <div className="navbar-element"><Link to="/">Accueil</Link></div>
            <div className="navbar-element"><Link to="/edl">EDL</Link></div>
            <div className="navbar-element"><Link to="/diag">Diag</Link></div>
            <BrowserView className="navbar-element">
                <Link to="/excel">Excel</Link>
            </BrowserView>
        </div>
    );
};