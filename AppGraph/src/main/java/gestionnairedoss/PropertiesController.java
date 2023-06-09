package gestionnairedoss;

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.ResourceBundle;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.CheckBox;
import javafx.scene.control.ComboBox;
import javafx.scene.control.TextField;
import javafx.scene.control.TreeItem;
import javafx.scene.control.TreeView;
import javafx.stage.Stage;

public class PropertiesController implements Initializable {

    private Dossier leDos;

    public PropertiesController(Dossier leDos) {
        this.leDos = leDos;
    }

    @FXML
    private TreeView<String> treeView;
    @FXML
    private TextField surnom;
    @FXML
    private ComboBox<String> client;
    @FXML
    private ComboBox<String> agence;
    @FXML
    private ComboBox<String> personne;
    @FXML
    private CheckBox maj;
    @FXML
    private Button ouvrir;
    @FXML
    private Button retour;

    ArrayList<String> clients;
    ArrayList<String> agences;
    ArrayList<String> personnes;

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        String startingDirPath = leDos.getChemin();
        File startingDir = new File(startingDirPath);

        TreeItem<String> rootItem = new TreeItem<>(startingDirPath);
        treeView.setRoot(rootItem);
        buildFileTree(startingDir, rootItem);

        treeView.getSelectionModel().selectedItemProperty().addListener((observable, oldValue, newValue) -> {
            if (newValue != null) {
                ouvrir.setVisible(true);
            } else {
                ouvrir.setVisible(false);
            }
        });
        
        clients = Passerelle.getTousLesClients();
        clients.add("");
        client.getItems().addAll(clients);
        agences = Passerelle.getToutesLesAgences();
        agences.add("");
        agence.getItems().addAll(agences);
        personnes = Passerelle.getToutesLesPersonnes("");
        personnes.add("");
        personne.getItems().addAll(personnes);
        
        client.valueProperty().addListener((observable, oldValue, newValue) -> {
            agence.getItems().clear();
            agence.setValue("");
            personne.getItems().clear();
            personne.setValue("");
            agence.getItems().addAll(Passerelle.getAgenceFromClient(newValue));
        });
        agence.valueProperty().addListener((observable, oldValue, newValue) -> {
            personne.getItems().clear();
            personne.setValue("");
            String sql = " inner join clients on clients.id=info_clients.idclient where 1=1";
            if (agence.getValue() != "") {
                sql += " and agence='" + agence.getValue() + "'";
            }
            if (client.getValue() != "") {
                sql += " and client='" + client.getValue() + "'";
            }
            personne.getItems().addAll(Passerelle.getToutesLesPersonnes(sql));
        });

        surnom.setText(leDos.getSurnom());
        client.setValue(leDos.getClient());
        agence.setValue(leDos.getAgence());
        personne.setValue(leDos.getPersonne());

    }

    private void buildFileTree(File dir, TreeItem<String> parentItem) {
        File[] files = dir.listFiles();
        if (files != null) {
            for (File file : files) {
                TreeItem<String> newItem = new TreeItem<>(file.getName());
                parentItem.getChildren().add(newItem);
                if (file.isDirectory()) {
                    buildFileTree(file, newItem);
                }
            }
        }
    }

    public void ouvrir() throws IOException {
        TreeItem<String> selectedItem = treeView.getSelectionModel().getSelectedItem();
        StringBuilder pathBuilder = new StringBuilder(selectedItem.getValue());

        TreeItem<String> parentItem = selectedItem.getParent();
        while (parentItem != null) {
            pathBuilder.insert(0, parentItem.getValue() + "/");
            parentItem = parentItem.getParent();
        }

        String fullPath = pathBuilder.toString();
        File file = new File(fullPath);
        Desktop.getDesktop().open(file);
    }

    public void valider() {
        leDos.setAgence(agence.getValue());
        leDos.setClient(client.getValue());
        leDos.setPersonne(personne.getValue());
        leDos.setSurnom(surnom.getText());
        Passerelle.updateDossier(leDos);
    }

    public void retour() throws IOException {
        FXMLLoader loader = new FXMLLoader(getClass().getResource("Accueil.fxml"));
        Parent root = loader.load();
        Scene nouvelleScene = new Scene(root);
        Stage stage = (Stage) retour.getScene().getWindow();
        stage.setScene(nouvelleScene);
    }
}