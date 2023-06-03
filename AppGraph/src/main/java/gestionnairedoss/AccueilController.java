package gestionnairedoss;

import java.net.URL;
import java.util.ResourceBundle;

import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.control.Label;
import javafx.scene.control.Tab;
import javafx.scene.layout.GridPane;

public class AccueilController implements Initializable {

    @FXML
    private Tab messagerie;
    @FXML
    private GridPane dossier;

    int i = 0, a = 0;

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        /*for (Dossier unDoss : Passerelle.getTousLesDossiers()) {
            dossier.add(new Label(unDoss.getPersonne()),i,a);
            if (i == dossier.getColumnConstraints().size() - 1) {
                i = 0;
                a++;
            } else {
                i++;
            }
        }*/
    }
    
}
