import { useState } from "react";
import { HeaderEdl } from "../components/HeaderEdl";
import { DecisionTravaux } from "../components/DecisionTravaux";
import { FormEdl } from "../components/FormEdl";
import { v4 as uuid } from 'uuid';

export const Edl = () => {
  const [pieces,setPieces] = useState([]);
  //const [urlJson,setUrlJson] = useState("");

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
      <HeaderEdl />
      <FormEdl handleAddPiece={handleAddPiece} pieces={pieces} handleAddNomElement={handleAddElement}/>
      <DecisionTravaux listePieces={pieces} handleUpdatePieces={handleUpdatePieces} />
    </div>
  );
}