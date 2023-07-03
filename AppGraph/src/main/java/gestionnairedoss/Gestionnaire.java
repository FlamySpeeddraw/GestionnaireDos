package gestionnairedoss;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Parent;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.stage.Stage;
import javafx.stage.StageStyle;

import java.io.UnsupportedEncodingException;
import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

/**
 * JavaFX App
 */
public class Gestionnaire extends Application {

    Stage stage;

    @Override
    public void start(Stage primaryStage) throws Exception{
        FXMLLoader loader = new FXMLLoader(getClass().getResource("Connexion.fxml"));
        Parent root = loader.load();
        stage = new Stage();
        Scene scene = new Scene(root);
        stage.setScene(scene);
        stage.setTitle("Gestionnaire de dossier");
        stage.initStyle(StageStyle.UNDECORATED);
        stage.getIcons().add(new Image(getClass().getResourceAsStream("assets/dossier.png")));
        stage.show();
    }

    public static void main(String[] args) throws UnsupportedEncodingException {
        try {
            Enumeration<NetworkInterface> networkInterfaces = NetworkInterface.getNetworkInterfaces();

            while (networkInterfaces.hasMoreElements()) {
                NetworkInterface networkInterface = networkInterfaces.nextElement();

                Enumeration<InetAddress> inetAddresses = networkInterface.getInetAddresses();

                while (inetAddresses.hasMoreElements()) {
                    InetAddress inetAddress = inetAddresses.nextElement();

                    if (inetAddress instanceof Inet4Address) {
                        String ipAddress = inetAddress.getHostAddress();

                        if (ipAddress.startsWith("192.168.59.")) {
                            System.out.println("Interface: " + networkInterface.getDisplayName());
                            System.out.println("IP Address: " + ipAddress);
                        }
                    }
                }
            }
        } catch (SocketException e) {
            e.printStackTrace();
        }
        Passerelle.connexion();
        launch(args);
    }

}