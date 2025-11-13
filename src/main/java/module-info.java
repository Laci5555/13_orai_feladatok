module com.example.ertelemszeru {
    requires javafx.controls;
    requires javafx.fxml;
    requires java.sql;


    opens com.example.ertelemszeru to javafx.fxml;
    exports com.example.ertelemszeru;
}