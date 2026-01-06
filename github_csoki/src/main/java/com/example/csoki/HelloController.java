package com.example.csoki;

import com.google.gson.Gson;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.PropertyValueFactory;
import javafx.scene.input.MouseEvent;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class HelloController {
    @FXML private TextField nev,suly,kcal;


    public class Csoki{
        public String id;
        public String nev;
        public String suly;
        public String kcal;


        public Csoki(String id, String nev, String suly, String kcal){
            this.id = id;
            this.nev = nev;
            this.suly = suly;
            this.kcal = kcal;
        }

        public String getNev(){
            return nev;
        }public String getSuly(){
            return suly;
        }public String getKcal(){
            return kcal;
        }
    }
    @FXML private TableView<Csoki> tabla;

    public void fillTabla(){
        String uri = "http://10.201.2.19:88/csokik/";
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = null;
        try {
            request = HttpRequest.newBuilder().uri(new URI(uri)).build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String jsonString = response.body();
            Csoki[] adatok = new Gson().fromJson(jsonString, Csoki[].class);
            tabla.getItems().setAll(adatok);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void initialize(){
        var columns = tabla.getColumns();
        columns.get(0).setCellValueFactory(new PropertyValueFactory<>("nev"));
        columns.get(1).setCellValueFactory(new PropertyValueFactory<>("suly"));
        columns.get(2).setCellValueFactory(new PropertyValueFactory<>("kcal"));

        fillTabla();
    }

    public void add() {
        try {
            String jsonData = new Gson().toJson(new Csoki(
                    "",
                    nev.getText(),
                    suly.getText(),
                    kcal.getText()
            ));
            System.out.println(jsonData);
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("http://10.201.2.19:88/csoki/"))
                    .header("Content-Type", "application/json")
                    .POST(HttpRequest.BodyPublishers.ofString(jsonData))
                    .build();
            client.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        fillTabla();
    }

    public void upd() {
        try {
            String i = tabla.getSelectionModel().getSelectedItem().id;
            String jsonData = new Gson().toJson(new Csoki(
                    i,
                    nev.getText(),
                    suly.getText(),
                    kcal.getText()
            ));
            System.out.println(jsonData);
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("http://10.201.2.19:88/csoki/"))
                    .header("Content-Type", "application/json")
                    .PUT(HttpRequest.BodyPublishers.ofString(jsonData))
                    .build();
            client.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        fillTabla();
    }

    public void del() {
        try {
            String i = tabla.getSelectionModel().getSelectedItem().id;
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI("http://10.201.2.19:88/csoki?id="+i))
                    .header("Content-Type", "application/json")
                    .DELETE()
                    .build();
            client.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        fillTabla();
    }
}