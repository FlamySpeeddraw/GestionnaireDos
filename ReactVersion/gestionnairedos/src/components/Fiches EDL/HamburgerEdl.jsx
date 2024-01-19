import { useEffect, useState } from "react";
import { HeaderEdl } from "./HeaderEdl";
import "./../../styles/EDL/burger.css";
import axios from "axios";

export const HamburgerEdl = ({nomResidence,date,headerInfos,updateHeaderInfos}) => {
    const [toggle,setToggle] = useState(false);
    const [edlSelected,setEdlSelected] = useState("");
    const [fiches,setFiches] = useState([]);
    console.log(edlSelected)
    useEffect(() => {
        setEdlSelected("Bat " + headerInfos.numeroBat + " E" + headerInfos.numeroEtage + " N°" + headerInfos.numeroAppartement);
    },[edlSelected,headerInfos.numeroBat,headerInfos.numeroEtage,headerInfos.numeroAppartement])

    useEffect(() => {
        if (date !== "") {
            axios.get('http://localhost:8080/JSON/' + nomResidence + '/elds').then(response => {
                setFiches(response.data);
            }).catch(error => {
                console.log(error);
            });
        }
    },[fiches,date,nomResidence]);

    return (
        <div className={`burger-menu ${!toggle ? '' : 'actif'} `}>
            <img onClick={() => setToggle(true)} className={`burger-menu-icon ${!toggle ? '' : 'inactif'} `} src="./assets/hamburger.png" alt="Menu"/>
            <div className={`burger-menu-inner ${toggle ? "" : "inactif"} `}>
                <div>
                    <select value={edlSelected} onChange={(e) => {setEdlSelected(e.target.value)}}>
                            {fiches.map((fiche) => (
                                <option key={fiche.id} value={"Bat " + fiche.numeroBat + " E" + fiche.numeroEtage + "N°" + fiche.numeroAppartement}>{"Bat " + fiche.numeroBat + " E" + fiche.numeroEtage + "N°" + fiche.numeroAppartement}</option>
                            ))}
                    </select>
                    <HeaderEdl headerInfos={headerInfos} onUpdateHeaderInfos={updateHeaderInfos} />
                </div>
                <img onClick={() => setToggle(false)} id="cross" className={`burger-menu-icon ${toggle ? '' : 'inactif'} `} src="./assets/x.png" alt="Menu"/>
            </div>
        </div>
    );
}