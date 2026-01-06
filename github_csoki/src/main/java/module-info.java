module com.example.csoki {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.net.http;
    requires com.google.gson;

    opens com.example.csoki to javafx.fxml;
    exports com.example.csoki;
}