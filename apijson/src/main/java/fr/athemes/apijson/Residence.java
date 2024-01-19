package fr.athemes.apijson;

import java.util.List;

public class Residence {
    public String nom,dossier;
    public List<Edl> edls;

    public Residence(String nom,String dossier,List<Edl> edls) {
        this.nom = nom;
        this.dossier = dossier;
        this.edls = edls;
    }
}
