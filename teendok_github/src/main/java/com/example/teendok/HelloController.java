package com.example.teendok;

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

    @FXML private TextField szoveg, ido;
    @FXML private ListView<String> lista;
    @FXML private ComboBox<String> nap;


    FileChooser fcSave = new FileChooser();
    FileChooser fcOpen = new FileChooser();
    String fajlnev = "";

    public void initialize(){
        fcSave.setInitialDirectory(new File("./"));
        fcOpen.setInitialDirectory(new File("./"));
        fcSave.getExtensionFilters().add(new FileChooser.ExtensionFilter("Teendők fájl", "*.tef"));
        fcOpen.getExtensionFilters().add(new FileChooser.ExtensionFilter("Teendők fájl", "*.tef"));
        nap.getItems().addAll("Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek");
        nap.getSelectionModel().select(0);
    }

    public void onFelvesz() {
        String n = nap.getSelectionModel().getSelectedItem();
        String i = ido.getText();
        String t = szoveg.getText();
        lista.getItems().add(n + " (" + i + "): " + t);
    }

    public void onModosit() {
        int index = lista.getSelectionModel().getSelectedIndex();
        if(index != -1) {
            String n = nap.getSelectionModel().getSelectedItem();
            String i = ido.getText();
            String t = szoveg.getText();
            lista.getItems().set(index, n + " (" + i + "): " + t);
        }
    }

    public void onTorol() {
        int index = lista.getSelectionModel().getSelectedIndex();
        if(index != -1) {
            lista.getItems().remove(index);
        }
    }

    @FXML private void onLista(){
        int index = lista.getSelectionModel().getSelectedIndex();
        if(index != -1) {
            String sor = lista.getSelectionModel().getSelectedItem();
            String[] s = sor.split("\\): ");
            String t = s[1];
            String i = s[0].split(" \\(")[1];
            String n = s[0].split(" \\(")[0];
            System.out.printf("%s%s%s", t, i, n);
            ido.setText(i);
            nap.getSelectionModel().select(n);
            szoveg.setText(t);
        }
    }

    public void onKilepes() {
        Platform.exit();
    }

    public void onMentes() {
        fcSave.setInitialFileName(fajlnev);
        File fajl = fcSave.showSaveDialog(lista.getScene().getWindow());
        if(fajl != null) mentes(fajl);
    }

    private void mentes(File fajl){
        PrintWriter ki = null;
        try {
            ki = new PrintWriter(fajl, "utf-8");
            for(String i : lista.getItems()){
                ki.printf("%s\r\n", i);
            }
            fajlnev = fajl.getName();
            ((Stage)lista.getScene().getWindow()).setTitle("Teendők v1.0.0 - " + fajlnev);
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            if(ki != null) ki.close();
        }
    }

    public void onMegnyitas() {
        File fajl = fcOpen.showOpenDialog(lista.getScene().getWindow());
        if(fajl != null) betolt(fajl);
    }

    private void betolt(File fajl){
        Scanner be = null;
        try {
            be = new Scanner(fajl, "utf-8");
            lista.getItems().clear();
            while(be.hasNextLine()){
                lista.getItems().add(be.nextLine());
            }
            fajlnev = fajl.getName();
            ((Stage)lista.getScene().getWindow()).setTitle("Teendők v1.0.0 - " + fajlnev);
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            if(be != null) be.close();
        }
    }


    public void onNevjegy() {
        Alert i = new Alert(Alert.AlertType.INFORMATION);
        i.setTitle("Névjegy");
        i.setHeaderText(null);
        i.setContentText("Teendők v1.0.0\r\n(C) 2024");
        i.setGraphic(new ImageView(new Image(getClass().getResourceAsStream("otlet.png"))));
        ((Stage)i.getDialogPane().getScene().getWindow()).getIcons().add(new Image(getClass().getResourceAsStream("otlet.png")));
        i.showAndWait();
    }
}