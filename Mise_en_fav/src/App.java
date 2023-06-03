import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class App {
    public static void main(String[] args) throws Exception {
        Connection conn = null;
        PreparedStatement state;
        try {
            String url = "jdbc:postgresql://localhost:5432/gestionnaireDossier";
            String user = "postgres";
            String passwd = "postgres";
            conn = DriverManager.getConnection(url, user, passwd);
    
            System.out.println("connexion réussie");
    
        } catch (SQLException e) {
            System.out.println("Echec de la connexion : " + e);
        }
        for (String arg:args) {
            state = conn.prepareStatement("select id from logs where username=?");
            state.setString(1, System.getProperty("user.name"));
            ResultSet result = state.executeQuery();
            if (result.next()) {
                state = conn.prepareStatement("insert into chemin_dossier (idlog,chemin) values (?,?)");
                state.setInt(1, result.getInt("id"));
                state.setString(2, arg);
                state.executeUpdate();
            }
        }
    }
}
