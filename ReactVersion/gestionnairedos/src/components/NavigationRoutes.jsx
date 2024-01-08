import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { Edl } from "../pages/Edl";
import { NavBar } from "./NavBar";
import { Dossiers } from "../pages/Dossiers";

export const NavigationRoutes = () => {
    return (
        <>
            <Router>
            <NavBar />
                <Routes>
                    <Route path="/dossiers" element={<Dossiers />} />
                    <Route path="/edl" element={<Edl />} />
                </Routes>
            </Router>
        </>
    );
}