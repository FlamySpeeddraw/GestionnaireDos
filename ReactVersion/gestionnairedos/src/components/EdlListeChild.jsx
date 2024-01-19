import { useState } from "react";
import { Link } from "react-router-dom";

export const EdlListeChild = ({residenceInfos,handleDeleteResidence}) => {
    const [nomResidence,setNomResidence] = useState(residenceInfos.nom);

    return (
        <li>
            <Link to={"/edl/" + residenceInfos.nom + "/edit/" + residenceInfos.edls[0].id}>{nomResidence}</Link>
            <input type="text" value={nomResidence} onChange={(e) => setNomResidence(e.target.value)} />
            <button onClick={() => handleDeleteResidence(residenceInfos.nom)}>
                <svg className="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
                    <path className="trash-lid" fillRule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
                    <path className="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
                </svg>
            </button>
        </li>
    );
}