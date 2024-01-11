import { useState } from "react";

export const HeaderEdl = () => {
    const [titreDossier,setTitreDossier] = useState("");
    const [titreResidence,setTitreResidence] = useState("");
    const [numeroAppartement,setNumeroAppartement] = useState("");
    const [typeAppartement,setTypeAppartement] = useState("");
    const [numeroBat,setNumeroBat] = useState("");
    const [numeroEtage,setNumeroEtage] = useState("");

    return (
        <div className="head-container">
          <div className="title-container">
            <label>
              Titre du dossier<br/>
              <input type="text" onChange={(e) => {setTitreDossier(e.target.value)}} value={titreDossier} />
            </label>
            <label>
              Résidence<br/>
              <input type="text" onChange={(e) => {setTitreResidence(e.target.value)}} value={titreResidence} />
            </label>
          </div>
          <div className="reference-container">
            <label>
              Appartement N°<br/>
              <input type="text" onChange={(e) => {setNumeroAppartement(e.target.value)}} value={numeroAppartement} />
            </label>
            <label>
              Type<br/>
              <input type="text" onChange={(e) => {setTypeAppartement(e.target.value)}} value={typeAppartement} />
            </label>
            <label>
              Bâtiment<br/>
              <input type="text" onChange={(e) => {setNumeroBat(e.target.value)}} value={numeroBat} />
            </label>
            <label>
              Etage<br/>
              <input type="text" onChange={(e) => {setNumeroEtage(e.target.value)}} value={numeroEtage} />
            </label>
          </div>
        </div>
    );
}