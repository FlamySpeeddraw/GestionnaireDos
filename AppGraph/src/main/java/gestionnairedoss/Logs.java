package gestionnairedoss;

public class Logs {
    private String username, role, nom, prenom;
    
    Logs(String username, String role, String nom, String prenom) {
        this.username = username;
        this.role = role;
        this.nom = nom;
        this.prenom = prenom;
    }

    public String getUsername() {
        return this.username;
    }

    public String getRole() {
        return this.role;
    }
    public String getNom() {
        return this.nom;
    }

    public String getPrenom() {
        return this.prenom;
    }
}
