module com.example.gyumolcsok {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.net.http;
    requires com.google.gson;


    opens com.example.gyumolcsok to javafx.fxml;
    exports com.example.gyumolcsok;
}