import { useEffect, useState } from "react";
import { DecisionTravaux } from "../components/Fiches EDL/DecisionTravaux";
import { FormEdl } from "../components/Fiches EDL/FormEdl";
import { v4 as uuid } from 'uuid';
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Modal } from "../components/Modal";
import "./../styles/EDL/style.css"

export const Edl = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [toggleModal,setToggleModal] = useState(true);
  const [verif,setVerif] = useState(false);
  const [residence,setResidence] = useState({nom:params.nomResidence,dossier:params.nomDossier,edls:[]});
  const [observationsGenerales,setObservationsGenerales] = useState("");
  const [idPage,setIdPage] = useState(uuid());
  const [pieces,setPieces] = useState([]);
  const [numeroAppartement,setNumeroAppartement] = useState("");
  const [typeAppartement,setTypeAppartement] = useState("");
  const [batiment,setBatiment] = useState("");
  const [etage,setEtage] = useState("");

  /*useEffect(() => {
    if (headerInfos.numeroAppartement === "" || headerInfos.typeAppartement === "" || headerInfos.numeroBat === "" || headerInfos.numeroEtage === "") {
      setToggleModal(true);
    }
  },[headerInfos]);*/

  useEffect(() => {
    if(location.pathname !== "/edl/" + residence.nom.replace(" ","%20") + "/" + residence.dossier.replace(" ","%20") + "/edit/new") {
      if (!verif) {
        axios.get('http://localhost:8080/JSON/' + residence.nom + '/' + residence.dossier).then(response => {
          setResidence(response.data);
          setVerif(true);
        }).catch(error => {
          console.log(error);
        });
      }
    }
  },[location,residence,verif,toggleModal]);

  const saveEdl = () => {
    axios.post('http://localhost:8080/JSON/' + residence.nom + '/' + residence.dossier + '/save',{
      id:idPage,
      numeroAppartement:numeroAppartement,
      typeAppartement:typeAppartement,
      numeroBat:batiment,
      numeroEtage:etage,
      pieces,
      observationsGenerales:observationsGenerales
    }).then(response => {
      navigate("/edl/" + residence.nom + "/" + residence.dossier + "/edit/" + idPage);
    }).catch(error => {
      console.log(error);
    });
  }

  const handleDeletepiece = (nomPiece) => {
    if (nomPiece !== "") {
      const piecesCopy = [...pieces];
      const piecesCopyFiltered = piecesCopy.filter(piece => piece.nom !== nomPiece);
      setPieces(piecesCopyFiltered);
    }
  }

  const handleUpdatePieces = (updatedPieces) => {
    setPieces(updatedPieces);
  }

  const handleAddPiece = (nomPiece) => {
    setPieces((prevPieces) => [...prevPieces,{id:uuid(),nom:nomPiece,elements:[]}]);
  }
  
  const handleAddElement = (nomPiece, nomElement) => {
    setPieces((prevPieces) =>
      prevPieces.map((piece) =>
        piece.nom === nomPiece
          ? { ...piece, elements: [...piece.elements, {id:uuid(),nomElement, etat: "", faire: "", observations: "" }] }
          : piece
      )
    );
  };

  const onValidate = () => {
    if (numeroAppartement === "" || etage === "" || batiment === "" || typeAppartement === "") {
      //METTRE MODAL DE CONFIRMATION
    }
  }

  const closeModal = () => {
    if (numeroAppartement === "" || etage === "" || batiment === "" || typeAppartement === "") {
      //METTRE MODAL DE CONFIRMATION
    }
  }

  return (
    <div className="main-container">
      <FormEdl OnSave={saveEdl} onDelete={handleDeletepiece} handleAddPiece={handleAddPiece} pieces={pieces} handleAddNomElement={handleAddElement}/>
      <DecisionTravaux observationsGenerales={observationsGenerales} listePieces={pieces} handleUpdatePieces={handleUpdatePieces} />
      <Modal isOpen={toggleModal} onValidate={() => ""} onClose={() => setToggleModal(false)}>
        <h3>Détails du logement</h3>
        <div className="inner-content-modal">
          <input placeholder="Appartement N°" type="text" value={numeroAppartement} onChange={(e) => setNumeroAppartement(e.target.value)}/>
          <input placeholder="Type" type="text" value={typeAppartement} onChange={(e) => setTypeAppartement(e.target.value)}/>
          <input placeholder="Bâtiment" type="text" value={batiment} onChange={(e) => setBatiment(e.target.value)}/>
          <input placeholder="Etage" type="text" value={etage} onChange={(e) => setEtage(e.target.value)}/>
          <select value={"Bât " + batiment + " etage n°" + etage + " logement " + numeroAppartement + " " + typeAppartement} onChange={(e) => {""}}>
            {residence.edls.map((edl) => (
              <option key={edl.id} value={edl.numeroAppartement}>Bât {edl.numeroBat} Etage n°{edl.numeroEtage} logement {edl.numeroAppartement} {edl.typeAppartement}</option>
            ))}
          </select>
        </div>
      </Modal>
    </div>
  );
}