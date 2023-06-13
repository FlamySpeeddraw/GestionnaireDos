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

    public static ArrayList<Dossier> getTousLesDossiers(String tri) {
        ArrayList<Dossier> lesDossiers = new ArrayList<Dossier>();
        String chemin,client,personne,surnom,agence;
        int id;
        LocalDate dateOuverture;

        try {
            PreparedStatement state = conn.prepareStatement("select chemin,dateouverture,clients.client,info_clients.agence,info_clients.nom,chemin_dossier.id,surnom from chemin_dossier inner join info_clients on chemin_dossier.idinfo_clients=info_clients.id inner join clients on info_clients.idclient=clients.id inner join logs on chemin_dossier.idlog=logs.id where logs.username=? " + tri);
            state.setString(1,LogsManager.getLeLog().getUsername());
            ResultSet result = state.executeQuery();
            while (result.next()) {
                surnom = result.getString(7);
                id = result.getInt(6);
                chemin = result.getString(1);
                client = result.getString(3);
                personne = result.getString(5);
                agence = result.getString(4);
                dateOuverture = result.getDate(2).toLocalDate();
                lesDossiers.add(new Dossier(id,surnom,chemin,client,agence,personne,dateOuverture));
            }
        } catch (Exception e) {
            System.out.println("Erreur SQL : " + e);
        }

        return lesDossiers;
    }

    public static ArrayList<String> getClients() {
        ArrayList<String> lesClients = new ArrayList<>();

        try {
            PreparedStatement state = conn.prepareStatement("select distinct client from clients where client in (select client from clients inner join info_clients on info_clients.idclient=clients.id inner join chemin_dossier on info_clients.id=chemin_dossier.idinfo_clients inner join logs on chemin_dossier.idlog=logs.id where logs.username=?)");
            state.setString(1, LogsManager.getLeLog().getUsername());
            ResultSet result = state.executeQuery();
            while (result.next()) {
                lesClients.add(result.getString(1));
            }
        } catch (Exception e) {
            System.out.println("Erreur SQL : " + e);
        }
        return lesClients;
    }

    public static ArrayList<String> getPersonnes() {
        ArrayList<String> lesPersonnes = new ArrayList<>();

        try {
            PreparedStatement state = conn.prepareStatement("select distinct nom from info_clients where nom in (select info_clients.nom from info_clients inner join chemin_dossier on info_clients.id=chemin_dossier.idinfo_clients inner join logs on logs.id=chemin_dossier.idlog where logs.username=?)");
            state.setString(1, LogsManager.getLeLog().getUsername());
            ResultSet result = state.executeQuery();
            while (result.next()) {
                lesPersonnes.add(result.getString(1));
            }
        } catch (Exception e) {
            System.out.println("Erreur SQL : " + e);
        }
        return lesPersonnes;
    }

    public static ArrayList<String> getAgences() {
        ArrayList<String>  lesAgences = new ArrayList<>();

        try {
            PreparedStatement state = conn.prepareStatement("select distinct agence from info_clients where agence in (select info_clients.agence from info_clients inner join chemin_dossier on info_clients.id=chemin_dossier.idinfo_clients inner join logs on logs.id=chemin_dossier.idlog where logs.username=?)");
            state.setString(1, LogsManager.getLeLog().getUsername());
            ResultSet result = state.executeQuery();
            while (result.next()) {
                lesAgences.add(result.getString(1));
            }
        } catch (Exception e) {
            System.out.println("Erreur SQL : " + e);
        }
        return lesAgences;
    }

    public static boolean updateDossier(Dossier unDos) {
        int i = 0, a = 0;
        
        try {
            PreparedStatement state = conn.prepareStatement("update chemin_dossier set surnom=? where id=?");
            state.setString(1, unDos.getSurnom());
            state.setInt(2, unDos.getId());
            i = state.executeUpdate();
            state = conn.prepareStatement("update info_clients set agence=?,nom=?,idclient=(select id from clients where client=?) where id=(select idinfo_clients from chemin_dossier where id=?)");
            state.setString(1, unDos.getAgence());
            state.setString(2, unDos.getPersonne());
            state.setString(3, unDos.getClient());
            state.setInt(4, unDos.getId());
            a = state.executeUpdate();
        } catch (Exception e) {
            System.out.println("Erreur SQL : " + e);
        }
        return i > 0 && a > 0;
    }

    public static ArrayList<String> getAgenceFromClient(String unClient) {
        ArrayList<String> agence = new ArrayList<>();

        try {
            PreparedStatement state = conn.prepareStatement("select distinct agence from info_clients inner join clients on info_clients.idclient=clients.id where client=? order by agence");
            state.setString(1, unClient);
            ResultSet result = state.executeQuery();
            while(result.next()) {
                agence.add(result.getString(1));
            }
        } catch (Exception e) {
            System.out.println("Erreur : " + e);
        }
        return agence;
    }

    public static ArrayList<String> getTousLesClients(String sql) {
        ArrayList<String> client = new ArrayList<>();

        try {
            PreparedStatement state = conn.prepareStatement("select distinct client from clients " + sql + " order by client");
            ResultSet result = state.executeQuery();
            while(result.next()) {
                client.add(result.getString(1));
            }
        } catch (Exception e) {
            System.out.println("Erreur : " + e);
        }
        return client;
    }

    public static ArrayList<String> getToutesLesAgences(String sql) {
        ArrayList<String> agence = new ArrayList<>();

        try {
            PreparedStatement state = conn.prepareStatement("select distinct agence from info_clients " + sql + " order by agence");
            ResultSet result = state.executeQuery();
            while(result.next()) {
                agence.add(result.getString(1));
            }
        } catch (Exception e) {
            System.out.println("Erreur : " + e);
        }
        return agence;
    }

    public static ArrayList<String> getToutesLesPersonnes(String sql) {
        ArrayList<String> personne = new ArrayList<>();

        try {
            PreparedStatement state = conn.prepareStatement("select distinct nom from info_clients" + sql + " order by nom");
            ResultSet result = state.executeQuery();
            while(result.next()) {
                personne.add(result.getString(1));
            }
        } catch (Exception e) {
            System.out.println("Erreur : " + e);
        }
        return personne;
    }

    public static String getClientFromPersonne(String value) {
        String rslt="";
        try {
            PreparedStatement state = conn.prepareStatement("select client from clients inner join info_clients on info_clients.idclient=clients.id where nom=?");
            state.setString(1, value);
            ResultSet result = state.executeQuery();
            if (result.next()) {
                rslt =result.getString(1);
            }
        } catch (Exception e) {
            System.out.println("Erreur : " + e);
        }
        return rslt;
    }

    public static String getClientFromAgence(String value) {
        String rslt="";
        try {
            PreparedStatement state = conn.prepareStatement("select client from clients inner join info_clients on info_clients.idclient=clients.id where agence=?");
            state.setString(1, value);
            ResultSet result = state.executeQuery();
            if (result.next()) {
                rslt =result.getString(1);
            }
        } catch (Exception e) {
            System.out.println("Erreur : " + e);
        }
        return rslt;
    }

    public static String getAgenceFromPersonne(String value) {
        String rslt="";
        try {
            PreparedStatement state = conn.prepareStatement("select agence from info_clients where nom=?");
            state.setString(1, value);
            ResultSet result = state.executeQuery();
            if (result.next()) {
                rslt =result.getString("agence");
            }
        } catch (Exception e) {
            System.out.println("Erreur : " + e);
        }
        return rslt;
    }
}