package com.example.gestortareas;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.stage.Stage;
import java.io.IOException;

public class Launcher extends Application {
    @Override
    public void start(Stage stage) throws IOException {
        FXMLLoader fxmlLoader = new FXMLLoader(Launcher.class.getResource("/com/example/gestortareas/view/MainView.fxml"));
        Scene scene = new Scene(fxmlLoader.load(), 400, 500);
        stage.setTitle("Mi Gestor de Tareas");
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch();
    }
}
