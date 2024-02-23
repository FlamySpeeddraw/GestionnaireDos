import { useEffect, useState } from "react";
import { DecisionTravaux } from "../components/Fiches Diag/DecisionTravaux";
import { FormDiag } from "../components/Fiches Diag/FormDiag";
import { v4 as uuid } from 'uuid';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Modal } from "../components/Modal";
import "./../styles/EDL/style.css";
import t1 from "../typologie/diag/t1.json";
import t2 from "../typologie/diag/t2.json";
import t3 from "../typologie/diag/t3.json";
import t4 from "../typologie/diag/t4.json";
import t5 from "../typologie/diag/t5.json";
import t6 from "../typologie/diag/t6.json";
import { deleteDiag, getClasseurDiag, updateDiag } from "../DataManager";
import { firebaseConfig } from "../firebase";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from "firebase/database";

export const Diag = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [toggleModal,setToggleModal] = useState(false);
  const [verif,setVerif] = useState(false);
  const [verif2,setVerif2] = useState(false);
  const [verifModal,setVerifModal] = useState(true);
  const [residence,setResidence] = useState({id:params.id,nom:"",dossier:"",prestation:"",diags:[]});
  const [observationsGenerales,setObservationsGenerales] = useState("");
  const [idPage,setIdPage] = useState(uuid());
  const [idPageTemp,setIdPageTemp] = useState(uuid());
  const [pieces,setPieces] = useState(t1.pieces);
  const [numeroAppartement,setNumeroAppartement] = useState("");
  const [typeAppartement,setTypeAppartement] = useState("T1");
  const [batiment,setBatiment] = useState("");
  const [etage,setEtage] = useState("");
  const [previousNumeroAppartement,setPreviousNumeroAppartement] = useState("");
  const [previousTypeAppartement,setPreviousTypeAppartement] = useState("");
  const [previousBatiment,setPreviousBatiment] = useState("");
  const [previousEtage,setPreviousEtage] = useState("");
  const [newPage,setNewPage] = useState(false);
  const [saved,setsaved] = useState(false);
  const [pile,setPile] = useState([]);
  const [pileReverse,setPileReverse] = useState([]);
  const [ConfirmerSupprimer,setConfimerSupprimer] = useState(false);
  const [errorMessage,setErrorMessage] = useState(false);
  const [message,setMessage] = useState("");

  const typologie = ["T1","T2","T3","T4","T5","T6"];
  initializeApp(firebaseConfig);
  const dbFirebase = getDatabase();

  document.title = "Diag n°" + numeroAppartement;

  useEffect(() => {
    const fetchData = async (id) => {
      const result = await getClasseurDiag(id);
      setResidence(result);
      setVerif(true);
    };

    if(location.pathname === "/diag/" + residence.id + "/edit/new") {
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
        setPieces([]);
        setsaved(false);
        setNewPage(false);
      }
    } else {
      const tempEdl = {...residence.diags[residence.diags.findIndex((diag) => diag.id === params.uid)]};
      if (!verif2 && tempEdl.id !== undefined && tempEdl.numeroAppartement !== undefined && tempEdl.typeAppartement !== undefined && tempEdl.numeroBat !== undefined && tempEdl.numeroEtage !== undefined && tempEdl.pieces !== null && tempEdl.observationsGenerales !== undefined) {
        setIdPage(tempEdl.id);
        setIdPageTemp(tempEdl.id);
        setNumeroAppartement(tempEdl.numeroAppartement);
        setTypeAppartement(tempEdl.typeAppartement);
        setBatiment(tempEdl.numeroBat);
        setEtage(tempEdl.numeroEtage);
        setObservationsGenerales(tempEdl.observationsGenerales);
        setPieces(tempEdl.pieces);
        setVerif2(true);
        setsaved(true);
      }
    }
    if (!verif) {
      fetchData(residence.id);
    }
  },[location,residence,verif,toggleModal,verifModal,params,verif2,newPage]);

  useEffect(() => {
    if (saved) {
      const saveDiag = () => {
        updateDiag(residence.id,idPage,numeroAppartement,typeAppartement,batiment,etage,pieces,observationsGenerales);
      }
      const interval = setInterval(() => saveDiag(),2500);

      return () => clearInterval(interval);
    }
  },[saved,idPage,numeroAppartement,typeAppartement,batiment,etage,pieces,observationsGenerales,residence]);

  const manualSaveDiag = () => {
    updateDiag(residence.id,idPage,numeroAppartement,typeAppartement,batiment,etage,pieces,observationsGenerales).then(response => {
      navigate("/diag/" + residence.id + "/edit/" + idPage);
      window.location.reload();
    });
  }

  const handleDeletepiece = (nomPiece) => {
    const piecesCopy = [...pieces];
    const piecesCopyFiltered = piecesCopy.filter(piece => piece.nom !== nomPiece);
    setPieces(piecesCopyFiltered);
    setPile((previous) => [...previous,piecesCopy]);
    setPileReverse([]);
  }

  const handleUpdatePieces = (updatedPieces) => {
    const piecesCopy = [...pieces];
    setPile((previous) => [...previous,piecesCopy]);
    setPileReverse([]);
    setPieces(updatedPieces);
  }

  const handleAddPiece = (nomPiece) => {
    const piecesCopy = [...pieces];
    setPile((previous) => [...previous,piecesCopy]);
    setPileReverse([]);
    setPieces((prevPieces) => [...prevPieces,{id:uuid(),nom:nomPiece,elements:[]}]);
  }
  
  const handleAddElement = (nomPiece, nomElement) => {
    const piecesCopy = [...pieces];
    setPile((previous) => [...previous,piecesCopy]);
    setPileReverse([]);
    setPieces((prevPieces) =>
      prevPieces.map((piece) =>
        piece.nom === nomPiece
          ? { ...piece, elements: [...piece.elements, {id:uuid(),nomElement, dimensions:"", type:"", etat:0, observations:"", photos: ""}] }
          : piece
      )
    );
  };

  const onValidate = () => {
    if (numeroAppartement === "" || etage === "" || batiment === "" || typeAppartement === "") {
      setMessage("Veuillez remplir tous les champs");
      setErrorMessage(true);
      setTimeout(() => {
        setMessage("");
        setErrorMessage(false);
      },2000);
    } else {
      setToggleModal(false);
    }
  }

  const closeModal = () => {
    if (previousNumeroAppartement === "" || previousEtage === "" || previousBatiment === "" || previousTypeAppartement === "") {
      navigate("/diag");
    } else {
      setToggleModal(false);
      setBatiment(previousBatiment);
      setEtage(previousEtage);
      setNumeroAppartement(previousNumeroAppartement);
      setTypeAppartement(previousTypeAppartement);
    }
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

  const deleteFiche = () => {
    if (location.pathname !== "/diag/" + residence.id + "/edit/new") {
      navigate("/diag/" + residence.id + "/edit/new");
      deleteDiag(residence.id,idPage);
      setBatiment("");
      setEtage("");
      setNumeroAppartement("");
      setTypeAppartement("");
      setConfimerSupprimer(false);
    } else {
      window.location.reload();
    }
  }

  const openDiag = () => {
    setVerif(true);
    navigate("/diag/" + residence.id + "/edit/" + idPageTemp);
    window.location.reload();
    if (idPageTemp === "new") {
      setNewPage(true);
      setVerifModal(true);
    }
  }

  const retour = () => {
    if (pile.length > 0) {
      const piecesCopy = [...pieces];
      const popped = pile.pop();
      setPieces(popped);
      setPileReverse((previous) => [...previous,piecesCopy]);
    }
  }

  const avance = () => {
    if (pileReverse.length > 0) {
      const piecesCopy = [...pieces];
      const popped = pileReverse.pop();
      setPieces(popped);
      setPile((previous) => [...previous,piecesCopy]);
    }
  }

  const changeType = (val) => {
    const piecesCopy = [...pieces];
    setPile((previous) => [...previous,piecesCopy]);
    setTypeAppartement(val);
    switch (val.toLowerCase()) {
      case "t1":
        setPieces(t1.pieces);
        break;
      case "t2":
        setPieces(t2.pieces);        
        break;
      case "t3":
        setPieces(t3.pieces);
        break;
      case "t4":
        setPieces(t4.pieces);
        break;
      case "t5":
        setPieces(t5.pieces);
        break;
      case "t6":
        setPieces(t6.pieces);
        break;
      default:
        break;
    }
  }

  const synchroniser = () => {
    set(ref(dbFirebase,'fiches diag/' + residence.id), {residence});
  }

  return (
    <div className="main-container">
      <div className="menu-container">
        <img className="img-info" alt="Détails du logement" src="assets/info.png" onClick={() => openModalForm()} />
        <select className="select-fiche" value={idPageTemp} onChange={(e) => setIdPageTemp(e.target.value)}>
            <option value={"new"}>Nouvelle fiche de diagnostique</option>
          {residence.diags.map((diag) => (
            <option key={diag.id} value={diag.id}>Bât {diag.numeroBat}, étage {diag.numeroEtage} N°{diag.numeroAppartement}, {diag.typeAppartement}</option>
          ))}
        </select>
        <button onClick={() => openDiag()} className="right-arrow-select">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
          </svg>
        </button>
        <img onClick={() => retour()} className="fleches-gch" src="assets/retour.png" alt="retour" />
        <img onClick={() => avance()} className="fleches-drt" src="assets/retour.png" alt="avant" />
        {saved ? <img onClick={() => synchroniser()} className="internet" src="assets/internet.png" alt="synchronisation" /> : <img className="img-save" alt="Enregistrer" src="assets/save.png" onClick={() => manualSaveDiag()} />}
        <button id="button-fiche-delete" onClick={() => setConfimerSupprimer(true)}>
          <svg className="icon-trash" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
            <path className="trash-lid" fillRule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
            <path className="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
          </svg>
        </button>
      </div>
      {saved ? null : <h1 className="remember">N'oubliez pas de sauvegarder ce fichier !</h1>}
      <FormDiag handleAddPiece={handleAddPiece} pieces={pieces} handleAddNomElement={handleAddElement}/>
      <DecisionTravaux deletePiece={handleDeletepiece} handleChangeObservationsGenerales={changeObservationsGenerales} observationsGenerales={observationsGenerales} listePieces={pieces} handleUpdatePieces={handleUpdatePieces} />
      <Modal isOpen={toggleModal} onValidate={() => onValidate()} onClose={() => closeModal()}>
        <h3>Détails du logement</h3>
        <div className="inner-content-modal">
          <input placeholder="Appartement N°" type="text" value={numeroAppartement} onChange={(e) => setNumeroAppartement(e.target.value)}/>
          <select className="select-type" value={typeAppartement} onChange={(e) => {changeType(e.target.value)}}>
                    {typologie.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
          </select>
          <input placeholder="Bâtiment" type="text" value={batiment} onChange={(e) => setBatiment(e.target.value)}/>
          <input placeholder="Etage" type="text" value={etage} onChange={(e) => setEtage(e.target.value)}/>
          {errorMessage ? <p style={{color:'red'}} className="error-message error-container">{message}</p> : <p className="error-container"></p>}
        </div>
      </Modal>
      <Modal isOpen={ConfirmerSupprimer} onValidate={() => deleteFiche()} onClose={() => setConfimerSupprimer(false)}>
        <h3>Êtes-vous sûr(e) de vouloir supprimer cette fiche ?</h3>
        <div className="inner-content-modal">
          <p>Il vous sera impossible de récupérer cette fiche...</p>
        </div>
      </Modal>
    </div>
  );
}