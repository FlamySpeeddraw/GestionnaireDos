import { Switch } from "../components/Switch"

export const Accueil = () => {
    return (
        <div>
            <h2>Comment utiliser les fiches EDL ?</h2>
            <ul>
                <li><p>
                        En cliquant sur "EDL" dans le menu, vous arriverez sur une page qui contient une liste de résidences,
                        une résidence correspond à un nom de résidence et de dossier, les deux réunis doivent être unique. Le nom de dossier
                        est un nom que vous définissez comme vous voulez, par exemple le corps d'état.
                        Le tout peut ainsi ressembler à : Le Cristal Ravalement.
                    </p>
                    <br />
                    <p>
                        Pour ajouter une résidence rien de plus simple, appuyez simplement sur ajouter une nouvelle résidence (juste en dessous
                        du menu)
                    </p>
                </li>
            </ul>
        </div>
    )
}