import { useState } from "react";

export const TrEdl = ({titre}) => {
    const [statePiece, setStatePiece] = useState(["","",""]);

    const handleClickState = (index) => {
        const newStatePiece = ["","",""];
        newStatePiece[index] = "X";
        setStatePiece(newStatePiece);

    }

    return (       
        <tr>
          <td>{titre}</td><td onClick={() => handleClickState(0)}>{statePiece[0]}</td><td onClick={() => handleClickState(1)}>{statePiece[1]}</td><td onClick={() => handleClickState(2)}>{statePiece[2]}</td><td><input type="text" /></td>
        </tr>
    );
}