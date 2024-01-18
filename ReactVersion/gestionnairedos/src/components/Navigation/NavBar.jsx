import React from "react";
import { Link } from "react-router-dom";
 
export const NavBar = () => {
    return (
        <div className="navbar">
            <div className="navbar-element"><Link to="/dossiers">Dossiers</Link></div>
            <div className="navbar-element"><Link to="/edl">EDL</Link></div>
        </div>
    );
};