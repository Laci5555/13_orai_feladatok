package com.example.leltar;

import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;
import javafx.scene.control.TextField;
import javafx.stage.FileChooser;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;

public class HelloController {

    @FXML private ListView<String> lsLista;
    @FXML private TextField txNev;
    @FXML private TextField txEv;
    @FXML private TextField txDarab;

    private File fajl = null;
    private FileChooser fc = new FileChooser();

    private final boolean NEV = false;
    private final boolean EV = true;
    private boolean rendez = NEV; // false => Név, true => Év

    public void initialize() {
        fc.setInitialDirectory(new File("./"));
        fc.getExtensionFilters().add(new FileChooser.ExtensionFilter("Leltár fájlok","*.lef"));
    }

    @FXML private void onMentesClilck() {
        if (fajl == null) fajl = fc.showSaveDialog(lsLista.getScene().getWindow());
        if (fajl != null) mentes(fajl);
    }

    private void listaz() {
        if (rendez == NEV) {
            lsLista.getItems().sort((a,b) -> a.compareTo(b));
        } else {
            lsLista.getItems().sort((a,b) -> a.split(" \\(")[1].split("\\): ")[0].compareTo(b.split(" \\(")[1].split("\\): ")[0]));
        }
    }

    private void mentes(File fajl) {
        PrintWriter ki = null;
        try {
            ki = new PrintWriter(fajl, "utf-8");
            for (String sor : lsLista.getItems()) ki.printf("%s\n", sor);
        } catch (Exception e) {
            hiba("Hiba a mentés során!\n" + e.toString());
        } finally {
            if (ki != null) ki.close();
        }
    }

    @FXML private void onHozzaadClick() {
        String sor = txNev.getText() + " (" + txEv.getText() + "): " + txDarab.getText() + " db";
        lsLista.getItems().add(sor);
        listaz();
    }

    @FXML private void onModositClick() {
        int i = lsLista.getSelectionModel().getSelectedIndex();
        if (i != -1) {
            String sor = txNev.getText() + " (" + txEv.getText() + "): " + txDarab.getText() + " db";
            lsLista.getItems().set(i, sor);
        }
    }

    @FXML private void onTorolClick() {
        int i = lsLista.getSelectionModel().getSelectedIndex();
        if (i != -1) {
            lsLista.getItems().remove(i);
        }
    }

    private void hiba(String uzenet) {
        Alert error = new Alert(Alert.AlertType.ERROR);
        error.setTitle("Hiba!");
        error.setHeaderText(null);
        error.setContentText(uzenet);
        error.showAndWait();
    }

}