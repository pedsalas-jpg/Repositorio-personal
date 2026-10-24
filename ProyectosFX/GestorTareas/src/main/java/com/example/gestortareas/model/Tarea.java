package com.example.gestortareas.model;

public class Tarea {
    private String titulo;

    public Tarea(String titulo) {
        this.titulo = titulo;
    }

    public String getTitulo() {
        return titulo;
    }

    @Override
    public String toString() {
        return titulo;
    }
}
