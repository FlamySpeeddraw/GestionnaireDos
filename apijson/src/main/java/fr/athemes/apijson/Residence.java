package fr.athemes.apijson;

import java.util.List;

public class Residence {
    public String nom,dossier,prestation;
    public List<Edl> edls;

    public Residence(String nom,String dossier,List<Edl> edls, String prestation) {
        this.nom = nom;
        this.dossier = dossier;
        this.edls = edls;
        this.prestation = prestation;
    }
}
