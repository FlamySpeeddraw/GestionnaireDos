import { useEffect, useState } from "react";
import { PieceEdl, PieceOpr } from "./PieceEdl";
import './../../styles/EDL/tableau.css';

export const DecisionTravaux = ({listePieces,handleUpdatePieces,observationsGenerales,handleChangeObservationsGenerales,edlOpr}) => {
  const [observationsGenaralesArea,setObservationsGeneralesArea] = useState(observationsGenerales);
  const [verif,setVerif] = useState(false);

  useEffect(() => {
    setObservationsGeneralesArea(observationsGenerales);
    if (verif) {
      handleChangeObservationsGenerales(observationsGenaralesArea);
      setVerif(false);
    }
  },[verif,observationsGenaralesArea,handleChangeObservationsGenerales,observationsGenerales]);

  const updatePiece = (index,updatedElements) => {
    const updatedPieces = [...listePieces];
    const indexPiece = updatedPieces.findIndex(object => object.id === index);
    updatedPieces[indexPiece].elements = updatedElements;
    handleUpdatePieces(updatedPieces);
  }

  const updateOpr = (index,updatedElements) => {
    const updatedPieces = [...listePieces];
    const indexPiece = updatedPieces.findIndex(object => object.id === index);
    updatedPieces[indexPiece].elements = updatedElements;
    handleUpdatePieces(updatedPieces);
  }

  const updateDeleteElement = (index,element) => {
    const piecesUpdated = [...listePieces];
    const indexPiece = piecesUpdated.findIndex(object => object.id === index);
    piecesUpdated[indexPiece].elements = piecesUpdated[indexPiece].elements.filter(filtre => filtre.id !== element);
    handleUpdatePieces(piecesUpdated);
  }

  const handleObservationsGenerales = (e) => {
    setObservationsGeneralesArea(e.target.value);
    setVerif(true);
  }

    return edlOpr ? (
      <table className="table-travaux">
        <thead>
          <tr className="opr-head">
            <td className="td-designation">Désignations</td>
            <td className="td-faire" rowSpan={2}>A faire ?</td>
            <td id="sans-reserve" className="td-prestation">Sans réserve</td>
            <td id="reserve" className="td-prestation">Avec réserve(s)</td>
            <td id="effectuee" className="td-prestation">Prestation non effectuée</td>
            <td id="concerne" className="td-prestation">Non concerné</td>
            <td className="opr-observations">Observations</td>
          </tr>
        </thead>
        <tbody>
          {listePieces.map((piece) => (
            <PieceOpr key={piece.id} infosPiece={piece} onUpdatedOpr={updateOpr} onDeleteElement={updateDeleteElement} index={piece.id} />
          ))}
        </tbody>
        <tfoot>
          <tr className="nom-piece"><td colSpan={7}>Observations générales</td></tr>
          <tr><td className="footer-textarea-container" colSpan={7}><textarea value={observationsGenaralesArea} onChange={handleObservationsGenerales}/></td></tr>
        </tfoot>
      </table>
    ) : (
      <table className="table-travaux">
        <thead>
          <tr className="decision-head">
            <td className="td-designation" rowSpan={2}>Désignations</td>
            <td className="td-etat" colSpan={3}>Etat</td>
            <td className="td-faire" rowSpan={2}>A faire ?</td>
            <td rowSpan={2}>Observations</td>
          </tr>
          <tr className="tr-etat">
            <td>+</td>
            <td>=</td>
            <td>-</td>
          </tr>
        </thead>
        <tbody>
          {listePieces.map((piece) => (
            <PieceEdl key={piece.id} infosPiece={piece} index={piece.id} onUpdatedPiece={updatePiece} onDeleteElement={updateDeleteElement} />
          ))}
        </tbody>
        <tfoot>
          <tr className="nom-piece"><td colSpan={6}>Observations générales</td></tr>
          <tr><td className="footer-textarea-container" colSpan={6}><textarea value={observationsGenaralesArea} onChange={handleObservationsGenerales}/></td></tr>
        </tfoot>
      </table>
    );
}