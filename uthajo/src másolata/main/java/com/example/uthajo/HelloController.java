package com.example.uthajo;

import javafx.animation.AnimationTimer;
import javafx.application.Platform;
import javafx.fxml.FXML;
import javafx.scene.ImageCursor;
import javafx.scene.control.Label;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.KeyCode;
import javafx.scene.input.KeyEvent;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.Pane;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Random;

public class HelloController {
    @FXML private Pane ur;
    @FXML private ImageView hajo;
    @FXML private Label highscore;

    public static ArrayList<Asteroid> asteroids = new ArrayList<>();
    public static int tick = 0;
    public static int score = 0;

    public static int playerX;
    public static int playerY;


    public static AnimationTimer anim;

    @FXML private void Move(MouseEvent e){
        if(anim == null) return;
        playerX = (int) Math.clamp(e.getX(), 50, 750);
        playerY = (int) Math.clamp(e.getY(), 50, 550);
        hajo.setLayoutX(playerX);
        hajo.setLayoutY(playerY);
    }

    public void Restart(KeyEvent e){
        if(e.getCode() == KeyCode.ESCAPE){
            if(anim == null){
                StartGame();
            }else{
                Platform.exit();
            }
        }
    }

    public void StartGame(){
        for(Asteroid asteroid : new ArrayList<>(asteroids)){
            asteroid.Destroy();
        }

        score = 0;
        highscore.setText("0");

        anim = new AnimationTimer() {
            @Override
            public void handle(long deltaNs) {
                if(tick == 1){
                    ur.getScene().setOnKeyPressed(e -> Restart(e));
                }

                tick += 1;

                if(tick % 10 == 0){
                    new Asteroid();
                }

                for(Asteroid asteroid : new ArrayList<>(asteroids)){
                    asteroid.Move();
                }
            }
        };
        anim.start();
    }

    public void initialize(){
        StartGame();
    }

    private class Asteroid{
        public static int[] sizes = {32, 48, 64, 72, 96};

        public int x;
        public int y;
        public int size;
        public int speed;
        public ImageView img;


        public Asteroid(){
            Random rng = new Random();

            x=850;
            y = rng.nextInt(500)+50;
            speed = rng.nextInt(8)+1;
            size = sizes[rng.nextInt(sizes.length)];

            img = new ImageView(new Image(getClass().getResourceAsStream("szikla" + size + ".png")));
            img.setTranslateX(-size / 2);
            img.setTranslateY(-size / 2);

            ur.getChildren().add(img);
            asteroids.add(this);

            Move();
        }

        public void Move(){
            x -= speed;
            img.setLayoutX(x);
            img.setLayoutY(y);

            if(x < 50){
                Destroy();
            }

            if(Math.abs(x - playerX) < size / 2 && Math.abs(y - playerY) < size / 2){
                anim.stop();
                anim = null;
            }
        }

        public void Destroy(){
            ur.getChildren().remove(img);
            asteroids.remove(this);

            score++;
            highscore.setText(Integer.toString(score));
        }
    }

}