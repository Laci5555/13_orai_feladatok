package com.example.primitiv;

import javafx.application.Platform;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;
import javafx.scene.control.TextField;
import javafx.scene.input.MouseEvent;
import javafx.stage.FileChooser;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Scanner;

public class HelloController {

    @FXML
    TextField nev,ev,db;
    @FXML
    ListView<String> lista;

    FileChooser chooser = new FileChooser();

    public void initialize(){
        chooser.setInitialDirectory(new File("./"));
        chooser.getExtensionFilters().add(new FileChooser.ExtensionFilter("Leltár fájlok", "*.lelt"));
    }

    public void Open(ActionEvent actionEvent) {
        File f = chooser.showOpenDialog(nev.getScene().getWindow());
        if(f != null) megnyitas(f);
    }

    public void Save(ActionEvent actionEvent) {
        File f = chooser.showSaveDialog(nev.getScene().getWindow());
        if(f != null) mentes(f);
    }

    public void Exit(ActionEvent actionEvent) {
        Platform.exit();
    }

    public void ListaClick(MouseEvent mouseEvent) {
        String s = lista.getSelectionModel().getSelectedItem();
        String[] elso = s.split(" \\(");
        String[] ketto = elso[1].split("\\): ");
        String darab = ketto[1].substring(0, ketto[1].length()-2);
        nev.setText(elso[0]);
        ev.setText(ketto[0]);
        db.setText(darab);
    }

    public void Add(ActionEvent actionEvent) {
        String elem = nev.getText() + " (" + ev.getText() + "): " + db.getText() + "db";
        lista.getItems().add(elem);
        listaz();
    }

    public void Upd(ActionEvent actionEvent) {
        String elem = nev.getText() + " (" + ev.getText() + "): " + db.getText() + "db";
        int i = lista.getSelectionModel().getSelectedIndex();
        lista.getItems().set(i, elem);
    }

    public void Del(ActionEvent actionEvent) {
        int i = lista.getSelectionModel().getSelectedIndex();
        if(i != -1) {
            lista.getItems().remove(i);
        }
    }

    private void mentes(File f){
        PrintWriter ki = null;
        try {
            ki = new PrintWriter(f, "utf-8");
            for(String i : lista.getItems()){
                ki.printf("%s\r\n", i);
            }
        } catch (Exception e) {
            hiba("Hiba a mentés során!");
        } finally {
            if(ki != null) ki.close();
        }
    }

    private void megnyitas(File f){
        Scanner be = null;
        try {
            be = new Scanner(f, "utf-8");
            while(be.hasNextLine()){
                lista.getItems().add(be.nextLine());
            }
        } catch (Exception e) {
            hiba("Hiba a betöltés során!");
        } finally {
            if(be != null) be.close();
        }
    }

    public void sugo(){
        Alert i = new Alert(Alert.AlertType.INFORMATION);
        i.setTitle("Leltar");
        i.setHeaderText(null);
        i.setContentText("Leltar v1.0.0\n(c) 2025");
        i.showAndWait();
    }

    private void hiba(String uzente){
        Alert h = new Alert(Alert.AlertType.ERROR);
        h.setHeaderText(null);
        h.setContentText(uzente);
        h.setTitle("Hiba!");
        h.showAndWait();
    }

    private final boolean NEV = false;
    private final boolean EV = true;
    private boolean rendez = EV; //false => Név, true => Év

    private void listaz(){
        if (rendez == NEV) {
            lista.getItems().sort((a,b) -> a.compareTo(b));
        } else {
            lista.getItems().sort((a,b) -> a.split(" \\(")[1].split("\\): ")[0].compareTo(b.split(" \\(")[1].split("\\): ")[0]));
        }
    }
}