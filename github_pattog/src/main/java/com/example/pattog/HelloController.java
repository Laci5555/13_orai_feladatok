package com.example.pattog;

import javafx.animation.AnimationTimer;
import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.scene.control.Alert;
import javafx.scene.control.CheckMenuItem;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;

import java.awt.*;
import java.util.ArrayList;

public class HelloController {
    @FXML private Pane pane;
    @FXML private HBox hdoboz;
    @FXML private Label darab;
    @FXML private CheckMenuItem fut;

    private class Ball{
        private int x;
        private int y;
        private int dx;
        private int dy;
        private int speed;
        private int szog;
        private ImageView kep;

        public Ball(int id){
            speed = (int)(Math.random()*11+5);
            szog = (int)(Math.random()*11+5);
            x = 100; dx = speed*szog;
            y = 100; dy = speed*szog;
            kep = new ImageView(new Image(getClass().getResourceAsStream("ball"+id+".png")));
            kep.setTranslateX(-48);
            kep.setTranslateY(-48);
            kep.setLayoutX(x);
            kep.setLayoutY(y);
            pane.getChildren().add(kep);
        }

        public void mozgat(){
            int w = (int)pane.getWidth();
            int h = (int)pane.getHeight();
            if(y+48+dy > h ) dy=-speed; else if( y-48+dy < 0) dy = +speed;
            if(x+48+dx > w ) dx=-speed; else if( x-48+dx < 0) dx = +speed;
            x += dx;
            y += dy;
            kep.setLayoutX(x);
            kep.setLayoutY(y);
        }

    }

    private ArrayList<Ball> labdakok = new ArrayList<>();
    private AnimationTimer timer = null;

    public void initialize(){
        for(int i =0;i<6;i++){
            int ii = i;
            ImageView ivKep = new ImageView(new Image(getClass().getResourceAsStream("ball" + i + ".png")));
            ivKep.setFitWidth(96); ivKep.setFitHeight(96);
            ivKep.setOnMousePressed(e -> ujLabda(ii));
            hdoboz.getChildren().add(ivKep);
        }
        ujLabda((int)(Math.random()*6));
        timer = new AnimationTimer() {
            @Override
            public void handle(long l) {
                for(Ball b : labdakok) b.mozgat();
            }
        };
        timer.start();
    }

    @FXML private void ujLabda(int id){
        labdakok.add(new Ball(id));
        darab.setText(labdakok.size() + "");
    }

    @FXML private void nevjegy(){
        Alert i = new Alert(Alert.AlertType.INFORMATION);
        i.setHeaderText(null);
        i.setContentText("ha ha ha");
        i.setTitle("Névjegy");
        i.showAndWait();
    }

    @FXML private void kilepes(){
        Platform.exit();
    }

    @FXML private void onFut(){
        if(fut.isSelected()) timer.start(); else timer.stop();
    }
}

































