import { useState } from "react";
import { PieceEdl } from "../components/PieceEdl";

export const DecisionTravaux = () => {
    const [nomPiece,setNomPiece] = useState("");
    const [pieces,setPieces] = useState([]);

    return (
        <ul className="liste-pieces">
          {pieces.map((piece) => (
            <PieceEdl nom={piece.nom} key={piece.key} />
          ))}
        </ul>
    );
}