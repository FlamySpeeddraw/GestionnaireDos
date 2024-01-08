import { useState } from "react";
import { HeaderEdl } from "../components/HeaderEdl";
import { DecisionTravaux } from "../components/DecisionTravaux";

export const Edl = () => {
  const handleAddPiece = (event) => {
    event.preventDefault();
    if (nomPiece !== "") {
      const piecesCopy = [...pieces];
      piecesCopy.push({key:piecesCopy.length+1,nom:nomPiece});
      setPieces(piecesCopy);
      setNomPiece("");
    }
  }

  const handleChangeNomPiece = (event) => {
    setNomPiece(event.target.value);
  }

  return (
    <div className="main-container">
      <div className="fiche-edl">
        <HeaderEdl />
        <DecisionTravaux />
      </div>
      <div className="menu-container">
        <form action="submit" className="piece-form" onSubmit={handleAddPiece}>
          <input value={nomPiece} type="text" placeholder="Nom de la pièce" onChange={handleChangeNomPiece} />
          <button>+</button>
        </form>
      </div>
    </div>
  );
}