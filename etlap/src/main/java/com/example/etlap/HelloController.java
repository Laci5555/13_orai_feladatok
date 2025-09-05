package com.example.etlap;

import javafx.fxml.FXML;
import javafx.scene.control.Label;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Random;
import java.util.Scanner;

public class HelloController {

    @FXML private Label etelsor;
    @FXML private Label Draga;
    @FXML private Label lbatlag;
    @FXML private Label lbsertes;

    private class Etel {
        public String tipus;
        public String nev;
        public int ar;

        public Etel(String sor){
            String[] s = sor.split(";");
            tipus = s[0];
            nev = s[1];
            ar = Integer.parseInt(s[2]);
        }
    }

    private ArrayList<Etel> etelek = new ArrayList<>();
    private int etelID = 0;






    public void initialize(){
        betolt("etlap.txt");
        //System.out.printf("Adataok száma: %d\n", etelek.size());
        etelsor.setText(etelek.size() + " db / " + (etelID+1) + " : " + etelek.get(etelID).nev + " (" + etelek.get(etelID).ar + ",-Ft)");
    }

    @FXML private void onKovetkezoClick(){
        if(etelID < etelek.size()-1){
            etelID++;
            etelsor.setText(etelek.size() + " db / " + (etelID+1) + " : " + etelek.get(etelID).nev + " (" + etelek.get(etelID).ar + ",-Ft)");
        }
    }

    @FXML private void onElozoClick(){
        if(etelID > 0){
            etelID--;
            etelsor.setText(etelek.size() + " db / " + (etelID+1) + " : " + etelek.get(etelID).nev + " (" + etelek.get(etelID).ar + ",-Ft)");
        }
    }

    @FXML private void onDragaClick() {
        int max = etelek.get(0).ar;
        for(int i = 1; i< etelek.size(); i++){
            if(etelek.get(i).ar > max){
                max = etelek.get(i).ar;
            }
        }
        Draga.setText("A legdrágább ára: " + max + ",-Ft");
    }

    @FXML private void onAtlagClick(){
        int sum = 0;
        for(Etel i : etelek){
            sum+= i.ar;
        }
        double atlag = sum/etelek.size();
        lbatlag.setText("Átlagár: " + atlag + ",-Ft");
    }

    @FXML private void onSertesClick(){
        ArrayList<Integer> sertesszamok = new ArrayList<>();
        for(int i = 0; i < etelek.size(); i++){
            if(etelek.get(i).tipus.equals("Sertés")){
                sertesszamok.add(i+1);
            }
        }
        Random r = new Random();
        int rand = r.nextInt(sertesszamok.size());
        lbsertes.setText("Sertés étel sorszáma: " + (sertesszamok.get(rand)+1));
        etelsor.setText(etelek.size() + " db / " + (sertesszamok.get(rand)+1) + " : " + etelek.get(sertesszamok.get(rand)).nev + " (" + etelek.get(sertesszamok.get(rand)).ar + ",-Ft)");

    }

    private void betolt(String fajlnev){
        Scanner be = null;
        try {
            be = new Scanner(new File(fajlnev), "utf8");
            while (be.hasNextLine()) etelek.add(new Etel(be.nextLine()));
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }

    }

}