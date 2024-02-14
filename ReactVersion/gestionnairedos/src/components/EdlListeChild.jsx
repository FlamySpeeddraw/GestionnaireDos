import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "./Modal";
import axios from "axios";

export const EdlListeChild = ({residenceInfos,handleDeleteResidence,handleModifierNom}) => {
    const [nbFiches,setNbFiches] = useState(0);
    const [modalDownload,setModalDownload] = useState(false);
    const [url,setUrl] = useState("");

    const download = (nom,dossier,url) => {
        axios.post('http://localhost:8080/EXCEL/' + nom + '/' + dossier + '/download',{url}).then(response => {
            setModalDownload(false);
            setUrl("");
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        setNbFiches(residenceInfos.edls.length);
    },[nbFiches,residenceInfos]);

    return (
        <>
            <li className="li-liste-residence">
                <Link className="link-liste-residence" to={"/edl/" + residenceInfos.nom + "/" + residenceInfos.dossier + "/edit/new"}>{residenceInfos.nom} - {residenceInfos.dossier}</Link>
                <p>{nbFiches} {nbFiches > 1 ? "fiches" : "fiche"}</p>
                <p id="modifier" onClick={() => handleModifierNom(residenceInfos.nom,residenceInfos.dossier)}>Modifier</p>
                <img onClick={() => setModalDownload(true)} className="download" src="/assets/downloads.png" alt="Excel" />
                <button id="delete" onClick={() => handleDeleteResidence(residenceInfos.nom,residenceInfos.dossier)}>
                    <svg className="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
                        <path className="trash-lid" fillRule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
                        <path className="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
                    </svg>
                </button>
            </li>
            <Modal isOpen={modalDownload} onValidate={() => download(residenceInfos.nom,residenceInfos.dossier,url)} onClose={() => setModalDownload(false)}>
                <h3>Veuillez entrer l'url de la destination de votre fichier</h3>
                <div className="inner-content-modal">
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                    <p className="info-url">Faites clic droit et <i>'copier en tant que chemin d'accès'</i> sur le dossier de destination de votre choix</p>
                </div>
            </Modal>
        </>
    );
}