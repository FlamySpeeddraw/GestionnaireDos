import { ElementPiece } from "./ElementPiece";

export const PieceEdl = ({infosPiece,index,onUpdatedPiece,onDeleteElement}) => {
    const handleUpdateElement = (element,updatedElement,observations) => {
        const updatedElements = [...infosPiece.elements];
        updatedElements[infosPiece.elements.indexOf(element)] = updatedElement;
        onUpdatedPiece(index,updatedElements,observations);
    }

    const handleDeleteElement = (element) => {
        onDeleteElement(index,element)
    }

    return (
        <>
            <tr className="nom-piece">
                <td className="td-titre-piece" colSpan={5}>{infosPiece.nom}</td>
                <td className="td-observations-piece">Observations en {infosPiece.nom.toLowerCase()} :</td>
            </tr>
            {infosPiece.elements.map((element,index) => (
                <ElementPiece observationsPiece={infosPiece.observations} lengthElements={infosPiece.elements.length} index={index} key={element.id} infosElement={element} onUpdateElement={handleUpdateElement} deleteElement={handleDeleteElement} />
            ))}
            <tr><td height={15} colSpan={6}></td></tr>
        </>
    );
}