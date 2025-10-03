package com.example.kepek;

import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Label;
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
    @FXML ImageView kep1,kep2,kep3;
    @FXML Label nev1, nev2, nev3;

    FileChooser fcKep = new FileChooser();
    FileChooser fcKonfig = new FileChooser();




    public void initialize(){

        fcKep.setInitialDirectory(new File("./kepek"));
        fcKonfig.getExtensionFilters().add(new FileChooser.ExtensionFilter("Felhasználói fájlok", "*.cfg"));
        fcKonfig.setInitialDirectory(new File("./config"));
    }


    public void onMegnyitas() {
        File fajl = fcKonfig.showOpenDialog(kep1.getScene().getWindow());
        if(fajl != null) betolt(fajl);
    }

    public void betolt(File fajl){
        Scanner be = null;
        String betoltott = "";
        try {
            be = new Scanner(fajl, "utf-8");
            while(be.hasNextLine()){
                betoltott += be.nextLine() + ";";
            }
            System.out.println(betoltott.split(";")[0]);
            kep1.setImage(new Image("file:./kepek/" + betoltott.split(";")[0]));
            kep2.setImage(new Image("file:./kepek/" + betoltott.split(";")[1]));
            kep3.setImage(new Image("file:./kepek/" + betoltott.split(";")[2]));
            nev1.setText(betoltott.split(";")[0]);
            nev2.setText(betoltott.split(";")[1]);
            nev3.setText(betoltott.split(";")[2]);
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            if(be != null) be.close();
        }
    }

    public void onMentes() {
        File fajl = fcKonfig.showSaveDialog(kep1.getScene().getWindow());
        if(fajl != null) mentes(fajl);
    }

    private void mentes(File fajl){
        PrintWriter ki = null;
        String konfig = nev1.getText() + "\r\n" + nev2.getText() + "\r\n" + nev3.getText();
        System.out.println(konfig);
        try {
            ki = new PrintWriter(fajl, "utf-8");
            ki.println(konfig);
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {if(ki != null) ki.close();}
    }

    public void onKilepes() {
        Platform.exit();
    }

    public void onBal() {
        File fajl = fcKep.showOpenDialog(kep1.getScene().getWindow());
        //System.out.println(fajl.getName());
        kep1.setImage(new Image("file:./kepek/" + fajl.getName()));
        nev1.setText(fajl.getName());
    }

    public void onKozep() {
        File fajl = fcKep.showOpenDialog(kep1.getScene().getWindow());
        //System.out.println(fajl.getName());
        kep2.setImage(new Image("file:./kepek/" + fajl.getName()));
        nev2.setText(fajl.getName());
    }

    public void onJobb() {
        File fajl = fcKep.showOpenDialog(kep1.getScene().getWindow());
        //System.out.println(fajl.getName());
        kep3.setImage(new Image("file:./kepek/" + fajl.getName()));
        nev3.setText(fajl.getName());
    }

    public void onSugo() {
        Alert info = new Alert(Alert.AlertType.INFORMATION);
        info.setTitle("Névjegy");
        info.setHeaderText(null);
        info.setContentText("Képek v1.0.0\n(C) 2025, Kandó");
        info.setGraphic(new ImageView(new Image(getClass().getResourceAsStream("kepek.png"))));
        ((Stage)info.getDialogPane().getScene().getWindow()).getIcons().add(new Image(getClass().getResourceAsStream("kepek.png")));
        info.showAndWait();
    }
}