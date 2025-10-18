package com.example.kutya;

import javafx.animation.Animation;
import javafx.animation.AnimationTimer;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseDragEvent;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.Pane;
import javafx.scene.shape.Circle;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class HelloController {

    @FXML Pane pnJatek;
    @FXML Circle circle;
    @FXML ImageView gazdi;
    @FXML Label lbTimer;


    private class Kutyus{
        public int x;
        public int y;
        public ImageView kep;
        public int speed = 2;

        public Kutyus(int x, int y, String kepnev){
            this.x = x; this.y = y;
            kep = new ImageView(new Image(getClass().getResourceAsStream("kutyus/" + kepnev + ".png")));
            kep.setTranslateX(-16); kep.setTranslateY(-16);
            kep.setLayoutX(x); kep.setLayoutY(y);
            pnJatek.getChildren().add(kep);
        }

        public void mozgat(){
            int tav = (int)Math.sqrt((x-gX)*(x-gX) + (y-gY)*(y-gY));
            if(tav > 60){
                if(gX > x) x+= speed; else if(gX < x) x -= speed;
                if(gY > y) y+= speed; else if(gY < y) y -= speed;
                kep.setLayoutX(x); kep.setLayoutY(y);
            }
        }

        public void torol(){
            //pnJatek.getChildren().remove(kep);
            kep.setOpacity(0.1);
        }
    }

    private ArrayList<Kutyus> kutyakok = new ArrayList<>();
    private int gX = 300, gY = 300;

    private AnimationTimer timer;
    private long elozo;

    public void initialize(){
        kutyakok.add(new Kutyus((int)(Math.random()*568+16), (int)(Math.random()*568+16), "kutyus"));
        timer = new AnimationTimer() {
            @Override
            public void handle(long ido){
                lbTimer.setText(String.format("%d ns", ido-elozo));
                for (Kutyus kuty : kutyakok) kuty.mozgat();
                elozo = ido;
            }
        };
        timer.start();
    }

    @FXML private void onKutyaClick(){kutyakok.add(new Kutyus((int)(Math.random()*568+16), (int)(Math.random()*568+16), "kutyus"));}
    @FXML private void onKutya2Click(){kutyakok.add(new Kutyus((int)(Math.random()*568+16), (int)(Math.random()*568+16), "capa"));}
    @FXML private void onKutya3Click(){kutyakok.add(new Kutyus((int)(Math.random()*568+16), (int)(Math.random()*568+16), "pingvin"));}
    @FXML private void onKutya4Click(){kutyakok.add(new Kutyus((int)(Math.random()*568+16), (int)(Math.random()*568+16), "rak"));}

    @FXML private void MouseMoved(MouseEvent event){
        int mx = (int)event.getX();
        int my = (int)event.getY();
        gX = mx; if(gX < 61) gX = 61; else if(gX > 539) gX = 539;
        gY = my; if(gY < 61) gY = 61; else if(gY > 539) gY = 539;
        gazdi.setLayoutX(gX); gazdi.setLayoutY(gY);
        circle.setCenterX(gX); circle.setCenterY(gY);
    }

    @FXML private void alaphelyzet(){
        for (Kutyus kuty : kutyakok) kuty.torol();
        kutyakok.clear();
        kutyakok.add(new Kutyus((int)(Math.random()*568+16), (int)(Math.random()*568+16), "kutyus"));
    }
}