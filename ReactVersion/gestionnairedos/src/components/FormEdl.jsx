import { useState } from "react";

export const FormEdl = ({handleAddNomElement,handleAddPiece,pieces,onDelete,OnSave}) => {
    const [nomPiece,setNomPiece] = useState("");
    const [nomElement,setNomElement] = useState("");
    const [nomPieceSelected,setNomPieceSelected] = useState("");
    const nomPieces = [{id:"",nom:"Choisir une pièce"}].concat(pieces.map(objetPiece => ({id:objetPiece.id,nom:objetPiece.nom})));
    
    const deletePiece = () => {
        setNomPieceSelected("");
        onDelete(nomPieceSelected);
    }

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
        if (nomPieceSelected === "Choisir une pièce" || pieces[pieces.findIndex(object => object.nom === nomPieceSelected)].elements.findIndex(object => object.nomElement === nomElement) !== -1) {
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
            <div>
                <select value={nomPieceSelected} onChange={(e) => {setNomPieceSelected(e.target.value)}}>
                    {nomPieces.map((objetPiece) => (
                        <option key={objetPiece.id} value={objetPiece.nom}>{objetPiece.nom}</option>
                    ))}
                </select>
                <button className="button-delete" onClick={deletePiece}>
                    <svg className="icon-trash" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 40" width="40" height="40">
                        <path className="trash-lid" fillRule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
                        <path className="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
                    </svg>
                </button>
            </div>
            <form className="form-addElement" action="submit" onSubmit={handleSubmitAddElement}>
                <label>
                    Nom de l'élèment<br/>
                    <input type="text" value={nomElement} onChange={(e) => {setNomElement(e.target.value)}} />
                </label>
                <button>+</button> 
            </form>
            <button onClick={OnSave}>Enregistrer la fiche</button>
        </div>
    );
}