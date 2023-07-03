package gestionnairedoss;

import java.awt.Desktop;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.ResourceBundle;


import org.controlsfx.control.SearchableComboBox;

import javafx.application.Platform;
import javafx.collections.FXCollections;
import javafx.concurrent.Task;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.CheckBox;
import javafx.scene.control.TextField;
import javafx.scene.control.TreeCell;
import javafx.scene.control.TreeItem;
import javafx.scene.control.TreeView;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
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
    private SearchableComboBox<String> client;
    @FXML
    private SearchableComboBox<String> agence;
    @FXML
    private SearchableComboBox<String> personne;
    @FXML
    private CheckBox maj;
    @FXML
    private Button ouvrir;
    @FXML
    private Button retour;
    @FXML
    private Button supp;

    ArrayList<String> clients;
    ArrayList<String> agences;
    ArrayList<String> personnes;
    Boolean agenceModified,clientModified,personneModified;

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        String startingDirPath = leDos.getChemin();
        File startingDir = new File(startingDirPath);

        TreeItem<String> rootItem = new TreeItem<>(startingDirPath);
        treeView.setRoot(rootItem);
        treeView.setCellFactory(param -> new CustomTreeCell());
        buildFileTree(startingDir, rootItem);

        treeView.getSelectionModel().selectedItemProperty().addListener((observable, oldValue, newValue) -> {
            if (newValue != null) {
                ouvrir.setVisible(true);
            } else {
                ouvrir.setVisible(false);
            }
        });
        
        agenceModified = true;
        clientModified = true;
        personneModified = true;
        clients = Passerelle.getTousLesClients("");
        clients.add("");
        client.getItems().addAll(clients);
        agences = Passerelle.getToutesLesAgences("");
        agences.add("");
        agence.getItems().addAll(agences);
        personnes = Passerelle.getToutesLesPersonnes("");
        personnes.add("");
        personne.getItems().addAll(personnes);
        
        client.valueProperty().addListener((observable, oldValue, newValue) -> {
            if (newValue != null) {
                agenceModified = false;
                personneModified = false;
                if (!clientModified) {
                    clientModified = true;
                    return;
                }
                agence.setValue("");
                personne.setValue("");
                if (client.getValue() != "") {
                    String sql = " inner join clients on clients.id=info_clients.idclient where client='" + newValue + "'";
                    if (agence.getValue() == "") {
                        agence.setItems(FXCollections.observableArrayList(Passerelle.getAgenceFromClient(newValue)));
                    }
                    if (personne.getValue() == "") {
                        personne.setItems(FXCollections.observableArrayList(Passerelle.getToutesLesPersonnes(sql)));
                    }
                } else {
                    agence.setItems(FXCollections.observableArrayList(Passerelle.getToutesLesAgences("")));
                    personne.setItems(FXCollections.observableArrayList(Passerelle.getToutesLesPersonnes("")));
                }
            }
        });

        agence.valueProperty().addListener((observable, oldValue, newValue) -> {
            if (newValue != null) {
                clientModified = false;
                personneModified = false;
                if (!agenceModified) {
                    agenceModified = true;
                    return;
                }
                if (agence.getValue() == "") {
                    personne.setItems(FXCollections.observableArrayList(Passerelle.getToutesLesPersonnes("")));
                    personne.setValue("");
                } else {
                    personne.setItems(FXCollections.observableArrayList(Passerelle.getToutesLesPersonnes(" where agence='" + newValue + "'")));
                }
                if (client.getValue() == "") {
                    client.setValue(Passerelle.getClientFromAgence(agence.getValue()));
                }
            }
        });

        personne.valueProperty().addListener((observable, oldValue, newValue) -> {
            if (newValue != null) {
                clientModified = false;
                agenceModified = false;
                if (!personneModified) {
                    personneModified = true;
                    return;
                }
                if (agence.getValue() == "") {
                    agence.setValue(Passerelle.getAgenceFromPersonne(personne.getValue()));
                }
                if (client.getValue() == "") {
                    client.setValue(Passerelle.getClientFromPersonne(personne.getValue()));
                }
            }
        });

        surnom.setText(leDos.getSurnom());
        client.setValue(leDos.getClient());
        agence.setValue(leDos.getAgence());
        personne.setValue(leDos.getPersonne());
    
    }

    private void buildFileTree(File dir, TreeItem<String> parentItem) {
        TreeItem<String> dummyItem = new TreeItem<>("Loading...");
        parentItem.getChildren().add(dummyItem);

        Task<Void> task = new Task<Void>() {
            @Override
            protected Void call()throws Exception {
                File[] files = dir.listFiles();
                if (files != null) {
                    for (File file : files) {
                        TreeItem<String> newItem = new TreeItem<>(file.getName());
                        parentItem.getChildren().add(newItem);
                        if (file.isDirectory()) {
                            newItem.getChildren().add(dummyItem);
                        } else {
                            newItem.setGraphic(getFileIcon(file));
                        }
                        Platform.runLater(() -> parentItem.getChildren().add(newItem));
                    }
                }
                return null;
            }
        };

        task.setOnSucceeded(event -> parentItem.getChildren().remove(dummyItem));
        new Thread(task).start();
    }

    private ImageView getFileIcon(File file) {
        Image fxImage = new Image(file.toURI().toString());
        ImageView imageView = new ImageView(fxImage);
        imageView.setFitWidth(16);
        imageView.setFitHeight(16);
        return imageView;
    }

    private static class CustomTreeCell extends TreeCell<String> {
        @Override
        protected void updateItem(String item, boolean empty) {
            super.updateItem(item, empty);
            setText(item);
            setGraphic(getTreeItem().getGraphic());
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
        System.out.println(fullPath);
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

    public void reini() {
        surnom.setText("");
        client.setItems(FXCollections.observableArrayList(Passerelle.getTousLesClients("")));
        agence.setItems(FXCollections.observableArrayList(Passerelle.getToutesLesAgences("")));
        personne.setItems(FXCollections.observableArrayList(Passerelle.getToutesLesPersonnes("")));
        client.setValue("");
        agence.setValue("");
        personne.setValue("");
    }

    public void supprimer() throws IOException {
        Passerelle.supprimerCheminDossier(leDos.getId());
        retour();
    }
}