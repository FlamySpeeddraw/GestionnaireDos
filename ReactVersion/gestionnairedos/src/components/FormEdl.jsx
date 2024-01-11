import { useState } from "react";

export const FormEdl = ({handleAddNomElement,handleAddPiece,pieces}) => {
    const [nomPiece,setNomPiece] = useState("");
    const [nomElement,setNomElement] = useState("");
    const [nomPieceSelected,setNomPieceSelected] = useState("");
    const nomPieces = pieces.map(objetPiece => ({id:objetPiece.id,nom:objetPiece.nom}));

    const handleSubmitAddPiece = (event) => {
        event.preventDefault();
        if (nomPieces.findIndex(object => object.nom === nomPiece) !== -1) {
        } else {
            handleAddPiece(nomPiece);
            setNomPiece("");
            setNomPieceSelected(nomPiece);
        }
    }

    const handleSubmitAddElement = (event) => {
        event.preventDefault();
        if (pieces[pieces.findIndex(object => object.nom === nomPieceSelected)].elements.findIndex(object => object.nomElement === nomElement) !== -1) {
        } else {
            handleAddNomElement(nomPieceSelected,nomElement);
            setNomElement("");
        }
    }

    return (
        <div className="form-container">
            <form className="form-addpiece" action="submit" onSubmit={handleSubmitAddPiece}>
                <label>
                    Nom de la pièce<br/>
                    <input type="text" value={nomPiece} onChange={(e) => {setNomPiece(e.target.value)}} />
                </label>
                <button>+</button>
            </form>
            <select value={nomPieceSelected} onChange={(e) => {setNomPieceSelected(e.target.value)}}>
                {nomPieces.map((objetPiece) => (
    		        <option key={objetPiece.id} value={objetPiece.nom}>{objetPiece.nom}</option>
                ))}
   		    </select>
            <form className="form-addElement" action="submit" onSubmit={handleSubmitAddElement}>
                <label>
                    Nom de l'élèment<br/>
                    <input type="text" value={nomElement} onChange={(e) => {setNomElement(e.target.value)}} />
                </label>
                <button>+</button> 
            </form>
        </div>
    );
}