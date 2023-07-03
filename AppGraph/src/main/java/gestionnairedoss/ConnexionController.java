package gestionnairedoss;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URL;
import java.sql.SQLException;
import java.util.ResourceBundle;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;

public class ConnexionController implements Initializable {

    @FXML
    private Label errorMessage;
    @FXML
    private TextField username;
    @FXML
    private PasswordField password;
    @FXML
    private TextField showmdp;
    @FXML
    private AnchorPane anchorPane;
    @FXML
    private CheckBox remember;
    @FXML
    private ImageView show;

    Scene scene;
    Stage currentStage;
    String url = "eye.png";

    @Override
    public void initialize(URL arg0, ResourceBundle arg1) {
        scene = anchorPane.getScene();
        String[] rem = readSouvenir().split(",");
        if (rem.length == 1) {
            remember.setSelected(false);
            username.setText(rem[0]);
        } else {
            remember.setSelected(true);
            username.setText(rem[0]);
            password.setText(rem[1]);
        }
    }

    public void quitter() {
        System.exit(0);
    }

    public String readSouvenir() {
        StringBuilder text = null;

        try {
            String filePath = "/home/sacha/Bureau/remember.txt";
            FileReader fileReader = new FileReader(filePath);
            BufferedReader bufferedReader = new BufferedReader(fileReader);
            String line;
            text = new StringBuilder();

            if ((line = bufferedReader.readLine()) != null) {
                text.append(line);
            }
            bufferedReader.close();
        } catch (Exception e) {
            System.err.println(e);
        }
        return text.toString();
    }

    public void seSouvenir(String username, String mdp) {
        try {
            String filePath = "/home/sacha/Bureau/remember.txt";
            File f = new File(filePath);
            f.createNewFile();
            //DosFileAttributeView dosAttributes = Files.getFileAttributeView(file.toPath(), DosFileAttributeView.class);
            //dosAttributes.setHidden(true);
            FileWriter fileWriter = new FileWriter(filePath, false);
            BufferedWriter bufferedWriter = new BufferedWriter(fileWriter);
            bufferedWriter.write(username + "," + mdp);
            bufferedWriter.newLine();
            bufferedWriter.flush();
            bufferedWriter.close();
        } catch (Exception e) {
            System.err.println(e);
        }
    }

    public void connexion() throws SQLException, IOException {
        if (url.equals("eye.png")) {
            showmdp.setText(password.getText());
        } else {
            password.setText(showmdp.getText());
        }
        if (username.getText().equals("") || password.getText().equals("")) {
            errorMessage.setText("Veuillez remplir tous les champs.");
            return;
        } else if (!Passerelle.log(username.getText(),password.getText())) {
            errorMessage.setText("Nom d'utilisateur ou mot de passe incorrect");
        } else {
            if (remember.isSelected()) {
                seSouvenir(username.getText(), password.getText());
            } else {
                seSouvenir(username.getText(), "");
            }
            LogsManager.setLog(Passerelle.getInfosLog(username.getText()));
            currentStage = (Stage) username.getScene().getWindow();
            currentStage.close();
            FXMLLoader loader = new FXMLLoader(getClass().getResource("Accueil.fxml"));
            Parent root = loader.load();
            Stage stage = new Stage();
            Scene scene = new Scene(root);
            stage.setMaximized(true);
            stage.setScene(scene);
            stage.setTitle("Gestionnaire de dossier");
            stage.getIcons().add(new Image(getClass().getResourceAsStream("assets/dossier.png")));
            stage.show();
        }
    }

    public void toShow() {
        if (url.equals("eye.png")) {
            url = "eye-crossed.png";
            showmdp.setText(password.getText());
            show.setImage(new Image(getClass().getResourceAsStream("assets/eye-crossed.png")));
            password.setVisible(false);
            showmdp.setVisible(true);
        } else {
            url = "eye.png";
            password.setText(showmdp.getText());
            show.setImage(new Image(getClass().getResourceAsStream("assets/eye.png")));
            password.setVisible(true);
            showmdp.setVisible(false);
        }
    }
    
}
