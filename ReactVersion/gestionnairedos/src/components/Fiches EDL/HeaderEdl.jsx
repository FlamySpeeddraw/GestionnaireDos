import { useState, useEffect } from "react";
import "./../../styles/EDL/header.css";

export const HeaderEdl = ({headerInfos,onUpdateHeaderInfos}) => {
  const [numeroAppartement,setNumeroAppartement] = useState(headerInfos.numeroAppartement);
  const [typeAppartement,setTypeAppartement] = useState(headerInfos.typeAppartement);
  const [numeroBat,setNumeroBat] = useState(headerInfos.numeroBat);
  const [numeroEtage,setNumeroEtage] = useState(headerInfos.numeroEtage);
  const [verif,setVerif] = useState(false);
   
  useEffect(() => {
    setNumeroAppartement(headerInfos.numeroAppartement);
    setTypeAppartement(headerInfos.typeAppartement);
    setNumeroBat(headerInfos.numeroBat);
    setNumeroEtage(headerInfos.numeroEtage);
  }, [headerInfos.numeroAppartement,headerInfos.typeAppartement,headerInfos.numeroBat,headerInfos.numeroEtage]);

  useEffect(() => {
    if (verif) {
      const updatedHeaderInfos = {
        numeroAppartement:numeroAppartement,
        typeAppartement:typeAppartement,
        numeroBat:numeroBat,
        numeroEtage:numeroEtage
      };
      onUpdateHeaderInfos(updatedHeaderInfos);
      setVerif(false);
    }
  },[onUpdateHeaderInfos,verif,numeroAppartement,typeAppartement,numeroBat,numeroEtage]);

  return (
    <div className="head-container">
      <div className="reference-container">
        <label>
          Appartement N°<br/>
          <input type="text" onChange={(e) => {setNumeroAppartement(e.target.value);setVerif(true)}} value={numeroAppartement} />
        </label>
        <label>
          Type<br/>
          <input type="text" onChange={(e) => {setTypeAppartement(e.target.value);setVerif(true)}} value={typeAppartement} />
        </label>
        <label>
          Bâtiment<br/>
          <input type="text" onChange={(e) => {setNumeroBat(e.target.value);setVerif(true)}} value={numeroBat} />
        </label>
        <label>
          Etage<br/>
          <input type="text" onChange={(e) => {setNumeroEtage(e.target.value);setVerif(true)}} value={numeroEtage} />
        </label>
      </div>
    </div>
  );
}