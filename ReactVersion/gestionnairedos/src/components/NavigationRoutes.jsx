import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { EdlListe } from "../pages/EdlListe";
import { Edl } from "../pages/Edl"
import { NavBar } from "./NavBar";
import { Dossiers } from "../pages/Dossiers";

export const NavigationRoutes = () => {
    return (
        <>
            <Router>
            <NavBar />
                <Routes>
                    <Route path="/dossiers" element={<Dossiers />} />
                    <Route path="/edl" element={<EdlListe />} />
                    <Route path="/edl/1" element={<Edl />} />
                </Routes>
            </Router>
        </>
    );
}