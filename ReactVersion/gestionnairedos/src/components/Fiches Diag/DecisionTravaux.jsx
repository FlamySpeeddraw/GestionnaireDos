import { useEffect, useState } from "react";
import { PieceDiag } from "./PieceDiag";
import './../../styles/EDL/tableau.css';

export const DecisionTravaux = ({deletePiece,listePieces,handleUpdatePieces,observationsGenerales,handleChangeObservationsGenerales}) => {
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

    return (
      <table className="table-travaux">
        <thead>
          <tr className="decision-head">
            <td className="td-designation" rowSpan={2}>Désignations</td>
            <td className="td-dimensions" rowSpan={2}>Dimensions</td>
            <td className="td-type" rowSpan={2}>Type / Composition</td>
            <td className="td-etat" colSpan={3}>Etat</td>
            <td className="td-observations" rowSpan={2}>Observations</td>
            <td className="td-photos" rowSpan={2}>Photos</td>
          </tr>
          <tr className="tr-etat">
            <td>BE</td>
            <td>EU</td>
            <td>ME</td>
          </tr>
        </thead>
        <tbody>
          {listePieces.map((piece) => (
            <PieceDiag onDeletePiece={deletePiece} key={piece.id} infosPiece={piece} index={piece.id} onUpdatedPiece={updatePiece} onDeleteElement={updateDeleteElement} />
          ))}
        </tbody>
        <tfoot>
          <tr className="nom-piece"><td className="td-observations-gene" colSpan={7}>Observations générales</td></tr>
          <tr><td className="footer-textarea-container" colSpan={7}><textarea value={observationsGenaralesArea} onChange={handleObservationsGenerales}/></td></tr>
        </tfoot>
      </table>
    );
}