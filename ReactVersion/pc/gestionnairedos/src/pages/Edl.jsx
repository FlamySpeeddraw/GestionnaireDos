import { useEffect, useState } from "react";
import { DecisionTravaux } from "../components/Fiches EDL/DecisionTravaux";
import { FormEdl } from "../components/Fiches EDL/FormEdl";
import { v4 as uuid } from 'uuid';
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Modal } from "../components/Modal";
import "./../styles/EDL/style.css"
import { Switch } from "../components/Switch";
import t1 from "../typologie/t1.json";
import t2 from "../typologie/t2.json";
import t3 from "../typologie/t3.json";
import t4 from "../typologie/t4.json";
import t5 from "../typologie/t5.json";
import t6 from "../typologie/t6.json";

export const Edl = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [toggleModal,setToggleModal] = useState(false);
  const [verif,setVerif] = useState(false);
  const [verif2,setVerif2] = useState(false);
  const [verifModal,setVerifModal] = useState(true);
  const [residence,setResidence] = useState({nom:params.nomResidence,dossier:params.nomDossier,edls:[]});
  const [observationsGenerales,setObservationsGenerales] = useState("");
  const [observationsGeneralesOpr,setObservationsGeneralesOpr] = useState("");
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
  const [boolSwitch,setBoolSwitch] = useState(false);
  const [saved,setsaved] = useState(false);
  const [pile,setPile] = useState([]);
  const [pileReverse,setPileReverse] = useState([]);
  const [ConfirmerSupprimer,setConfimerSupprimer] = useState(false);
  const [errorMessage,setErrorMessage] = useState(false);
  const [message,setMessage] = useState("");

  const typologie = ["T1","T2","T3","T4","T5","T6"];

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
          ? { ...piece, elements: [...piece.elements, {id:uuid(),nomElement, etat: 0, observations:"", observationsOpr:"", faire: "",etatOpr:0}] }
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
      navigate("/edl");
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
        <button id="button-fiche-delete" onClick={() => setConfimerSupprimer(true)}>
          <svg className="icon-trash" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
            <path className="trash-lid" fillRule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
            <path className="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
          </svg>
        </button>
      </div>
      {saved ? null : <h1 className="remember">N'oubliez pas de sauvegarder ce fichier !</h1>}
      <FormEdl handleAddPiece={handleAddPiece} pieces={pieces} handleAddNomElement={handleAddElement}/>
      <DecisionTravaux deletePiece={handleDeletepiece} edlOpr={boolSwitch} handleChangeObservationsGenerales={changeObservationsGenerales} handleChangeObservationsGeneralesOpr={changeObservationsGeneralesOpr} observationsGenerales={observationsGenerales} observationsGeneralesOpr={observationsGeneralesOpr} listePieces={pieces} handleUpdatePieces={handleUpdatePieces} />
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