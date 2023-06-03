package gestionnairedoss;

import java.time.LocalDate;

public class Dossier {
    private String chemin,client,agence,personne;
    private LocalDate dateOuverture;

    public Dossier(String chemin, String client, String agence, String personne, LocalDate dateOuverture) {
        this.chemin = chemin;
        this.client = client;
        this.agence = agence;
        this.personne = personne;
        this.dateOuverture = dateOuverture;
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
