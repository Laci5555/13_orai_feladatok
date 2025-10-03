module com.example.teendok {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.teendok to javafx.fxml;
    exports com.example.teendok;
}