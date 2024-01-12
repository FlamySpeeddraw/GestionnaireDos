import { useState } from "react";
import { HeaderEdl } from "../components/HeaderEdl";
import { DecisionTravaux } from "../components/DecisionTravaux";
import { FormEdl } from "../components/FormEdl";
import { v4 as uuid } from 'uuid';

export const Edl = () => {
  const [pieces,setPieces] = useState([]);
  //const [urlJson,setUrlJson] = useState("");
  console.log(pieces);

  const saveEdl = () => {
    const  jsonPieces = JSON.stringify(pieces,null,2);
    const blob = new Blob([jsonPieces], {type:"../datas/saveEdl"});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'test.json';
    a.click();
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
      <HeaderEdl />
      <FormEdl OnSave={saveEdl} onDelete={handleDeletepiece} handleAddPiece={handleAddPiece} pieces={pieces} handleAddNomElement={handleAddElement}/>
      <DecisionTravaux listePieces={pieces} handleUpdatePieces={handleUpdatePieces} />
    </div>
  );
}