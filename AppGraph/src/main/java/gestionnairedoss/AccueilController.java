package gestionnairedoss;

import java.net.URL;
import java.util.ArrayList;
import java.util.ResourceBundle;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javafx.application.Platform;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.fxml.Initializable;
import javafx.geometry.Pos;
import javafx.scene.Cursor;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.control.CheckBox;
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.control.Tab;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.ColumnConstraints;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.RowConstraints;
import javafx.scene.layout.VBox;
import javafx.scene.text.TextAlignment;
import javafx.stage.Stage;

public class AccueilController implements Initializable {

    @FXML
    private Tab messagerie;
    @FXML
    private GridPane dossier;
    @FXML
    private ComboBox<String> tri;
    @FXML
    private ScrollPane scrollDoss;
    @FXML
    private Label surnomTitre;
    @FXML
    private TextField surnomModifie;
    @FXML
    private VBox clientFiltre;
    @FXML
    private VBox agenceFiltre;
    @FXML
    private VBox personneFiltre;

    private ScheduledExecutorService executorService;
    int i = 0, a = 0, verif = 0;
    String foncTri = "", foncFiltre = "AND ", leTri = "";
    ArrayList<Dossier> lesDoss;
    ArrayList<String> clientList;
    ArrayList<String> agenceList;
    ArrayList<String> personneList;
    Stage stage;
    Double scrollWidth = 0.0;

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        clientList = Passerelle.getClients();
        agenceList = Passerelle.getAgences();
        personneList = Passerelle.getPersonnes();
        lesDoss = Passerelle.getTousLesDossiers("order by chemin_dossier.id");
        for (String client : clientList) {
            CheckBox cb = new CheckBox(client);
            clientFiltre.getChildren().add(cb);
            cb.setOnAction(event -> {
                if (cb.isSelected()) {
                    if (verif >= 1) {
                        foncFiltre += "OR ";
                    }
                    foncFiltre += "clients.client='" + client + "' ";
                    verif++;
                } else {
                    if (verif > 1 && leTri.indexOf("clients.client='" + client + "' ") > 6) {
                        foncFiltre = foncFiltre.replace("OR clients.client='" + client + "' ", "");
                    } else if (leTri.indexOf("clients.client='" + client + "' ") == 6) {
                        foncFiltre = foncFiltre.replace("clients.client='" + client + "' OR ","");
                    } else {
                        foncFiltre = foncFiltre.replace("clients.client='" + client + "' ", "");
                    }
                    verif--;
                }
                if (verif == 0) {
                    leTri = foncTri;
                } else {
                    leTri = foncFiltre + foncTri;
                }
            });
        }
        for (String agence : agenceList) {
            CheckBox cb = new CheckBox(agence);
            agenceFiltre.getChildren().add(cb);
            cb.setOnAction(event -> {
                if (cb.isSelected()) {
                    if (verif >= 1) {
                        foncFiltre += "OR ";
                    }
                    foncFiltre += "info_clients.agence='" + agence + "' ";
                    verif++;
                } else {
                    if (verif > 1 && leTri.indexOf("info_clients.agence='" + agence + "' ") > 6) {
                        foncFiltre = foncFiltre.replace("OR info_clients.agence='" + agence + "' ", "");
                    } else if (leTri.indexOf("info_clients.agence='" + agence + "' ") == 6) {
                        foncFiltre = foncFiltre.replace("info_clients.agence='" + agence + "' OR ","");
                    } else {
                        foncFiltre = foncFiltre.replace("info_clients.agence='" + agence + "' ", "");
                    }
                    verif--;
                }
                if (verif == 0) {
                    leTri = foncTri;
                } else {
                    leTri = foncFiltre + foncTri;
                }
            });
        }
        for (String personne : personneList) {
            CheckBox cb = new CheckBox(personne);
            personneFiltre.getChildren().add(cb);
            cb.setOnAction(event -> {
                if (cb.isSelected()) {
                    if (verif >= 1) {
                        foncFiltre += "OR ";
                    }
                    foncFiltre += "info_clients.nom='" + personne + "' ";
                    verif++;
                } else {
                    if (verif > 1 && leTri.indexOf("info_clients.nom='" + personne + "' ") > 6) {
                        foncFiltre = foncFiltre.replace("OR info_clients.nom='" + personne + "' ", "");
                    } else if (leTri.indexOf("info_clients.nom='" + personne + "' ") == 6) {
                        foncFiltre = foncFiltre.replace("info_clients.nom='" + personne + "' OR ","");
                    } else {
                        foncFiltre = foncFiltre.replace("info_clients.nom='" + personne + "' ", "");
                    }
                    verif--;
                }
                if (verif == 0) {
                    leTri = foncTri;
                } else {
                    leTri = foncFiltre + foncTri;
                }
            });
        }
        ObservableList<String> items = FXCollections.observableArrayList();
        items.add("A-Z");
        items.add("Client");
        items.add("Agence");
        items.add("Date d'ouverture");
        items.add("Nom d'agent");
        tri.setValue("A-Z");
        tri.setItems(items);
        tri.valueProperty().addListener((observable, oldValue, newValue) -> {
            handleTriDossier();
        });
        Platform.runLater(() -> {
            stage = (Stage) tri.getScene().getWindow();
        });
        startThread();
    }



    public void adaptScreen() {
        Platform.runLater(() -> {
            if (scrollWidth != scrollDoss.getWidth()) {
                scrollWidth = scrollDoss.getWidth();
                i = 0;
                a = 0;
                resetGridPane();
                double hTaille = 80.0;
                while (hTaille + 120 < scrollWidth) {
                    hTaille += 120;
                    ColumnConstraints cc = new ColumnConstraints();
                    dossier.getColumnConstraints().add(cc);
                }
                constGrid();
            }
        });
    }

    public void constGrid() {
        for (Dossier unDoss : lesDoss) {
            ImageView icon = new ImageView();
            Label surnom = new Label();
            Label id = new Label();

            icon.setImage(new Image(getClass().getResourceAsStream("assets/dossier.png")));
            icon.setFitWidth(75);
            icon.setFitHeight(75);

            surnom.setText(unDoss.getSurnom());
            surnom.setWrapText(true);
            surnom.setTextAlignment(TextAlignment.CENTER);

            id.setVisible(false);
            id.setText(Integer.toString(unDoss.getId()));

            VBox vbox = new VBox(icon, surnom, id);
            vbox.setAlignment(Pos.CENTER);
            vbox.setMaxWidth(80);
            dossier.add(vbox,i,a);
            vbox.setCursor(Cursor.HAND);
            vbox.setOnMouseClicked(event -> {
                try {
                    stopThread();
                    FXMLLoader loader = new FXMLLoader(getClass().getResource("Properties.fxml"));
                    PropertiesController prop = new PropertiesController(unDoss);
                    loader.setController(prop);
                    Parent root = loader.load();
                    Scene nouvelleScene = new Scene(root);
                    Stage stage = (Stage) tri.getScene().getWindow();
                    stage.setScene(nouvelleScene);
                } catch (Exception e) {
                    System.out.println("Erreur : " + e);
                }
            });
            if (i == dossier.getColumnConstraints().size() - 1) {
                i = 0;
                a++;
                if (a == dossier.getRowConstraints().size()) {
                    RowConstraints rc = new RowConstraints();
                    dossier.getRowConstraints().add(rc);
                }
            } else {
                i++;
            }
        }
    }

    private void resetGridPane() {
        dossier.getChildren().clear();
        dossier.getColumnConstraints().clear();
        ColumnConstraints colConstraints = new ColumnConstraints();
        dossier.getColumnConstraints().add(colConstraints);
        dossier.getRowConstraints().clear();
        RowConstraints rowConstraints = new RowConstraints();
        dossier.getRowConstraints().add(rowConstraints);
    }

    public void handleTriDossier() {
        foncTri = "order by chemin_dossier.id";
        if (tri.getValue().equals("A-Z")) {
            foncTri = "order by surnom";
        } else if (tri.getValue().equals("Client")) {
            foncTri = "order by clients.client";
        } else if (tri.getValue().equals("Agence")) {
            foncTri = "order by info_clients.agence";
        } else if (tri.getValue().equals("Date d'ouverture")) {
            foncTri = "order by surnom";
        } else if (tri.getValue().equals("Nom d'agent")) {
            foncTri = "order by info_clients.nom";
        }
        if (verif == 0) {
            leTri = foncTri;
        } else {
            leTri = foncFiltre + foncTri;
        }
    }

    public void validTri() {
        i = 0;
        a = 0;
        dossier.getChildren().clear();
        lesDoss = Passerelle.getTousLesDossiers(leTri);
        constGrid();
    }

    private void stopThread() {
        if (executorService != null && !executorService.isShutdown()) {
            executorService.shutdown();
        }
    }

    private void startThread() {
        executorService = Executors.newSingleThreadScheduledExecutor();
        executorService.scheduleAtFixedRate(this::adaptScreen, 0, 100, TimeUnit.MILLISECONDS);
        Platform.runLater(() -> {
            stage.setOnCloseRequest(event -> {
                stopThread();
            });
        });
    }
}