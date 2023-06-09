package gestionnairedoss;

import java.time.LocalDate;

public class Dossier {
    private String chemin,client,agence,personne, surnom;
    private int id;
    private LocalDate dateOuverture;

    public Dossier(int id,String surnom, String chemin, String client, String agence, String personne, LocalDate dateOuverture) {
        this.id = id;
        this.chemin = chemin;
        this.client = client;
        this.agence = agence;
        this.personne = personne;
        this.dateOuverture = dateOuverture;
        this.surnom = surnom;
    }

    public int getId() {
        return this.id;
    }

    public String getSurnom() {
        return this.surnom;
    }

    public String getChemin() {
        return this.chemin;
    }

    public String getClient() {
        return this.client;
    }

    public String getAgence() {
        return this.agence;
    }

    public String getPersonne() {
        return this.personne;
    }

    public LocalDate getdateOuverture() {
        return this.dateOuverture;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setSurnom(String surnom) {
        this.surnom=surnom;
    }

    public void setchemin(String unChemin) {
        this.chemin = unChemin;
    }

    public void setClient(String unClient) {
        this.client = unClient;
    }

    public void setAgence(String uneAgence) {
        this.agence = uneAgence;
    }

    public void setPersonne(String unePersonne) {
        this.personne = unePersonne;
    }

    public void setDateOuverture(LocalDate uneDate) {
        this.dateOuverture = uneDate;
    }
}
