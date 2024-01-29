import { useState } from "react";
import "./../../styles/EDL/form.css";

export const FormEdl = ({handleAddNomElement,handleAddPiece,pieces,onDelete}) => {
    const [nomPiece,setNomPiece] = useState("");
    const [nomElement,setNomElement] = useState("");
    const [nomPieceSelected,setNomPieceSelected] = useState("");
    const nomPieces = [{id:"",nom:"Choisir une pièce"}].concat(pieces.map(objetPiece => ({id:objetPiece.id,nom:objetPiece.nom})));
    
    const deletePiece = () => {
        onDelete(nomPieceSelected);
        setNomPieceSelected("Choisir une pièce");
    }

    const handleSubmitAddPiece = (event) => {
        event.preventDefault();
        if (nomPieces.findIndex(object => object.nom === nomPiece) !== -1 || nomPiece === "") {
        } else {
            handleAddPiece(nomPiece);
            setNomPiece("");
            setNomPieceSelected(nomPiece);
        }
    }

    const handleSubmitAddElement = (event) => {
        event.preventDefault();
        if (nomPieceSelected === "" || nomPieceSelected === "Choisir une pièce" || nomElement === "" || pieces[pieces.findIndex(object => object.nom === nomPieceSelected)].elements.findIndex(object => object.nomElement === nomElement) !== -1) {
        } else {
            handleAddNomElement(nomPieceSelected,nomElement);
            setNomElement("");
        }
    }

    return (
        <div className="form-container">
            <form className="form-addpiece" action="submit" onSubmit={handleSubmitAddPiece}>
                <div id="form-margin-div" className="contain-input">
                    <input placeholder="Nom de la pièce" type="text" value={nomPiece} onChange={(e) => {setNomPiece(e.target.value)}} />
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
                        </svg>
                    </button>
                </div>
            </form>
            <div id="form-margin-div">
                <select className="select-piece" value={nomPieceSelected} onChange={(e) => {setNomPieceSelected(e.target.value)}}>
                    {nomPieces.map((objetPiece) => (
                        <option key={objetPiece.id} value={objetPiece.nom}>{objetPiece.nom}</option>
                    ))}
                </select>
                <button className="button-delete" onClick={deletePiece}>
                    <svg className="icon-trash" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                        <path className="trash-lid" fillRule="evenodd" d="M6 15l4 0 0-3 8 0 0 3 4 0 0 2 -16 0zM12 14l4 0 0 1 -4 0z" />
                        <path className="trash-can" d="M8 17h2v9h8v-9h2v9a2 2 0 0 1-2 2h-8a2 2 0 0 1-2-2z" />
                    </svg>
                </button>
            </div>
            <form className="form-addelement" action="submit" onSubmit={handleSubmitAddElement}>
                <div id="form-margin-div" className="contain-input">
                    <input placeholder="Nom de l'élèment" type="text" value={nomElement} onChange={(e) => {setNomElement(e.target.value)}} />
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
}