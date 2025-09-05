module com.example.alakzat {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.alakzat to javafx.fxml;
    exports com.example.alakzat;
}