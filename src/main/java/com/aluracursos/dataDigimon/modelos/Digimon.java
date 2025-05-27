package com.aluracursos.dataDigimon.modelos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class Digimon {

    @JsonProperty("name")
    private String nombre;
    private String img;
    private String level;

    public Digimon(){

    }

    public Digimon(String nombre, String img, String level) {
        this.nombre = nombre;
        this.img = img;
        this.level = level;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }

    @Override
    public String toString() {
        return "Digimon{" +
                "nombre='" + nombre + '\'' +
                ", img='" + img + '\'' +
                ", level='" + level + '\'' +
                '}';
    }

}
