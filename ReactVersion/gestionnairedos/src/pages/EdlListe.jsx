import { useEffect, useState } from "react";
import { EdlListeChild } from "../components/EdlListeChild";
import axios from "axios";
import "./../styles/EDL/liste.css"
import { Modal } from "../components/Modal";
import { response } from "express";

export const EdlListe = () => {
    const [residences,setResidences] = useState([]);
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [nomResidence,setNomResidence] = useState("");
    const [nomDossier,setnomDossier] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8080/JSON/residences').then((response) => {
            setResidences(response.data);
        }).catch((error) => {
            console.log(error);
        });
    },[])

    const onValidate = () => {
        axios.post('http://localhost:8080/JSON/residence/create',{nom:nomResidence,dossier:nomDossier,edls:[]});
    }

    return (
        <div>
            <ul>
                <li><button onClick={() => setIsModalOpen(true)}>Nouvelle résidence</button></li>
            </ul>
            <Modal isOpen={isModalOpen} onValidate={() => onValidate()} onClose={() => setIsModalOpen(false)}>
                <h3>Création d'une nouvelle résidence</h3>
                <div className="inner-content-modal">
                    <label>
                        Nom de la résidence
                        <input value={nomResidence} onChange={(e) => setNomResidence(e.target.value)} />
                    </label>
                    <label>
                        Nom du dossier
                        <input value={nomDossier} onChange={(e) => setnomDossier(e.target.value)} />
                    </label>
                </div>
            </Modal>
        </div>
    )
}