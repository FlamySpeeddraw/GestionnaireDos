package fr.athemes.apijson.controllers;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import org.apache.commons.io.FileUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import fr.athemes.apijson.Edl;
import fr.athemes.apijson.Residence;

@RestController
@CrossOrigin
@RequestMapping("/JSON")
public class JsonController {

    @GetMapping("/residences")
    public List<Residence> getAllResidences() throws FileNotFoundException, JsonMappingException, JsonProcessingException {
        List<Residence> residences = new ArrayList<>();
        for (File residence : getAllFile("EdlTemplates")) {
            for (File dossier : getAllFile("EdlTemplates/" + residence.getName())) {
                List<Edl> fiches = new ArrayList<>();
                for (File file : getAllFile("EdlTemplates/" + residence.getName() + "/" + dossier.getName())) {
                    if(file.isFile()) {
                        Scanner sc = new Scanner(file);
                        String json = sc.nextLine();
                        ObjectMapper objectMapper = new ObjectMapper();
                        Edl fiche = objectMapper.readValue(json, Edl.class);
                        fiches.add(fiche);
                        sc.close();
                    }
                }
                residences.add(new Residence(residence.getName(), dossier.getName(),fiches));
            }
        }
        return residences;
    }

    @DeleteMapping("/{residence}/{dossier}/delete")
    public boolean deleteResidence(@PathVariable String residence,@PathVariable String dossier) {
        File[] listOfFolders = getAllFile("EdlTemplates/" + residence + "/" + dossier);
        for (File file : listOfFolders) {
            file.delete();
        }
        new File("EdlTemplates/" + residence + "/" + dossier).delete();
        File residenceFolder = new File("EdlTemplates/" + residence);
        if (residenceFolder.length() != 0) {
            return false;
        }
        return residenceFolder.delete();
    }

    @PostMapping("/residence/create")
    public boolean createResidence(@RequestBody Residence residence) {
        File folder = new File("EdlTemplates/" + residence.nom + "/" + residence.dossier);
        return folder.mkdirs();
    }

    @PostMapping("/{residence}/{dossier}/{newResidence}/{newDossier}")
    public boolean updateNoms(@PathVariable String residence, @PathVariable String dossier, @PathVariable String newResidence, @PathVariable String newDossier) throws IOException {
        File copy = new File("EdlTemplates/" + residence + "/" + dossier);
        File newFile = new File("EdlTemplates/" + newResidence + "/" + newDossier);
        FileUtils.copyDirectory(copy, newFile);
        return deleteResidence(residence, dossier);
    }

    @PostMapping("/{residence}/{dossier}/save")
    public void saveEdl(@PathVariable String residence,@PathVariable String dossier,@RequestBody Edl edl) throws IOException {
        File json = new File("EdlTemplates/" + residence + "/" + dossier + "/" + edl.id + ".json");
        ObjectMapper mapper = new ObjectMapper();
        String jsonString = mapper.writeValueAsString(edl);
        BufferedWriter writer = new BufferedWriter(new FileWriter(json));
        writer.write(jsonString);
        writer.close();
    }

    public File[] getAllFile(String url) {
        File folder = new File(url);
        File[] listOfFolders = folder.listFiles();
        return listOfFolders;
    }
}