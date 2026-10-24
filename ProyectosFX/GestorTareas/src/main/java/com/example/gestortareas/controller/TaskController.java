package com.example.gestortareas.controller;

import com.example.gestortareas.model.Tarea;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.ListView;
import javafx.scene.control.TextField;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class TaskController {
    @FXML
    private TextField campoTarea;
    @FXML
    private ListView<Tarea> listaTareas;

    private ObservableList<Tarea> tareasObservable;

    // Define la ruta del archivo donde se guardarán las tareas
    private final Path RUTA_ARCHIVO = Paths.get("tareas.txt");

    @FXML
    public void initialize() {
        tareasObservable = FXCollections.observableArrayList();
        cargarTareas(); // Carga las tareas guardadas antes de mostrarlas
        listaTareas.setItems(tareasObservable);
    }

    @FXML
    public void agregarTarea() {
        String texto = campoTarea.getText();
        if (texto != null && !texto.trim().isEmpty()) {
            tareasObservable.add(new Tarea(texto.trim()));
            campoTarea.clear();
            guardarTareas(); // Guarda la lista actualizada
        }
    }

    @FXML
    public void eliminarTarea() {
        Tarea tareaSeleccionada = listaTareas.getSelectionModel().getSelectedItem();
        if (tareaSeleccionada != null) {
            tareasObservable.remove(tareaSeleccionada);
            guardarTareas(); // Guarda la lista tras eliminar
        }
    }

    private void guardarTareas() {
        try {
            List<String> lineas = new ArrayList<>();
            for (Tarea tarea : tareasObservable) {
                lineas.add(tarea.getTitulo());
            }
            Files.write(RUTA_ARCHIVO, lineas);
        } catch (IOException e) {
            System.out.println("Error al guardar las tareas: " + e.getMessage());
        }
    }

    private void cargarTareas() {
        if (Files.exists(RUTA_ARCHIVO)) {
            try {
                List<String> lineas = Files.readAllLines(RUTA_ARCHIVO);
                for (String linea : lineas) {
                    tareasObservable.add(new Tarea(linea));
                }
            } catch (IOException e) {
                System.out.println("Error al cargar las tareas: " + e.getMessage());
            }
        }
    }
}