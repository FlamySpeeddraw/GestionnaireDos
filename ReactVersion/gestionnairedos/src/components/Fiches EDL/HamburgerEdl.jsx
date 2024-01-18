import { useState } from "react";
import { HeaderEdl } from "./HeaderEdl";
import "./../../styles/EDL/burger.css";

export const HamburgerEdl = ({headerInfos,updateHeaderInfos}) => {
    const [toggle,setToggle] = useState(false);

    return (
        <div className={`burger-menu ${!toggle ? '' : 'actif'} `}>
            <img onClick={() => setToggle(true)} className={`burger-menu-icon ${!toggle ? '' : 'inactif'} `} src="./assets/hamburger.png" alt="Menu"/>
            <div className={`burger-menu-inner ${toggle ? "" : "inactif"} `}>
                <HeaderEdl headerInfos={headerInfos} onUpdateHeaderInfos={updateHeaderInfos} />
                <img onClick={() => setToggle(false)} id="cross" className={`burger-menu-icon ${toggle ? '' : 'inactif'} `} src="./assets/x.png" alt="Menu"/>
            </div>
        </div>
    );
}