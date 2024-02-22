import { useEffect, useState } from "react";

export const ElementPiece = ({infosElement,onUpdateElement,deleteElement,deletePiece}) => {
    const [nom,setNom] = useState(infosElement.nomElement);
    const [dimensions,setDimensions] = useState(infosElement.dimensions);
    const [type,setType] = useState(infosElement.type);
    const [etat,setEtat] = useState(infosElement.etat);
    const [observations,setObservations] = useState(infosElement.observations);
    const [verif,setVerif] = useState(false);

    const handleChangeNom = (event) => {
        setNom(event.target.value);
        setVerif(true);
    }

    const handleChangeDimensions = (event) => {
        setDimensions(event.target.value);
        setVerif(true);
    }

    const handleChangeType = (event) => {
        setType(event.target.value);
        setVerif(true);
    }
    
    const handleChangeEtat = (changeEtat) => {
        if (changeEtat === etat) {
            setEtat(0);
        } else {
            setEtat(changeEtat);
        }
        setVerif(true);
    }

    const handleChangeObservations = (event) => {
        setObservations(event.target.value);
        setVerif(true);
    }

    useEffect(() => {
        if (verif) {
            const updatedElement = {
                id:infosElement.id,
                nomElement: nom,
                dimensions: dimensions,
                type: type,
                etat: etat,
                observations:observations
            };
            onUpdateElement(infosElement, updatedElement);
            setVerif(false);
        }
    }, [nom, etat, observations, verif, infosElement, onUpdateElement, deletePiece, dimensions, type]);

    return (
        <tr className="element-container">
            <td className="element-input-container"><input className="element-input" type="text" value={nom} onChange={handleChangeNom}/></td>
            <td className="element-input-container"><input className="element-input" type="text" value={dimensions} onChange={handleChangeDimensions}/></td>
            <td className="element-input-container"><input className="element-input" type="text" value={type} onChange={handleChangeType}/></td>
            <td className={`element-etat-container ${etat !== 0 ? '' : 'pasRempli'}`} onClick={() => {handleChangeEtat(1)}}><div className="element-etat">{etat === 1?"X":""}</div></td>
            <td className={`element-etat-container ${etat !== 0 ? '' : 'pasRempli'}`} onClick={() => {handleChangeEtat(2)}}><div className="element-etat">{etat === 2?"X":""}</div></td>
            <td className={`element-etat-container ${etat !== 0 ? '' : 'pasRempli'}`} onClick={() => {handleChangeEtat(3)}}><div className="element-etat">{etat === 3?"X":""}</div></td>
            <td className="piece-textarea-container"><textarea value={observations} onChange={handleChangeObservations}/></td>
            <td className="td-delete">
                <button onClick={() => deleteElement(infosElement.id)}>
                    <svg className="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
                        <path className="trash-lid" fillRule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
                        <path className="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
                    </svg>
                </button>
            </td>
        </tr>
    );
}