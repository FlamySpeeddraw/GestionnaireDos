import { ElementOpr, ElementPiece } from "./ElementPiece";

export const PieceEdl = ({infosPiece,index,onUpdatedPiece,onDeleteElement}) => {
    const handleUpdateElement = (element,updatedElement) => {
        const updatedElements = [...infosPiece.elements];
        updatedElements[infosPiece.elements.indexOf(element)].id = updatedElement.id;
        updatedElements[infosPiece.elements.indexOf(element)].nomElement = updatedElement.nomElement;
        updatedElements[infosPiece.elements.indexOf(element)].etat = updatedElement.etat;
        updatedElements[infosPiece.elements.indexOf(element)].faire = updatedElement.faire;
        updatedElements[infosPiece.elements.indexOf(element)].observations = updatedElement.observations;
        onUpdatedPiece(index,updatedElements);
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
            {infosPiece.elements.map((element) => (
                <ElementPiece observationsPiece={infosPiece.observations} key={element.id} infosElement={element} onUpdateElement={handleUpdateElement} deleteElement={handleDeleteElement} />
            ))}
            <tr><td className="separation" height={15} colSpan={6}></td></tr>
        </>
    );
}

export const PieceOpr = ({infosPiece,onUpdatedOpr,onDeleteElement,index}) => {
    const handleUpdateOpr = (element,updatedElement) => {
        const updatedElements = [...infosPiece.elements];
        updatedElements[infosPiece.elements.indexOf(element)].etatOpr = updatedElement.etatOpr;
        updatedElements[infosPiece.elements.indexOf(element)].nomElement = updatedElement.nomElement;
        updatedElements[infosPiece.elements.indexOf(element)].observationsOpr = updatedElement.observationsOpr;
        onUpdatedOpr(index,updatedElements);
    }

    const handleDeleteElement = (element) => {
        onDeleteElement(index,element)
    }
    return (
        <>
            <tr className="nom-piece">
                <td className="td-titre-piece" colSpan={6}>{infosPiece.nom}</td>
                <td className="td-observations-piece">Observations MOE en {infosPiece.nom.toLowerCase()} :</td>
            </tr>
            {infosPiece.elements.map((element,index) => (
                <ElementOpr observationsPieceOpr={infosPiece.observationsOpr} key={element.id} infosElement={element} onUpdateOpr={handleUpdateOpr} deleteElement={handleDeleteElement} />
            ))}
            <tr><td className="separation" height={15} colSpan={7}></td></tr>
        </>
    )
}