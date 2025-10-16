package com.example._10_16_doga;

import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;
import javafx.stage.FileChooser;
import javafx.stage.Stage;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.Scanner;

public class HelloController {
    @FXML TextField nev;
    @FXML RadioButton lany, fiu;
    @FXML CheckBox amf,bpt,fpt;
    @FXML ListView<String> lista;
    @FXML ImageView kep;

    FileChooser fc = new FileChooser();

    public void initialize(){
        fc.setInitialDirectory(new File("./"));
        fc.getExtensionFilters().add(new FileChooser.ExtensionFilter("Osztályfájlok", "*.osz"));
    }


    //--------------------------Kép---------------------------

    public void KepChange() {
        if(lany.isSelected()){
            kep.setImage(new Image(getClass().getResourceAsStream("lany.png")));
        }else if(fiu.isSelected()){
            kep.setImage(new Image(getClass().getResourceAsStream("fiu.png")));
        }
    }

    //--------------------------Gombok és Lista---------------------------

    public void Add() {
        String elem = nev.getText();
        if(lany.isSelected()){
            elem += " (lány): ";
        }else if(fiu.isSelected()){
            elem += " (fiú): ";
        }

        if(amf.isSelected()){
            elem += "AMF, ";
        }
        if(bpt.isSelected()){
            elem += "BPT, ";
        }
        if(fpt.isSelected()){
            elem += "FPT, ";
        }
        if(!(amf.isSelected()) && !(bpt.isSelected()) && !(fpt.isSelected())){
            elem += "Nincs kedvenc";
        }else{
            elem = elem.substring(0, elem.length()-2);
        }

        lista.getItems().add(elem);
    }

    public void Upd() {
        int i = lista.getSelectionModel().getSelectedIndex();
        if(i != -1){
            String elem = nev.getText();
            if(lany.isSelected()){
                elem += " (lány): ";
            }else if(fiu.isSelected()){
                elem += " (fiú): ";
            }

            if(amf.isSelected()){
                elem += "AMF, ";
            }
            if(bpt.isSelected()){
                elem += "BPT, ";
            }
            if(fpt.isSelected()){
                elem += "FPT, ";
            }
            if(!(amf.isSelected()) && !(bpt.isSelected()) && !(fpt.isSelected())){
                elem += "Nincs kedvenc";
            }else{
                elem = elem.substring(0, elem.length()-2);
            }

            lista.getItems().set(i, elem);
        }
    }

    public void Del() {
        int i = lista.getSelectionModel().getSelectedIndex();
        if(i != -1){
            lista.getItems().remove(i);
        }
    }

    public void SuperDel() {
        lista.getItems().clear();
    }

    public void ListaClick(){
        String elem = lista.getSelectionModel().getSelectedItem();
        String n = elem.split(" \\(")[0];
        String nem = elem.split(" \\(")[1].split("\\): ")[0];
        String kedvencek = elem.split("\\): ")[1];
        nev.setText(n);
        if(nem.contains("lány")){
            lany.setSelected(true);
        }else if(nem.contains("fiú")){
            fiu.setSelected(true);
        }

        if(kedvencek.contains("AMF")){
            amf.setSelected(true);
        }
        if(kedvencek.contains("BPT")){
            bpt.setSelected(true);
        }
        if(kedvencek.contains("FPT")){
            fpt.setSelected(true);
        }
        if(kedvencek.contains("Nincs kedvenc")){
            bpt.setSelected(false);
            amf.setSelected(false);
            fpt.setSelected(false);
        }
    }

    //--------------------------Menu---------------------------

    public void Nevjegy() {
        Alert i = new Alert(Alert.AlertType.INFORMATION);
        i.setTitle("Névjegy");
        i.setHeaderText(null);
        i.setContentText("Osztály v1.0.0\n(C) 2024");
        i.setGraphic(new ImageView(new Image(getClass().getResourceAsStream("osztaly.png"))));
        ((Stage)i.getDialogPane().getScene().getWindow()).getIcons().add(new Image(getClass().getResourceAsStream("osztaly.png")));
        i.showAndWait();
    }

    public void Gondol_fiu() {
        bpt.setSelected(false);
        amf.setSelected(false);
        fpt.setSelected(false);
        String[] fiuk = {"János", "László", "Tibor", "Gábor", "Marcell"};
        int n = (int) Math.floor(Math.random()*5);
        nev.setText(fiuk[n]);
        fiu.setSelected(true);
        KepChange();
        n = (int) Math.floor(Math.random()*2);
        if(n == 1){
            amf.setSelected(true);
        }
        n = (int) Math.floor(Math.random()*2);
        if(n == 1){
            bpt.setSelected(true);
        }
        n = (int) Math.floor(Math.random()*2);
        if(n == 1){
            fpt.setSelected(true);
        }
    }

    public void Gondol_lany() {
        bpt.setSelected(false);
        amf.setSelected(false);
        fpt.setSelected(false);
        String[] lanyok = {"Emese", "Sára", "Réka", "Anna", "Liza"};
        int n = (int) Math.floor(Math.random()*5);
        nev.setText(lanyok[n]);
        lany.setSelected(true);
        KepChange();
        n = (int) Math.floor(Math.random()*2);
        if(n == 1){
            amf.setSelected(true);
        }
        n = (int) Math.floor(Math.random()*2);
        if(n == 1){
            bpt.setSelected(true);
        }
        n = (int) Math.floor(Math.random()*2);
        if(n == 1){
            fpt.setSelected(true);
        }
    }

    public void Exit() {
        Platform.exit();
    }

    public void Save() {
        File f = fc.showSaveDialog(nev.getScene().getWindow());
        if( f != null) mentes(f);
    }

    public void Open() {
        File f = fc.showOpenDialog(nev.getScene().getWindow());
        if( f != null) betolt(f);
    }

    private void mentes(File f){
        PrintWriter ki = null;
        try {
            ki = new PrintWriter(f, "utf-8");
            for(String i : lista.getItems()){
                ki.printf("%s\r\n", i);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            if( ki != null) ki.close();
        }
    }

    private void betolt(File f){
        Scanner be = null;
        try {
            be = new Scanner(f, "utf-8");
            while(be.hasNextLine()){
                lista.getItems().add(be.nextLine());
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            if( be != null) be.close();
        }
    }
}