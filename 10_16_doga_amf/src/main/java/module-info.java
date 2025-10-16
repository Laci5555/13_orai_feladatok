module com.example._10_16_doga {
    requires javafx.controls;
    requires javafx.fxml;


    opens com.example._10_16_doga to javafx.fxml;
    exports com.example._10_16_doga;
}