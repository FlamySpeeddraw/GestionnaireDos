import { useEffect, useState } from "react";
import { DecisionTravaux } from "../components/Fiches EDL/DecisionTravaux";
import { FormEdl } from "../components/Fiches EDL/FormEdl";
import { v4 as uuid } from 'uuid';
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Modal } from "../components/Modal";
import "./../styles/EDL/style.css"
import { Switch } from "../components/Switch";

export const Edl = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [toggleModal,setToggleModal] = useState(false);
  const [toggleModalConfirmation,setToggleModalConfirmation] = useState(false);
  const [verif,setVerif] = useState(false);
  const [verif2,setVerif2] = useState(false);
  const [verifModal,setVerifModal] = useState(true);
  const [residence,setResidence] = useState({nom:params.nomResidence,dossier:params.nomDossier,edls:[]});
  const [observationsGenerales,setObservationsGenerales] = useState("");
  const [observationsGeneralesOpr,setObservationsGeneralesOpr] = useState("");
  const [idPage,setIdPage] = useState(uuid());
  const [idPageTemp,setIdPageTemp] = useState(uuid());
  const [pieces,setPieces] = useState([]);
  const [numeroAppartement,setNumeroAppartement] = useState("");
  const [typeAppartement,setTypeAppartement] = useState("");
  const [batiment,setBatiment] = useState("");
  const [etage,setEtage] = useState("");
  const [previousNumeroAppartement,setPreviousNumeroAppartement] = useState("");
  const [previousTypeAppartement,setPreviousTypeAppartement] = useState("");
  const [previousBatiment,setPreviousBatiment] = useState("");
  const [previousEtage,setPreviousEtage] = useState("");
  const [validate,setValidate] = useState(false);
  const [newPage,setNewPage] = useState(false);
  const [boolSwitch,setBoolSwitch] = useState(false);
  const [saved,setsaved] = useState(false);
  const [pile,setPile] = useState([]);
  const [pileReverse,setPileReverse] = useState([]);

  console.log(pile);
  document.title = "EDL n°" + numeroAppartement;

  useEffect(() => {
    if(location.pathname === "/edl/" + residence.nom.replaceAll(" ","%20") + "/" + residence.dossier.replaceAll(" ","%20") + "/edit/new") {
      if (verifModal) {
        setToggleModal(true);
        setVerifModal(false);
      }
      if (newPage) {
        setIdPage(uuid());
        setNumeroAppartement("");
        setTypeAppartement("");
        setBatiment("");
        setEtage("");
        setObservationsGenerales("");
        setObservationsGeneralesOpr("");
        setPieces([]);
        setsaved(false);
        setNewPage(false);
      }
    } else {
      const tempEdl = {...residence.edls[residence.edls.findIndex((edl) => edl.id === params.uid)]};
      if (!verif2 && tempEdl.id !== undefined && tempEdl.numeroAppartement !== undefined && tempEdl.typeAppartement !== undefined && tempEdl.numeroBat !== undefined && tempEdl.numeroEtage !== undefined && tempEdl.pieces !== null && tempEdl.observationsGenerales !== undefined) {
        setIdPage(tempEdl.id);
        setIdPageTemp(tempEdl.id);
        setNumeroAppartement(tempEdl.numeroAppartement);
        setTypeAppartement(tempEdl.typeAppartement);
        setBatiment(tempEdl.numeroBat);
        setEtage(tempEdl.numeroEtage);
        setObservationsGenerales(tempEdl.observationsGenerales);
        setObservationsGeneralesOpr(tempEdl.observationsGeneralesOpr);
        setPieces(tempEdl.pieces);
        setVerif2(true);
        setsaved(true);
      }
    }
    if (!verif) {
      axios.get('http://localhost:8080/JSON/' + residence.nom + '/' + residence.dossier).then(response => {
        setResidence(response.data);
        setVerif(true);
      }).catch(error => {
        console.log(error);
      });
    }
  },[location,residence,verif,toggleModal,verifModal,params,verif2,newPage]);

  useEffect(() => {
    if (saved) {
      const saveEdl = () => {
        axios.post('http://localhost:8080/JSON/' + residence.nom + '/' + residence.dossier + '/save',{
          id:idPage,
          numeroAppartement:numeroAppartement,
          typeAppartement:typeAppartement,
          numeroBat:batiment,
          numeroEtage:etage,
          pieces:pieces,
          observationsGenerales:observationsGenerales,
          observationsGeneralesOpr:observationsGeneralesOpr
        }).then(response => {
        }).catch(error => {
          console.log(error);
        });
        axios.get('http://localhost:8080/EXCEL/' + residence.nom + '/' + residence.dossier + '/OPR').then(response => {
        }).catch(error => {
          console.log(error);
        });
        axios.get('http://localhost:8080/EXCEL/' + residence.nom + '/' + residence.dossier + '/EDL').then(response => {
        }).catch(error => {
          console.log(error);
        });
        }
      const interval = setInterval(() => saveEdl(),2500);

      return () => clearInterval(interval);
    }
  },[saved,idPage,numeroAppartement,typeAppartement,batiment,etage,pieces,observationsGenerales,observationsGeneralesOpr,residence]);

  const manualSaveEdl = () => {
    axios.post('http://localhost:8080/JSON/' + residence.nom + '/' + residence.dossier + '/save',{
      id:idPage,
      numeroAppartement:numeroAppartement,
      typeAppartement:typeAppartement,
      numeroBat:batiment,
      numeroEtage:etage,
      pieces:pieces,
      observationsGenerales:observationsGenerales,
      observationsGeneralesOpr:observationsGeneralesOpr
    }).then(response => {
      navigate("/edl/" + residence.nom + "/" + residence.dossier + "/edit/" + idPage);
      window.location.reload();
    }).catch(error => {
      console.log(error);
    });
  }

  const handleDeletepiece = (nomPiece) => {
    const piecesCopy = [...pieces];
    const piecesCopyFiltered = piecesCopy.filter(piece => piece.nom !== nomPiece);
    setPieces(piecesCopyFiltered);
    setPile((previous) => [...previous,piecesCopy]);
  }

  const handleUpdatePieces = (updatedPieces) => {
    setPieces(updatedPieces);
  }

  const handleAddPiece = (nomPiece) => {
    const piecesCopy = [...pieces];
    setPile((previous) => [...previous,piecesCopy]);
    setPieces((prevPieces) => [...prevPieces,{id:uuid(),nom:nomPiece,elements:[]}]);
  }
  
  const handleAddElement = (nomPiece, nomElement) => {
    setPieces((prevPieces) =>
      prevPieces.map((piece) =>
        piece.nom === nomPiece
          ? { ...piece, elements: [...piece.elements, {id:uuid(),nomElement, etat: 0, observations:"", observationsOpr:"", faire: "",etatOpr:0}] }
          : piece
      )
    );
  };

  const onValidate = () => {
    setValidate(false);
    if (numeroAppartement === "" || etage === "" || batiment === "" || typeAppartement === "") {
      setToggleModalConfirmation(true);
    } else {
      setToggleModal(false);
    }
  }

  const closeModal = () => {
    setValidate(true);
    if (previousNumeroAppartement === "" || previousEtage === "" || previousBatiment === "" || previousTypeAppartement === "") {
      setToggleModalConfirmation(true);
    } else {
      setToggleModal(false);
      setBatiment(previousBatiment);
      setEtage(previousEtage);
      setNumeroAppartement(previousNumeroAppartement);
      setTypeAppartement(previousTypeAppartement);
    }
  }

  const onValidateConfirmation = () => {
    if (validate) {
      setBatiment(previousBatiment);
      setEtage(previousEtage);
      setNumeroAppartement(previousNumeroAppartement);
      setTypeAppartement(previousTypeAppartement);
    }
    setToggleModalConfirmation(false);
    setToggleModal(false);
    setValidate(false);
  }

  const openModalForm = () => {
    setPreviousBatiment(batiment);
    setPreviousEtage(etage);
    setPreviousNumeroAppartement(numeroAppartement);
    setPreviousTypeAppartement(typeAppartement);
    setToggleModal(true);
  }

  const changeObservationsGenerales = (observ) => {
    setObservationsGenerales(observ);
  }

  const changeObservationsGeneralesOpr = (observ) => {
    setObservationsGeneralesOpr(observ);
  }

  const deleteFiche = () => {
    if (location.pathname !== "/edl/" + residence.nom.replaceAll(" ","%20") + "/" + residence.dossier.replaceAll(" ","%20") + "/edit/new") {
      const edlIndex = residence.edls.findIndex((edl) => edl.id === params.uid);
      residence.edls.splice(edlIndex,1);
      axios.delete('http://localhost:8080/JSON/' + residence.nom + '/' + residence.dossier + '/' + idPage + '/delete').then(response => {
        navigate("/edl/" + residence.nom + "/" + residence.dossier + "/edit/new");
      }).catch(error => {
        console.log(error);
      });
      setBatiment("");
      setEtage("");
      setNumeroAppartement("");
      setTypeAppartement("");
    } else {
      window.location.reload();
    }
  }

  const openEdl = () => {
    setVerif(true);
    navigate("/edl/" + residence.nom + "/" + residence.dossier + "/edit/" + idPageTemp);
    window.location.reload();
    if (idPageTemp === "new") {
      setNewPage(true);
      setVerifModal(true);
    }
  }

  const switchEdlOpr = () => {
    boolSwitch ? setBoolSwitch(false) : setBoolSwitch(true);
  }

  const retour = () => {
    const piecesCopy = [...pieces];
    const popped = pile.pop();
    setPieces(popped);
    setPileReverse((previous) => [...previous,piecesCopy]);
  }

  const avance = () => {
    const piecesCopy = [...pieces];
    const popped = pileReverse.pop();
    setPieces(popped);
    setPile((previous) => [...previous,piecesCopy]);
  }

  return (
    <div className="main-container">
      <div className="menu-container">
        <img className="img-info" alt="Détails du logement" src="assets/info.png" onClick={() => openModalForm()} />
        <select className="select-fiche" value={idPageTemp} onChange={(e) => setIdPageTemp(e.target.value)}>
            <option value={"new"}>Nouvelle fiche d'état des lieux</option>
          {residence.edls.map((edl) => (
            <option key={edl.id} value={edl.id}>Bât {edl.numeroBat}, étage {edl.numeroEtage} N°{edl.numeroAppartement}, {edl.typeAppartement}</option>
          ))}
        </select>
        <button onClick={() => openEdl()} className="right-arrow-select">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
          </svg>
        </button>
        <img onClick={() => retour()} className="fleches-gch" src="assets/retour.png" alt="retour" />
        <Switch labelAvant={"EDL"} labelApres={"OPR"} clickSwitch={() => switchEdlOpr()} />
        <img onClick={() => avance()} className="fleches-drt" src="assets/retour.png" alt="avant" />
        {saved ? null : <img className="img-save" alt="Enregistrer" src="assets/save.png" onClick={() => manualSaveEdl()} />}
        <button id="button-fiche-delete" onClick={() => deleteFiche()}>
          <svg className="icon-trash" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
            <path className="trash-lid" fillRule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
            <path className="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
          </svg>
        </button>
      </div>
      <FormEdl handleAddPiece={handleAddPiece} pieces={pieces} handleAddNomElement={handleAddElement}/>
      <DecisionTravaux deletePiece={handleDeletepiece} edlOpr={boolSwitch} handleChangeObservationsGenerales={changeObservationsGenerales} handleChangeObservationsGeneralesOpr={changeObservationsGeneralesOpr} observationsGenerales={observationsGenerales} observationsGeneralesOpr={observationsGeneralesOpr} listePieces={pieces} handleUpdatePieces={handleUpdatePieces} />
      <Modal isOpen={toggleModal} onValidate={() => onValidate()} onClose={() => closeModal()}>
        <h3>Détails du logement</h3>
        <div className="inner-content-modal">
          <input placeholder="Appartement N°" type="text" value={numeroAppartement} onChange={(e) => setNumeroAppartement(e.target.value)}/>
          <input placeholder="Type" type="text" value={typeAppartement} onChange={(e) => setTypeAppartement(e.target.value)}/>
          <input placeholder="Bâtiment" type="text" value={batiment} onChange={(e) => setBatiment(e.target.value)}/>
          <input placeholder="Etage" type="text" value={etage} onChange={(e) => setEtage(e.target.value)}/>
        </div>
      </Modal>
      <Modal isOpen={toggleModalConfirmation} onValidate={() => onValidateConfirmation()} onClose={() => setToggleModalConfirmation(false)}>
        <h3>Etes-vous sûr(e) de vouloir laisser des champs vident ?</h3>
        <div className="inner-content-modal">
          <p>Laisser des champs vide pourrait amener à une confusion lors du choix de la fiche parmi toutes les autres fiches.</p>
        </div>
      </Modal>
    </div>
  );
}