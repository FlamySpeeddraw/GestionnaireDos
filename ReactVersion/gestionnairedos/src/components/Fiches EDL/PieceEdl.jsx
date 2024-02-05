import { ElementOpr, ElementPiece } from "./ElementPiece";

export const PieceEdl = ({onDeletePiece,infosPiece,index,onUpdatedPiece,onDeleteElement}) => {
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
                <td className="delete-piece">
                    <button onClick={() => onDeletePiece(infosPiece.nom)}>
                        <svg id="delete-piece" className="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
                            <path fill="rgb(36, 159, 207)" className="trash-lid" fillRule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
                            <path fill="rgb(36, 159, 207)" className="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
                        </svg>
                    </button>
                </td>
            </tr>
            {infosPiece.elements.map((element) => (
                <ElementPiece observationsPiece={infosPiece.observations} key={element.id} infosElement={element} onUpdateElement={handleUpdateElement} deleteElement={handleDeleteElement} />
            ))}
            <tr><td className="separation" height={15} colSpan={6}></td></tr>
        </>
    );
}

export const PieceOpr = ({onDeletePiece,infosPiece,onUpdatedOpr,onDeleteElement,index}) => {
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
                <td className="delete-piece">
                    <button onClick={() => onDeletePiece(infosPiece.nom)}>
                        <svg id="delete-piece" className="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
                            <path fill="rgb(36, 159, 207)" className="trash-lid" fillRule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
                            <path fill="rgb(36, 159, 207)" className="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
                        </svg>
                    </button>
                </td>
            </tr>
            {infosPiece.elements.map((element,index) => (
                <ElementOpr observationsPieceOpr={infosPiece.observationsOpr} key={element.id} infosElement={element} onUpdateOpr={handleUpdateOpr} deleteElement={handleDeleteElement} />
            ))}
            <tr><td className="separation" height={15} colSpan={7}></td></tr>
        </>
    )
}