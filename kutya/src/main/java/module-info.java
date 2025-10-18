module com.example.kutya {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.kutya to javafx.fxml;
    exports com.example.kutya;
}