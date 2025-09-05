package com.example.demo;

import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Scanner;

public class HelloController {
    @FXML private ListView<String> lista;

    private class Diak{
        public int id;
        public String vnev;
        public String knev;
        public char fl;
        public String osztaly;
        public String datum;
        public String varos;
        public int magas;

        public Diak(String sor) {
            String[] s = sor.split(";");
            id = Integer.parseInt(s[0]);
            vnev = s[1];
            knev = s[2];
            fl =s[3].charAt(0);
            datum = s[5];
            osztaly= s[4];
            varos = s[6];
            magas = Integer.parseInt(s[7]);

        }
    }

    private ArrayList<Diak> diakok = new ArrayList<>();

    public void initialize(){
        betolt("diakok.csv");
        System.out.printf("%d\n", diakok.size());
    }

    @FXML private void onMindenkiClick(){
        for (int i = 0; i< diakok.size();i++){
            Diak d = diakok.get(i);
            lista.getItems().add(d.vnev + " " + d.knev + " " + ", " + d.osztaly + " (" + d.varos + " " + d.datum + ", " + d.magas + " cm)");
        }
    }

    @FXML private void onSandorokClick(){
        lista.getItems().clear();
        for (int i = 0; i< diakok.size();i++) {
            Diak d = diakok.get(i);
            if (d.knev.equals("Sándor")) {
                lista.getItems().add(d.vnev + " " + d.knev + " " + ", " + d.osztaly + " (" + d.varos + " " + d.datum + ", " + d.magas + " cm)");
            }
        }
    }

    @FXML private void onKecskemetiClick(){
        lista.getItems().clear();
        for (int i = 0; i< diakok.size();i++) {
            Diak d = diakok.get(i);
            if (d.varos.equals("Kecskemét")) {
                lista.getItems().add(d.vnev + " " + d.knev + " " + ", " + d.osztaly + " (" + d.varos + " " + d.datum + ", " + d.magas + " cm)");
            }
        }
    }

    @FXML private void on1996Click(){
        lista.getItems().clear();
        for (int i = 0; i< diakok.size();i++) {
            Diak d = diakok.get(i);
            if (d.datum.contains("1996")) {
                lista.getItems().add(d.vnev + " " + d.knev + " " + ", " + d.osztaly + " (" + d.varos + " " + d.datum + ", " + d.magas + " cm)");
            }
        }
    }

    @FXML private void on10AClick(){
        lista.getItems().clear();
        for (int i = 0; i< diakok.size();i++) {
            Diak d = diakok.get(i);
            if (d.osztaly.equals("10/A")) {
                lista.getItems().add(d.vnev + " " + d.knev + " " + ", " + d.osztaly + " (" + d.varos + " " + d.datum + ", " + d.magas + " cm)");
            }
        }
    }

    @FXML private void onListaMenteseClick(){
        mentes("lista.txt");
    }

    private void mentes(String fajlnev){
        PrintWriter ki = null;
        try {
            ki = new PrintWriter(new File(fajlnev), "utf8");
            for (int i = 0;i<lista.getItems().size(); i++){
                ki.printf("%s\r\n", lista.getItems().get(i));
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if(ki != null){
                ki.close();
            }
        }
    }


    private void betolt(String fajlnev){
        Scanner be = null;
        try {
            be = new Scanner(new File(fajlnev), "utf-8");
            while (be.hasNextLine()) diakok.add(new Diak(be.nextLine()));
        } catch (Exception e) {
            e.printStackTrace();
        } finally{
            if(be != null){
                be.close();
            }
        }

    }

}