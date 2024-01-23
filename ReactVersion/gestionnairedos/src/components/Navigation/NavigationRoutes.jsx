import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { EdlListe } from "../../pages/EdlListe";
import { Edl } from "../../pages/Edl"
import { NavBar } from "./NavBar";
import { Dossiers } from "../../pages/Dossiers";
import { Accueil } from "../../pages/Accueil";

export const NavigationRoutes = () => {
    return (
        <>
            <Router>
            <NavBar />
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/dossiers" element={<Dossiers />} />
                    <Route path="/edl" element={<EdlListe />} />
                    <Route path="/edl/:nomResidence/:nomDossier/edit/:uid" element={<Edl />} />
                </Routes>
            </Router>
        </>
    );
}