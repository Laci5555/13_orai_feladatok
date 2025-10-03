module com.example.kepek {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.kepek to javafx.fxml;
    exports com.example.kepek;
}