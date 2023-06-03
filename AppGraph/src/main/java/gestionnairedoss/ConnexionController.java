package gestionnairedoss;

import java.io.IOException;
import java.net.URL;
import java.sql.SQLException;
import java.util.ResourceBundle;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.Region;
import javafx.stage.Stage;

public class ConnexionController implements Initializable {

    @FXML
    private Label errorMessage;
    @FXML
    private TextField username;
    @FXML
    private PasswordField password;
    @FXML
    private Button quit;
    @FXML
    private Button conn;
    @FXML
    private Region regionConn;
    @FXML
    private Region regionQuit;
    @FXML
    private AnchorPane anchorPane;

    Scene scene;
    Stage currentStage;

    @Override
    public void initialize(URL arg0, ResourceBundle arg1) {
        scene = anchorPane.getScene();
    }

    public void quitter() {
        System.exit(0);
    }

    public void connexion() throws SQLException, IOException {
        if (username.getText().equals("") || password.getText().equals("")) {
            errorMessage.setText("Veuillez remplir tous les champs.");
            return;
        } else if (!Passerelle.log(username.getText(),password.getText())) {
            errorMessage.setText("Nom d'utilisateur ou mot de passe incorrect");
        } else {
            LogsManager.setLog(Passerelle.getInfosLog(username.getText()));
            currentStage = (Stage) conn.getScene().getWindow();
            currentStage.close();
            FXMLLoader loader = new FXMLLoader(getClass().getResource("Accueil.fxml"));
            Parent root = loader.load();
            Stage stage = new Stage();
            Scene scene = new Scene(root);
            stage.setScene(scene);
            stage.setTitle("Gestionnaire de dossier");
            stage.getIcons().add(new Image(getClass().getResourceAsStream("assets/dossier.png")));
            stage.setMaximized(true);
            stage.show();
        }
    }
    
}
