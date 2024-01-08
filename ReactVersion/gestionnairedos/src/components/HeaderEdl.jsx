import { useState } from "react";

export const HeaderEdl = () => {
    const [titreDossier,setTitreDossier] = useState("Titre du dossier");
    const [titreResidence,setTitreResidence] = useState("Résidence");
    const [numeroAppartement,setNumeroAppartement] = useState("N° appartement :");
    const [typeAppartement,setTypeAppartement] = useState("Type :");
    const [numeroBat,setNumeroBat] = useState("Bât :");
    const [numeroEtage,setNumeroEtage] = useState("Etage :");

    return (
        <div className="head-container">
          <div className="title-container">
            <p className="titre-dossier">{titreDossier}</p>
            <p className="titre-residence">{titreResidence}</p>
          </div>          
          <p className="titre-reference">REFERENCE LOGEMENT</p>
          <div className="reference-container">
            <p className="numero-appartement">{numeroAppartement}</p>
            <p className="type-appartement">{typeAppartement}</p>
            <p className="numero-batiment">{numeroBat}</p>
            <p className="numero-etage">{numeroEtage}</p>
          </div>
        </div>
    );
}