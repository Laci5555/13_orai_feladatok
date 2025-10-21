module com.example.uthajo {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example.uthajo to javafx.fxml;
    exports com.example.uthajo;
}