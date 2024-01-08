import { useState } from "react";
import { TrEdl } from "../components/TrEdl";

export const PieceEdl = ({nom}) => {
    const [listeTrEdl,setListeTrEdl] = useState([]);
    const [titreTr,setTitreTr] = useState("");

    const handleAddTr = (event) => {
        event.preventDefault();
        if (titreTr !== "") {
          const listeTrEdlCopy = [...listeTrEdl];
          listeTrEdlCopy.push({key:listeTrEdlCopy.length+1,titre:titreTr,data:["","",""]});
          setListeTrEdl(listeTrEdlCopy);
          setTitreTr("");
        }
    }
    
      
    
    const handleChangeAgent = (event) => {
        setTitreTr(event.target.value);
    }

    return (
        <li>
            <p>{nom}</p>
            <table className="travaux-container">
                <tbody>
                    {listeTrEdl.map((trEdl) => (
                        <TrEdl titre={trEdl.titre} key={trEdl.key} />
                    ))}
                </tbody>
            </table>
            <form action="submit" onSubmit={handleAddTr} className="form-addtr">
                <input value={titreTr} type="text" placeholder="Titre de la ligne" onChange={handleChangeAgent}/>
                <button>+</button>
            </form>
        </li>
    );
}