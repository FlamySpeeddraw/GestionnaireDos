export const Contact = () => {
    return (
        <div className="contact-container">
            <div className="contact-deco">
                <img src="/assets/athemes full.png" alt="logo" />
            </div>
            <div className="retour-container">
                <p>Veuillez préciser (si il s'agit d'un bug) de l'effet du bug et comment le reproduir si possible.</p>
                <input className="retour-nom" type="text" placeholder="Nom et prénom" />
                <input className="retour-mail" type="text" placeholder="Mail" />
                <input className="retour-prob" type="text" placeholder="Nature du problème" />
                <button id="retour-button">Envoyer</button>
            </div>
        </div>
    )
}

/*
Voir avec Tom pour les dossiers partagés
Réorganiser les icones
Choisir la destination d'exportation excel
*/