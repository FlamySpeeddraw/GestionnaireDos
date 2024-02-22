import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const DiagListeChild = ({residenceInfos,handleDeleteResidence,handleModifierNom}) => {
    const [nbFiches,setNbFiches] = useState(0);

    useEffect(() => {
        setNbFiches(residenceInfos.diags.length);
    },[nbFiches,residenceInfos]);
    
    return (
        <>
            <li className="li-liste-residence">
                <Link className="link-liste-residence" to={"/diag/" + residenceInfos.id + "/edit/new"}>{residenceInfos.residence} - {residenceInfos.dossier}</Link>
                <p>{nbFiches} {nbFiches > 1 ? "fiches" : "fiche"}</p>
                <p id="modifier" onClick={() => handleModifierNom(residenceInfos.id,residenceInfos.residence,residenceInfos.dossier,residenceInfos.prestation)}>Modifier</p>
                <button id="delete" onClick={() => handleDeleteResidence(residenceInfos.id)}>
                    <svg className="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
                        <path className="trash-lid" fillRule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
                        <path className="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
                    </svg>
                </button>
            </li>
        </>
    );
}