package gestionnairedoss;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.ArrayList;

import org.mindrot.jbcrypt.BCrypt;

public class Passerelle {

    private static Connection conn;

    public static void connexion() {
        try {
            String url = "jdbc:postgresql://localhost:5432/gestionnaireDossier";
            String user = "postgres";
            String passwd = "postgres";
            conn = DriverManager.getConnection(url, user, passwd);

            System.out.println("connexion réussie");

        } catch (SQLException e) {
            System.out.println("Echec de la connexion : " + e);
        }
    }

    public static void deconnexion() {
        try {
            conn.close();
            System.out.println("Connexion fermée");
        } catch (SQLException e) {
            System.out.println("ERROR (deconnection BDD) : " + e);
        }
    }

    public static boolean log(String username, String mdp) throws SQLException {
        boolean success = false;
        PreparedStatement state = conn.prepareStatement("Select mdp from logs where username=?");
        state.setString(1, username);
        ResultSet result = state.executeQuery();
            if (result.next()) {
                String hashedPassword = result.getString("mdp");
                if (BCrypt.checkpw(mdp, hashedPassword)) {
                    success = true;
                }
            }
        return success;
    }

    public static Logs getInfosLog(String username) throws SQLException {
        Logs log = null;
        String nom,prenom,role;

        PreparedStatement state = conn.prepareStatement("Select nom,prenom,role from logs where username=?");
        state.setString(1, username);
        ResultSet result = state.executeQuery();
            if (result.next()) {
                role = result.getString("role");
                nom = result.getString("nom");
                prenom = result.getString("prenom");
                log = new Logs(username,role,nom,prenom);
            }
        return log;
    }

    public static ArrayList<Dossier> getTousLesDossiers() {
        ArrayList<Dossier> lesDossiers = new ArrayList<Dossier>();
        String chemin,client,personne,agence;
        LocalDate dateOuverture;

        try {
            PreparedStatement state = conn.prepareStatement("select chemin,dateouverture,clients.client,info_clients.agence,info_clients.nom from chemin_dossier inner join info_clients on chemin_dossier.idinfo_clients=info_clients.id inner join clients on info_clients.idclient=clients.id inner join logs on chemin_dossier.idlog=logs.id where logs.username=?");
            state.setString(1,LogsManager.getLeLog().getUsername());
            ResultSet result = state.executeQuery();
            while (result.next()) {
                chemin = result.getString(1);
                client = result.getString(3);
                personne = result.getString(5);
                agence = result.getString(4);
                dateOuverture = result.getDate(2).toLocalDate();
                lesDossiers.add(new Dossier(chemin,client,agence,personne,dateOuverture));
            }
        } catch (Exception e) {
            System.out.println("Erreur SQL : " + e);
        }

        return lesDossiers;
    }
}