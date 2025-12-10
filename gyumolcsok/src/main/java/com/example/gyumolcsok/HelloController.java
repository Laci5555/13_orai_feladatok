package com.example.gyumolcsok;

import com.google.gson.Gson;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class HelloController {

    @FXML private ListView<Gyumolcsok> lista;
    @FXML private ImageView kep;
    @FXML private Label suly,ar;


    public class Gyumolcsok {
        public long id;
        public String nev;

        @Override public String toString(){
            return this.nev;
        }
    }

    public class Info{
        public String ar;
        public String suly;
        public Kep kep;
    }

    public class Kep{
        public String jpg;
    }

    public class Gyumolcs{
        public long id;
        public String nev;
        public Info info;
    }

    public void initialize(){
        String uri = "http://10.201.2.19:88/lista/";
        HttpClient client = HttpClient.newHttpClient();
        HttpResponse<String> response = null;
        try {
            HttpRequest request = HttpRequest.newBuilder().uri(new URI(uri)).build();
            response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String jsonString = response.body();
            Gyumolcsok[] adatok = new Gson().fromJson(jsonString, Gyumolcsok[].class);
            lista.getItems().addAll(adatok);
            lista.getSelectionModel().select(0);
            Kivalaszt();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @FXML private void Kivalaszt(){
        Gyumolcsok selected = lista.getSelectionModel().getSelectedItem();
        if(selected == null) return;

        try {
            String uri = "http://10.201.2.19:88/adat?id="+selected.id; // Ezt akarjuk elkérni
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = null;
            request = HttpRequest.newBuilder().uri(new URI(uri)).build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            String jsonString = response.body();

            Gyumolcs gyumolcs = new Gson().fromJson(jsonString, Gyumolcs.class);
            ar.setText(gyumolcs.info.ar);
            suly.setText(gyumolcs.info.suly);
            kep.setImage(new Image("http://10.201.2.19:88/"+gyumolcs.info.kep.jpg));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}