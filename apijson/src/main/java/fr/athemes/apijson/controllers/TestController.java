package fr.athemes.apijson.controllers;

import java.io.FileWriter;
import java.io.IOException;

import org.json.simple.JSONObject;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {
    
    @GetMapping("/createJSON/{nom}")
    public String createJson(@PathVariable String nom) throws IOException {
        JSONObject pieces = new JSONObject();
        JSONObject piece = new JSONObject();
        JSONObject elements = new JSONObject();
        JSONObject element = new JSONObject();
        element.put("nomElement","Lavabo");
        element.put("id","44444");
        elements.put("Element 1",element);
        piece.put("id", "1234");
        piece.put("Elements",elements);
        pieces.put("Pièces",piece);
        FileWriter file = new FileWriter("JSONS/" + nom + ".json");
        file.write(pieces.toJSONString());
        file.close();
        return "Réussi " + nom;
    }
}
