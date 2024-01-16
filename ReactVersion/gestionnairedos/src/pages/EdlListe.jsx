import { useEffect, useState } from "react";
import { EdlListeChild } from "../components/EdlListeChild";
import axios from "axios";
import { Link } from "react-router-dom";

export const EdlListe = () => {
    const [fiches,setFiches] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8080/JSON/fiches').then(response => {
            setFiches(response.data);
        }).catch(error => {
        console.log(error);
        });
    },[]);

    const deleteFiche = (id) => {
        axios.delete('http://localhost:8080/JSON/delete/' + id).then(response => {
            axios.get('http://localhost:8080/JSON/fiches').then(response => {
                setFiches(response.data);
            }).catch(error => {
                console.log(error);
            });
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div>
            <ul>
                {fiches.map((fiche) => (
                    <EdlListeChild handleDeleteFiche={deleteFiche} ficheInfos={fiche} key={fiche.id} />
                ))}
                <li><Link to={"/edl/edit/new"}>Nouvelle fiche</Link></li>
            </ul>
        </div>
    )
}