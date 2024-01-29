import { useState } from "react"

export const Switch = ({labelAvant,clickSwitch,labelApres}) => {
    const [toggle,setToggle] = useState(false);

    const changeState = () => {
        if (toggle) {
            setToggle(false);
        } else {
            setToggle(true);
        }
        clickSwitch();
    }

    return (
        <div className="switch-content">
            {labelAvant}
            <div className={`switch-container ${toggle ? 'container-toggle' : '' }`} onClick={() => changeState()}>
                <div className={`switch-button ${toggle ? 'switch-right' : 'switch-left' }`}></div>
            </div>
            {labelApres}
        </div>
    )
}