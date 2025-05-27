package com.aluracursos.dataDigimon.controles;


import com.aluracursos.dataDigimon.modelos.Digimon;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@RestController
public class DigimonControl {

    private static final String API_URL = "https://digimon-api.vercel.app/api/digimon";

    @GetMapping("/digimon")
    public Map<String, List<Digimon>> ListaDigimonPorNivel() {
        RestTemplate restTemplate = new RestTemplate();

        // Obtener todos los Digimon desde la API
        Digimon[] digimonArray = restTemplate.getForObject(API_URL, Digimon[].class);

        // Agrupar por nivel
        if (digimonArray == null) {
            return Collections.emptyMap();
        }

        return Arrays.stream(digimonArray)
                .collect(Collectors.groupingBy(Digimon::getLevel));
    }
}
