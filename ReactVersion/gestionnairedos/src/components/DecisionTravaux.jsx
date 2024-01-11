import { PieceEdl } from "../components/PieceEdl";

export const DecisionTravaux = ({listePieces,handleUpdatePieces}) => {

  const updatePiece = (index,updatedElements) => {
    const updatedPieces = [...listePieces];
    const indexPiece = -updatedPieces.findIndex(object => object.id === index);
    updatedPieces[indexPiece].elements = updatedElements;
    handleUpdatePieces(updatedPieces);
  }

  const updateDeleteElement = (index,element) => {
    const piecesUpdated = [...listePieces];
    const indexPiece = piecesUpdated.findIndex(object => object.id === index);
    piecesUpdated[indexPiece].elements = piecesUpdated[indexPiece].elements.filter(filtre => filtre.id !== element);
    handleUpdatePieces(piecesUpdated);
  }

    return (
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
      </table>
    );
}