import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { EdlListe } from "../../pages/EdlListe";
import { Edl } from "../../pages/Edl"
import { NavBar } from "./NavBar";
import { Accueil } from "../../pages/Accueil";
import { DiagListe } from "../../pages/DiagListe";
import { Diag } from "../../pages/Diag";
import { Excel } from "../../pages/Excel";

export const NavigationRoutes = () => {
    return (
        <>
            <Router>
            <NavBar />
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/edl" element={<EdlListe />} />
                    <Route path="/edl/:id/edit/:uid" element={<Edl />} />
                    <Route path="/diag" element={<DiagListe />} />
                    <Route path="/diag/:id/edit/:uid" element={<Diag />} />
                    <Route path="/excel" element={<Excel />} />
                </Routes>
            </Router>
        </>
    );
}