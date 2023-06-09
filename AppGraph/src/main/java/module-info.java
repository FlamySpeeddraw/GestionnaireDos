module gestionnairedoss {
    requires java.desktop;
    requires javafx.controls;
    requires javafx.fxml;
    requires java.sql;
    requires org.controlsfx.controls;
    requires itextpdf;
    requires jbcrypt;

    opens gestionnairedoss to javafx.fxml;
    exports gestionnairedoss;
}
