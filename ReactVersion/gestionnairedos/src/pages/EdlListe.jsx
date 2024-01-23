import { useEffect, useState } from "react";
import { EdlListeChild } from "../components/EdlListeChild";
import axios from "axios";
import "./../styles/EDL/liste.css"
import { Modal } from "../components/Modal";
import { useNavigate } from "react-router-dom";

export const EdlListe = () => {
    const navigate = useNavigate();
    const [residences,setResidences] = useState([]);
    const [isModalOpen,setIsModalOpen] = useState(false);
    const [isModalOpenModifer,setIsModalOpenModifer] = useState(false);
    const [nomResidence,setNomResidence] = useState("");
    const [nomDossier,setnomDossier] = useState("");
    const [selectNom,setSelectNom] = useState("");
    const [selectDossier,setSelectDossier] = useState("");
    const [errorMessage,setErrorMessage] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/JSON/residences').then((response) => {
            setResidences(response.data);
        }).catch((error) => {
            console.log(error);
        });
    },[]);

    const onValidate = () => {
        if (nomResidence === "" || nomDossier === "") {
            setErrorMessage(true);
            setTimeout(() => {
                setErrorMessage(false);
            },2000);
        } else {
            axios.post('http://localhost:8080/JSON/residence/create',{nom:nomResidence,dossier:nomDossier,edls:[]});
            setIsModalOpen(false);
            navigate("/edl/" + nomResidence + "/" + nomDossier + "/edit/new");
            setNomResidence("");
            setnomDossier("");
        }
    }

    const deleteResidence = (nom,dossier) => {
        axios.delete('http://localhost:8080/JSON/' + nom + '/' + dossier + '/delete');
        setResidences((previous) => previous.filter(residence => residence.nom + residence.dossier !== nom + dossier));
    }

    const openModalModifier = (nom,dossier) => {
        setSelectNom(nom);
        setSelectDossier(dossier);
        setNomResidence(nom);
        setnomDossier(dossier);
        setIsModalOpenModifer(true);
    }

    const onValidateModifier = () => {
        if (nomResidence === "" || nomDossier === "") {
            setErrorMessage(true);
            setTimeout(() => {
                setErrorMessage(false);
            },2000);
        } else if (nomResidence === selectNom && nomDossier === selectDossier) {
            setSelectDossier("");
            setSelectNom("");
            setnomDossier("");
            setNomResidence("");
            setIsModalOpenModifer(false);
        } else {
            axios.post('http://localhost:8080/JSON/' + selectNom + '/' + selectDossier + '/' + nomResidence + '/' + nomDossier);
            setResidences((previous) => previous.map((residence) => {
                if (residence.nom + residence.dossier === selectNom + selectDossier) {
                    return {
                        ...residence,
                        nom:nomResidence,
                        dossier:nomDossier
                    }
                } else {
                    return {
                        ...residence
                    }
                }
            }));
            setSelectDossier("");
            setSelectNom("");
            setnomDossier("");
            setNomResidence("");
            setIsModalOpenModifer(false);
        }
    }

    return (
        <div>
            <ul>
                <li id="li-ajouter-residence" onClick={() => {setNomResidence("");setnomDossier("");setIsModalOpen(true);}}><p>Ajouter une nouvelle résidence</p></li>
                {residences.map((residence) => (
                    <EdlListeChild key={residence.nom+residence.dossier} residenceInfos={residence} handleDeleteResidence={deleteResidence} handleModifierNom={openModalModifier} />
                ))}
            </ul>
            <Modal isOpen={isModalOpen} onValidate={() => onValidate()} onClose={() => setIsModalOpen(false)}>
                <h3>Création d'une nouvelle résidence</h3>
                <div className="inner-content-modal">
                    <input placeholder="Nom de la résidence" value={nomResidence} onChange={(e) => setNomResidence(e.target.value)} />
                    <input placeholder="Nom du dossier" value={nomDossier} onChange={(e) => setnomDossier(e.target.value)} />
                    {errorMessage ? <p className="error-message error-container">Veuillez remplir tous les champs</p> : <p className="error-container"></p>}
                </div>
            </Modal>
            <Modal isOpen={isModalOpenModifer} onValidate={() => onValidateModifier()} onClose={() => setIsModalOpenModifer(false)}>
                <h3>Modifier la résidence</h3>
                <div className="inner-content-modal">
                    <input placeholder="Nouveau nom de la résidence" value={nomResidence} onChange={(e) => setNomResidence(e.target.value)} />
                    <input placeholder="Nouveau nom du dossier" value={nomDossier} onChange={(e) => setnomDossier(e.target.value)} />
                    {errorMessage ? <p className="error-message error-container">Veuillez remplir tous les champs</p> : <p className="error-container"></p>}
                </div>
            </Modal>
        </div>
    )
}