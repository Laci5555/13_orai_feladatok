package com.example.ertelemszeru;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.*;
import javafx.scene.control.cell.PropertyValueFactory;

import java.sql.*;
import java.util.ArrayList;

public class HelloController {
    public class Email{
        String felado;
        String cimzett;
        String idopont;
        int hossz;
        public Email(String felado,String cimzett,String idopont,int hossz){
            this.felado = felado;
            this.cimzett = cimzett;
            this.idopont = idopont;
            this.hossz = hossz;
        }

        public String getFelado() { return felado; }
        public String getCimzett() { return cimzett; }
        public String getIdopont() { return idopont; }
        public int getHossz() { return hossz; }

    }

    @FXML private TableView<Email> tabla;
    @FXML private TableColumn<Email, String> feladoCol;
    @FXML private TableColumn<Email, String> cimzettCol;
    @FXML private TableColumn<Email, String> idopontCol;
    @FXML private TableColumn<Email, Integer> hosszCol;
    @FXML private ComboBox<String> felado, cimzett;
    @FXML private TextField idopont,hossz;

    private Connection con = null;
    private Statement stm = null;

    ArrayList<Integer> kaz = new ArrayList<>();

    public void initialize(){
        try {
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/levelek","root","");
            stm = con.createStatement();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        feladoCol.setCellValueFactory(new PropertyValueFactory<>("felado"));
        cimzettCol.setCellValueFactory(new PropertyValueFactory<>("cimzett"));
        idopontCol.setCellValueFactory(new PropertyValueFactory<>("idopont"));
        hosszCol.setCellValueFactory(new PropertyValueFactory<>("hossz"));

        listTabla();
        listCimek();
    }



    private void listTabla(){
        String sql = "select kaz,(select cim from cimek where caz=ki) as felado,(select cim from cimek where caz=kinek) as cimzett,mikor,hossz from kuldott order by mikor;";
        tabla.getItems().clear();
        kaz.clear();
        try {
            ResultSet res = stm.executeQuery(sql);
            while (res.next()){
                tabla.getItems().add(new Email(res.getString("felado"), res.getString("cimzett"), res.getString("mikor"), res.getInt("hossz")));
                kaz.add(res.getInt("kaz"));
            }
        } catch (SQLException e) {throw new RuntimeException(e);}
    }

    private void listCimek(){
        String sql = "select cim from cimek";
        try {
            ResultSet res = stm.executeQuery(sql);
            while (res.next()){
                felado.getItems().add(res.getString("cim"));
                cimzett.getItems().add(res.getString("cim"));
            }
        } catch (SQLException e) {throw new RuntimeException(e);}
    }

    @FXML private void deleteSor(){
        int i = tabla.getSelectionModel().getSelectedIndex();
        //System.out.printf("%d", i);
        if(i != -1){
            int id = kaz.get(i);
            String sql = "delete from kuldott where kaz="+id;
            try {
                int aff = stm.executeUpdate(sql);
                listTabla();
            } catch (SQLException e) {throw new RuntimeException(e);}
        }
    }

    @FXML private void addSor(){
        int f = felado.getSelectionModel().getSelectedIndex()+1;
        int c = cimzett.getSelectionModel().getSelectedIndex()+1;
        String i = idopont.getText();
        int h = Integer.parseInt(hossz.getText());
        String sql = String.format("insert into kuldott set ki=%d, kinek=%d, mikor='%s', hossz=%d", f,c,i,h);
        try {
            int aff = stm.executeUpdate(sql);
            listTabla();
        } catch (SQLException e) {throw new RuntimeException(e);}
    }

    @FXML private void Select(){
        int i = tabla.getSelectionModel().getSelectedIndex();
        if(i == -1){
            return;
        }
        Email email  = tabla.getItems().get(i);
        felado.getSelectionModel().select(email.felado);
        cimzett.getSelectionModel().select(email.cimzett);
        idopont.setText(email.idopont);
        hossz.setText(email.hossz+"");
    }

    @FXML private void Update(){
        int index = tabla.getSelectionModel().getSelectedIndex();
        if(index==-1){return;}
        int id = kaz.get(index);

        int f = felado.getSelectionModel().getSelectedIndex()+1;
        int c = cimzett.getSelectionModel().getSelectedIndex()+1;
        String i = idopont.getText();
        int h = Integer.parseInt(hossz.getText());
        String sql = String.format("update kuldott set ki=%d, kinek=%d, mikor='%s', hossz=%d where kaz=%d", f,c,i,h,id);
        try {
            int aff = stm.executeUpdate(sql);
            listTabla();
        } catch (SQLException e) {throw new RuntimeException(e);}
    }
}