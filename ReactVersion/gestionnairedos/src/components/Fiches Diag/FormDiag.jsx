import { useState } from "react";
import "./../../styles/EDL/form.css";

export const FormDiag = ({handleAddNomElement,handleAddPiece,pieces}) => {
    const [nomPiece,setNomPiece] = useState("");
    const [nomElement,setNomElement] = useState("");
    const [nomPieceSelected,setNomPieceSelected] = useState("");
    const nomPieces = [{id:"",nom:"Choisir une pièce"}].concat(pieces.map(objetPiece => ({id:objetPiece.id,nom:objetPiece.nom})));

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