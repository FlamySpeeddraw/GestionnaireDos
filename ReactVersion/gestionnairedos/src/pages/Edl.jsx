import { useEffect, useState } from "react";
import { DecisionTravaux } from "../components/Fiches EDL/DecisionTravaux";
import { FormEdl } from "../components/Fiches EDL/FormEdl";
import { v4 as uuid } from 'uuid';
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HamburgerEdl } from "../components/Fiches EDL/HamburgerEdl";
import "./../styles/EDL/style.css"

export const Edl = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [residence,setResidence] = useState({nom:"nouvelleResidence",dossier:"nouveauDossier",date:"",edls:[]});
  const [observationsGenerales,setObservationsGenerales] = useState("");
  const [idPage,setIdPage] = useState(uuid());
  const [pieces,setPieces] = useState([]);
  const [headerInfos,setHeaderInfos] = useState({numeroAppartement:"",typeAppartement:"",numeroBat:"",numeroEtage:""});

  useEffect(() => {
    if(location.pathname !== "/edl/nouvelleResidence/edit/new") {
      axios.get('http://localhost:8080/JSON/' + residence.nom + '/edls/' + params.uid).then(response => {
        setObservationsGenerales(response.data.observationsGenerales);
        setIdPage(response.data.id);
        setPieces(response.data.pieces);
        setHeaderInfos({numeroAppartement:response.data.numeroAppartement,typeAppartement:response.data.typeAppartement,numeroBat:response.data.numeroBat,numeroEtage:response.data.numeroEtage});
      }).catch(error => {
        console.log(error);
      });
    }
  },[location,params,residence]);

  const saveEdl = () => {
    axios.post('http://localhost:8080/JSON/' + residence.nom + '/save',{
      id:idPage,
      numeroAppartement:headerInfos.numeroAppartement,
      typeAppartement:headerInfos.typeAppartement,
      numeroBat:headerInfos.numeroBat,
      numeroEtage:headerInfos.numeroEtage,
      pieces,
      observationsGenerales:observationsGenerales
    }).then(response => {
      navigate("/edl/" + residence.nom + "/edit/" + idPage);
    }).catch(error => {
      console.log(error);
    });
  }

  const updateHeaderInfos = (updatedHeaderInfos) => {
    setHeaderInfos(updatedHeaderInfos);
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

  return (
    <div className="main-container">
      <HamburgerEdl nomResidence={residence.nom} date={residence.date} headerInfos={headerInfos} updateHeaderInfos={updateHeaderInfos}/>
      <FormEdl OnSave={saveEdl} onDelete={handleDeletepiece} handleAddPiece={handleAddPiece} pieces={pieces} handleAddNomElement={handleAddElement}/>
      <DecisionTravaux observationsGenerales={observationsGenerales} listePieces={pieces} handleUpdatePieces={handleUpdatePieces} />
    </div>
  );
}

//Regrouper les EDL par résidences, ajouter les opr, refaire le style, optimiser.