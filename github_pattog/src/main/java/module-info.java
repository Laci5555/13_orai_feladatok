module com.example.pattog {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.desktop;


    opens com.example.pattog to javafx.fxml;
    exports com.example.pattog;
}