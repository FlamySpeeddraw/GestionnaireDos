module gestionnairedoss {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.sql;
    requires itextpdf;
    requires jbcrypt;

    opens gestionnairedoss to javafx.fxml;
    exports gestionnairedoss;
}
