module com.example.primitiv {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.primitiv to javafx.fxml;
    exports com.example.primitiv;
}