package fr.athemes.apijson.controllers;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import fr.athemes.apijson.Edl;
import jxl.Workbook;
import jxl.format.Colour;
import jxl.write.Label;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;

@RestController
@CrossOrigin
@RequestMapping("/EXCEL")
public class ExcelController {
    public File[] getAllFile(String url) {
        File folder = new File(url);
        File[] listOfFolders = folder.listFiles();
        return listOfFolders;
    }
    
    @GetMapping("/{residence}/{dossier}")
    public void createExcel(@PathVariable String residence,@PathVariable String dossier) throws IOException, WriteException {
        List<Edl> edls = new ArrayList<>();
        int index = 0;
        if (getAllFile("EdlTemplates/" + residence + "/" + dossier) != null) {
            for (File file : getAllFile("EdlTemplates/" + residence + "/" + dossier)) {
                if(file.isFile()) {
                    Scanner sc = new Scanner(file);
                    String json = sc.nextLine();
                    ObjectMapper objectMapper = new ObjectMapper();
                    Edl fiche = objectMapper.readValue(json, Edl.class);
                    edls.add(fiche);
                    sc.close();
                }
            }
        }
        WritableWorkbook wb = Workbook.createWorkbook(new File(dossier + ".xls"));
        for (Edl edl : edls) {
            WritableSheet ws = wb.createSheet(edl.numeroEtage+edl.numeroAppartement, index);
            WritableCellFormat headerFormat = new WritableCellFormat();
            WritableFont font = new WritableFont(WritableFont.ARIAL, 16, WritableFont.BOLD);
            headerFormat.setFont(font);
            headerFormat.setBackground(Colour.LIGHT_BLUE);
            headerFormat.setWrap(true);

            Label headerLabel = new Label(0, 0, "Name", headerFormat);
            ws.setColumnView(0, 60);
            ws.addCell(headerLabel);

            headerLabel = new Label(1, 0, "Age", headerFormat);
            ws.setColumnView(0, 40);
            ws.addCell(headerLabel);
            WritableCellFormat cellFormat = new WritableCellFormat();
            cellFormat.setWrap(true);

            Label cellLabel = new Label(0, 2, "John Smith", cellFormat);
            ws.addCell(cellLabel);
            index++;
        }
        wb.write();
        wb.close();
    }
}