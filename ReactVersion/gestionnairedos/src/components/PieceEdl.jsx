import { ElementPiece } from "./ElementPiece";

export const PieceEdl = ({infosPiece,index,onUpdatedPiece,onDeleteElement}) => {

    const handleUpdateElement = (element,updatedElement) => {
        const updatedElements = [...infosPiece.elements];
        updatedElements[infosPiece.elements.indexOf(element)] = updatedElement;
        onUpdatedPiece(index,updatedElements);
    }

    const handleDeleteElement = (element) => {
        onDeleteElement(index,element)
    }

    return (
        <>
            <tr className="nom-piece">
                <td colSpan={5}>{infosPiece.nom}</td>
                <td>Observations en {infosPiece.nom.toLowerCase()} :</td>
            </tr>
            {infosPiece.elements.map((element) => (
                <ElementPiece key={element.id} infosElement={element} onUpdateElement={handleUpdateElement} deleteElement={handleDeleteElement} />
            ))}
            <tr><td height={15} colSpan={6}></td></tr>
        </>
    );
}