import { useEffect, useState } from "react";

export const ElementPiece = ({infosElement,onUpdateElement,deleteElement,deletePiece}) => {
    const [nom,setNom] = useState(infosElement.nomElement);
    const [etat,setEtat] = useState(infosElement.etat);
    const [faire,setFaire] = useState(infosElement.faire);
    const [observations,setObservations] = useState(infosElement.observations);
    const [verif,setVerif] = useState(false);

    const handleChangeNom = (event) => {
        setNom(event.target.value);
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

    const handleChangeFaire = (event) => {
        setFaire(event.target.value);
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
                etat: etat,
                faire: faire,
                observations:observations
            };
            onUpdateElement(infosElement, updatedElement);
            setVerif(false);
        }
    }, [nom, etat, faire, observations, verif, infosElement, onUpdateElement,deletePiece]);

    return (
        <tr className="element-container">
            <td className="element-input-container"><input className="element-input" type="text" value={nom} onChange={handleChangeNom}/></td>
            <td className={`element-etat-container ${etat !== 0 ? '' : 'pasRempli'}`} onClick={() => {handleChangeEtat(1)}}><div className="element-etat">{etat === 1?"X":""}</div></td>
            <td className={`element-etat-container ${etat !== 0 ? '' : 'pasRempli'}`} onClick={() => {handleChangeEtat(2)}}><div className="element-etat">{etat === 2?"X":""}</div></td>
            <td className={`element-etat-container ${etat !== 0 ? '' : 'pasRempli'}`} onClick={() => {handleChangeEtat(3)}}><div className="element-etat">{etat === 3?"X":""}</div></td>
            <td className="td-radio-faire">
                <div className="radio-faire-container">
                    <label className="radio-faire">
                        <input type="radio" value={"oui"} checked={faire === "oui"} onChange={handleChangeFaire} />Oui
                    </label>
                    <label className="radio-faire">
                        <input type="radio" value={"non"} checked={faire === "non"} onChange={handleChangeFaire} />Non                    
                    </label>
                </div>
            </td>
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

export const ElementOpr = ({infosElement,onUpdateOpr,deleteElement}) => {
    const [nom,setNom] = useState(infosElement.nomElement);
    const [etatOpr,setEtatOpr] = useState(infosElement.etatOpr);
    const [observationsOpr,setObservationsOpr] = useState(infosElement.observationsOpr);
    const [verif,setVerif] = useState(false);

    const handleChangeNom = (event) => {
        setNom(event.target.value);
        setVerif(true);
    }
    
    const handleChangeEtatOpr = (changeEtat) => {
        if (changeEtat === etatOpr) {
            setEtatOpr(0);
        } else {
            setEtatOpr(changeEtat);
        }
        setVerif(true);
    }

    const handleChangeObservationsOpr = (event) => {
        setObservationsOpr(event.target.value);
        setVerif(true);
    }

    useEffect(() => {
        if (verif) {
            const updatedElement = {
                nomElement:nom,
                etatOpr:etatOpr,
                observationsOpr:observationsOpr
            };
            onUpdateOpr(infosElement, updatedElement);
            setVerif(false);
        }
    }, [infosElement,nom,etatOpr,observationsOpr,onUpdateOpr,verif]);

    return (
        <tr className="element-container">
            <td className="element-input-container"><input className="element-input" type="text" value={nom} onChange={handleChangeNom}/></td>
            <td className="td-radio-faire">
                <div className="radio-faire-container">
                    <label className="radio-faire">
                        <svg className={infosElement.faire === "oui" ? "" : "dontDisplay"} fill="#000000" width="13px" height="13px" viewBox="0 0 16.25 16.25" xmlns="http://www.w3.org/2000/svg"><path d="M8.109 4.729q-0.91 0 -1.69 0.455t-1.235 1.235 -0.455 1.69 0.455 1.69 1.235 1.235 1.69 0.455 1.69 -0.455 1.235 -1.235 0.455 -1.69 -0.455 -1.69 -1.235 -1.235 -1.69 -0.455zm0 -3.38q-1.836 0 -3.413 0.926 -1.528 0.894 -2.421 2.421 -0.926 1.576 -0.926 3.413t0.926 3.413q0.894 1.528 2.421 2.421 1.576 0.926 3.413 0.926t3.413 -0.926q1.528 -0.894 2.421 -2.421 0.926 -1.576 0.926 -3.413t-0.926 -3.413q-0.894 -1.528 -2.421 -2.421 -1.576 -0.926 -3.413 -0.926zm0 12.171q-1.463 0 -2.73 -0.748 -1.219 -0.715 -1.934 -1.934 -0.748 -1.268 -0.748 -2.73t0.748 -2.73q0.715 -1.219 1.934 -1.934 1.268 -0.748 2.73 -0.748t2.73 0.748q1.219 0.715 1.934 1.934 0.748 1.268 0.748 2.73t-0.748 2.73q-0.715 1.219 -1.934 1.934 -1.268 0.748 -2.73 0.748z"/></svg>
                        <svg className={infosElement.faire === "oui" ? "dontDisplay" : ""} fill="#000000" width="13px" height="13px" viewBox="0 0 16.25 16.25" xmlns="http://www.w3.org/2000/svg"><path d="M8.109 1.349q-1.836 0 -3.413 0.926 -1.528 0.894 -2.421 2.421 -0.926 1.576 -0.926 3.413t0.926 3.413q0.894 1.528 2.421 2.421 1.576 0.926 3.413 0.926t3.413 -0.926q1.528 -0.894 2.421 -2.421 0.926 -1.576 0.926 -3.413t-0.926 -3.413q-0.894 -1.528 -2.421 -2.421 -1.576 -0.926 -3.413 -0.926zm0 12.171q-1.463 0 -2.73 -0.748 -1.219 -0.715 -1.934 -1.934 -0.748 -1.268 -0.748 -2.73t0.748 -2.73q0.715 -1.219 1.934 -1.934 1.268 -0.748 2.73 -0.748t2.73 0.748q1.219 0.715 1.934 1.934 0.748 1.268 0.748 2.73t-0.748 2.73q-0.715 1.219 -1.934 1.934 -1.268 0.748 -2.73 0.748z"/></svg>Oui
                    </label>
                    <label className="radio-faire">
                        <svg className={infosElement.faire === "non" ? "" : "dontDisplay"} fill="#000000" width="13px" height="13px" viewBox="0 0 16.25 16.25" xmlns="http://www.w3.org/2000/svg"><path d="M8.109 4.729q-0.91 0 -1.69 0.455t-1.235 1.235 -0.455 1.69 0.455 1.69 1.235 1.235 1.69 0.455 1.69 -0.455 1.235 -1.235 0.455 -1.69 -0.455 -1.69 -1.235 -1.235 -1.69 -0.455zm0 -3.38q-1.836 0 -3.413 0.926 -1.528 0.894 -2.421 2.421 -0.926 1.576 -0.926 3.413t0.926 3.413q0.894 1.528 2.421 2.421 1.576 0.926 3.413 0.926t3.413 -0.926q1.528 -0.894 2.421 -2.421 0.926 -1.576 0.926 -3.413t-0.926 -3.413q-0.894 -1.528 -2.421 -2.421 -1.576 -0.926 -3.413 -0.926zm0 12.171q-1.463 0 -2.73 -0.748 -1.219 -0.715 -1.934 -1.934 -0.748 -1.268 -0.748 -2.73t0.748 -2.73q0.715 -1.219 1.934 -1.934 1.268 -0.748 2.73 -0.748t2.73 0.748q1.219 0.715 1.934 1.934 0.748 1.268 0.748 2.73t-0.748 2.73q-0.715 1.219 -1.934 1.934 -1.268 0.748 -2.73 0.748z"/></svg>
                        <svg className={infosElement.faire === "non" ? "dontDisplay" : ""} fill="#000000" width="13px" height="13px" viewBox="0 0 16.25 16.25" xmlns="http://www.w3.org/2000/svg"><path d="M8.109 1.349q-1.836 0 -3.413 0.926 -1.528 0.894 -2.421 2.421 -0.926 1.576 -0.926 3.413t0.926 3.413q0.894 1.528 2.421 2.421 1.576 0.926 3.413 0.926t3.413 -0.926q1.528 -0.894 2.421 -2.421 0.926 -1.576 0.926 -3.413t-0.926 -3.413q-0.894 -1.528 -2.421 -2.421 -1.576 -0.926 -3.413 -0.926zm0 12.171q-1.463 0 -2.73 -0.748 -1.219 -0.715 -1.934 -1.934 -0.748 -1.268 -0.748 -2.73t0.748 -2.73q0.715 -1.219 1.934 -1.934 1.268 -0.748 2.73 -0.748t2.73 0.748q1.219 0.715 1.934 1.934 0.748 1.268 0.748 2.73t-0.748 2.73q-0.715 1.219 -1.934 1.934 -1.268 0.748 -2.73 0.748z"/></svg>Non                 
                    </label>
                </div>
            </td>
            <td id="sans-reserve" className={`element-etat-container ${etatOpr !== 0 ? '' : 'pasRempli'}`} onClick={() => {handleChangeEtatOpr(1)}}><div className="element-etat">{etatOpr === 1?"X":""}</div></td>
            <td id="reserve" className={`element-etat-container ${etatOpr !== 0 ? '' : 'pasRempli'}`} onClick={() => {handleChangeEtatOpr(2)}}><div className="element-etat">{etatOpr === 2?"X":""}</div></td>
            <td id="effectuee" className={`element-etat-container ${etatOpr !== 0 ? '' : 'pasRempli'}`} onClick={() => {handleChangeEtatOpr(3)}}><div className="element-etat">{etatOpr === 3?"X":""}</div></td>
            <td id="concerne" className={`element-etat-container ${etatOpr !== 0 ? '' : 'pasRempli'}`} onClick={() => {handleChangeEtatOpr(4)}}><div className="element-etat">{etatOpr === 4?"X":""}</div></td>
            <td className="piece-textarea-container"><textarea value={observationsOpr} onChange={handleChangeObservationsOpr}/></td>
            <td className="td-delete">
                <button onClick={() => deleteElement(infosElement.id)}>
                    <svg className="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
                        <path className="trash-lid" fillRule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
                        <path className="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
                    </svg>
                </button>
            </td>
        </tr>
    )
}