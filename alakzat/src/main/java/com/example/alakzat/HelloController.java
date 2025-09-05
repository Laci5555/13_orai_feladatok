package com.example.alakzat;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.ListView;
import javafx.scene.control.RadioButton;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

public class HelloController {

    @FXML private RadioButton piros,kek,zold,negyzet,kor,haromszog;
    @FXML private ListView<String> lista;
    @FXML private Label lb;
    @FXML private ImageView kep;

    public String elem1 = "Zöld";
    public String elem2 = "Háromszög";

    @FXML private void onMentesClick() {
        mentes("alakzat_lista.txt");
    }

    @FXML private void onTorolClick() {
        int index = lista.getSelectionModel().getSelectedIndex();
        if(index != -1){
            lista.getItems().remove(index);
            if(index >= lista.getItems().size()){
                index = lista.getItems().size()-1;
                lista.getSelectionModel().select((index));
            }
        }
    }

    @FXML private void onHozzaadClick() {
        lista.getItems().add(elem1 + " " + elem2);
        lista.getSelectionModel().select(lista.getItems().size()-1);
    }

    @FXML private void onRadioClick() {
        if(piros.isSelected()){
            elem1 = "Piros";
            lb.setStyle("-fx-background-color: #FF0000; -fx-border-color: black;");
        } else if(kek.isSelected()){
            elem1 = "Kék";
            lb.setStyle("-fx-background-color: #0000FF; -fx-border-color: black;");
        }else if(zold.isSelected()){
            elem1 = "Zöld";
            lb.setStyle("-fx-background-color: #00FF00; -fx-border-color: black;");

        }

        if(negyzet.isSelected()){
            elem2 = "Négyzet";
            kep.setImage(new Image(getClass().getResourceAsStream("icons/negyzet.png")));
        }else if (kor.isSelected()){
            elem2 = "Kör";
            kep.setImage(new Image(getClass().getResourceAsStream("icons/kor.png")));
        }else if(haromszog.isSelected()){
            elem2 = "Háromszög";
            kep.setImage(new Image(getClass().getResourceAsStream("icons/haromszog.png")));
        }
    }

    @FXML private void onListaPressed(){
        String item = lista.getSelectionModel().getSelectedItem();
        if(item != null){
            if(item.contains("Kék")){
                lb.setStyle("-fx-background-color: #0000FF; -fx-border-color: black;");
                kek.setSelected(true);
            }else if(item.contains("Piros")){
                lb.setStyle("-fx-background-color: #FF0000; -fx-border-color: black;");
                piros.setSelected(true);
            }else if(item.contains("Zöld")){
                zold.setSelected(true);
                lb.setStyle("-fx-background-color: #00FF00; -fx-border-color: black;");
            }

            if(item.contains("Négyzet")){
                negyzet.setSelected(true);
                kep.setImage(new Image(getClass().getResourceAsStream("icons/negyzet.png")));
            }else if(item.contains("Háromszög")){
                haromszog.setSelected(true);
                kep.setImage(new Image(getClass().getResourceAsStream("icons/haromszog.png")));
            } else if(item.contains("Kör")){
                kor.setSelected(true);
                kep.setImage(new Image(getClass().getResourceAsStream("icons/kor.png")));
            }
        }
    }

    private void mentes(String fajlnev){
        PrintWriter ki = null;
        try {
            ki = new PrintWriter(new File(fajlnev), "utf8");
            for(int i = 0;i<lista.getItems().size();i++){
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
}