package com.example.login;

import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Scanner;

public class HelloController {
    @FXML
    ListView<String> lista1, lista2;
    @FXML
    TextField be;
    @FXML
    Menu gg;

    private FileChooser fcOpen = new FileChooser();
    private FileChooser fcSave = new FileChooser();



    public void initialize(){
        //betolt("egyik.usr");
        fcOpen.setInitialDirectory(new File("./"));
        fcOpen.getExtensionFilters().add(new FileChooser.ExtensionFilter( "Felhasználói fájlok", "*.usr"));
        fcSave.setInitialDirectory(new File("./"));
        fcSave.getExtensionFilters().add(new FileChooser.ExtensionFilter("Login fájlok", "*.lgn"));
    }

    private void betolt(File fajl){
        Scanner be = null;
        try {
            be = new Scanner(fajl, "utf-8");
            lista1.getItems().clear();
            lista2.getItems().clear();
            while (be.hasNextLine()) lista1.getItems().add(be.nextLine());
            gg.setDisable(false);
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            if(be != null) be.close();
        }

    }

    //Súgó
    public void onNevjegy() {
        Alert info = new Alert(Alert.AlertType.INFORMATION);
        info.setTitle("Névjegy");
        info.setHeaderText(null);
        info.setContentText("Login v1.0.0\n(c) 2024");
        ((Stage)info.getDialogPane().getScene().getWindow()).getIcons().add(new Image(getClass().getResourceAsStream("icons/users.png")));
        info.setGraphic(new ImageView(new Image(getClass().getResourceAsStream("icons/login.png"))));
        info.showAndWait();
    }


    //Generál
    public void onKivalasztott() {
        int i = lista1.getSelectionModel().getSelectedIndex();
        if( i!= -1){
            String sor = lista1.getItems().get(i);
            String[] s = sor.split(";");
            String vnev3 = ekezetNelkul(s[0].substring(0, 3).toLowerCase());
            String knev3 = ekezetNelkul(s[1].substring(0, 3).toLowerCase());
            String kod = (33 - Integer.parseInt(s[2].split("/")[0])) + s[2].split("/")[1].toLowerCase();
            lista2.getItems().set(i, s[0] + " " + s[1] + " (" + s[2] + "): " + vnev3+knev3+kod);
        }
    }

    public void onMindenki() {
        lista2.getItems().clear();
        for (String sor : lista1.getItems()){
            String[] s = sor.split(";");
            String vnev3 = ekezetNelkul(s[0].substring(0, 3).toLowerCase());
            //System.out.printf("%s ", vnev3);
            String knev3 = ekezetNelkul(s[1].substring(0, 3).toLowerCase());
            String kod = (33 - Integer.parseInt(s[2].split("/")[0])) + s[2].split("/")[1].toLowerCase();
            //System.out.printf("%s ", vnev3+knev3+kod);
            lista2.getItems().add(s[0] + " " + s[1] + " (" + s[2] + "): " + vnev3+knev3+kod);
        }
    }
    private String ekezetNelkul(String szo){
        String uj = "";
        String mit = "áéíóöőúüű";
        String mire = "aeiooouuu";
        for(int i = 0;i<szo.length();i++){
            char betu = szo.charAt(i);
            int bi = mit.indexOf(betu);
            if(bi != -1) betu = mire.charAt(bi);
            uj += betu;
        }
        return uj;
    }

    @FXML private void onLista2Click(){
        int i = lista2.getSelectionModel().getSelectedIndex();
        if(i != -1){
            be.setText(lista2.getItems().get(i).split(": ")[1]);
        }
    }

    @FXML private void onFrissitClick(){
        int i = lista2.getSelectionModel().getSelectedIndex();
        if( i != -1 ){
            String ujsor = lista2.getItems().get(i).split(": ")[0] + ": " + be.getText();
            lista2.getItems().set(i, ujsor);
        }
    }


    //Fájl
    public void onKilepes() {
        Platform.exit();
    }

    public void onMentes() {
        File fajl = fcSave.showSaveDialog(lista1.getScene().getWindow());
        if(fajl != null) mentes(fajl);
    }

    private void mentes(File fajl){
        PrintWriter ki = null;
        try {
            ki = new PrintWriter(fajl, "utf-8");
            for (String sor : lista1.getItems()) ki.printf("%s\r\n", sor);
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            if(ki != null) ki.close();
        }
    }

    public void onMegnyitas() {
        File fajl = fcOpen.showOpenDialog(lista1.getScene().getWindow());
        if(fajl != null) betolt(fajl);
    }
}