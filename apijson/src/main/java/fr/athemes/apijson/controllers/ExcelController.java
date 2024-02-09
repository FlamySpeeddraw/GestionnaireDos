package fr.athemes.apijson.controllers;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import fr.athemes.apijson.Edl;
import fr.athemes.apijson.Element;
import fr.athemes.apijson.Piece;

@RestController
@CrossOrigin
@RequestMapping("/EXCEL")
public class ExcelController {
    public File[] getAllFile(String url) {
        File folder = new File(url);
        File[] listOfFolders = folder.listFiles();
        return listOfFolders;
    }

    @GetMapping("/{residence}/{dossier}/OPR")
    public void createOpr(@PathVariable String residence,@PathVariable String dossier) throws IOException {
        long start = System.currentTimeMillis();
        List<Edl> edls = new ArrayList<>();
        Workbook wb = new XSSFWorkbook();
        String prestation = "";
        OutputStream fileOut = new FileOutputStream(dossier + " OPR.xlsx");
        if (getAllFile("EdlTemplates/" + residence + "/" + dossier) != null) {
            for (File file : getAllFile("EdlTemplates/" + residence + "/" + dossier)) {
                if(file.isFile() && !file.getName().equals("data.data")) {
                    Scanner sc = new Scanner(file);
                    String json = sc.nextLine();
                    ObjectMapper objectMapper = new ObjectMapper();
                    Edl fiche = objectMapper.readValue(json, Edl.class);
                    edls.add(fiche);
                    sc.close();
                }
                if (file.getName().equals("data.data")) {
                    Scanner sc = new Scanner(file);
                    prestation = sc.nextLine();
                    sc.close();
                }
            }
        }
        for (Edl edl : edls) {
            Sheet ws = wb.createSheet(edl.numeroEtage + "." + edl.numeroAppartement);
            ws.setColumnWidth(1, 8192);
            ws.setColumnWidth(2, 1480);
            ws.setColumnWidth(3, 1480);
            ws.setColumnWidth(4, 1480);
            ws.setColumnWidth(5, 740);
            ws.setColumnWidth(6, 1200);
            ws.setColumnWidth(7, 740);
            ws.setColumnWidth(8, 1200);
            ws.setColumnWidth(9, 15110);
            ws.setColumnWidth(10, 1800);
            ws.setColumnWidth(11, 1800);
            ws.setColumnWidth(12, 1800);
            ws.setColumnWidth(13, 1800);
            ws.setColumnWidth(14, 15110);

            createHeaderOpr(wb, ws, edl, residence, prestation);
            int count = 10;
            for (Piece piece : edl.pieces) {
                createPieceEdl(wb, ws, piece,count);
                createPieceOpr(wb, ws, piece,count);
                count++;
                for (Element element : piece.elements) {
                    createElementEdl(wb, ws, element, count);
                    createElementOpr(wb, ws, element, count);
                    count++;
                }
                sepPieceEdl(wb, ws, count);
                sepPieceOpr(wb, ws, count);
                count++;
            }
            createObservationsGeneralesEdl(wb, ws, edl, count);
            createObservationsGeneralesOpr(wb, ws, edl, count);
        }
        wb.write(fileOut);
        fileOut.close();
        wb.close();
        long finish = System.currentTimeMillis();
        System.out.println(LocalDate.now() + " " + LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")) + " " + dossier + " " + residence + " excel opr Réussi --- Exec " + Long.toString(finish - start) + "ms");
    }
    
    @GetMapping("/{residence}/{dossier}/EDL")
    public void createEdl(@PathVariable String residence,@PathVariable String dossier) throws IOException {
        long start = System.currentTimeMillis();
        List<Edl> edls = new ArrayList<>();
        Workbook wb = new XSSFWorkbook();
        String prestation = "";
        OutputStream fileOut = new FileOutputStream(dossier + " EDL.xlsx");
        if (getAllFile("EdlTemplates/" + residence + "/" + dossier) != null) {
            for (File file : getAllFile("EdlTemplates/" + residence + "/" + dossier)) {
                if(file.isFile() && !file.getName().equals("data.data")) {
                    Scanner sc = new Scanner(file);
                    String json = sc.nextLine();
                    ObjectMapper objectMapper = new ObjectMapper();
                    Edl fiche = objectMapper.readValue(json, Edl.class);
                    edls.add(fiche);
                    sc.close();
                }
                if (file.getName().equals("data.data")) {
                    Scanner sc = new Scanner(file);
                    prestation = sc.nextLine();
                    sc.close();
                }
            }
        }
        for (Edl edl : edls) {
            Sheet ws = wb.createSheet(edl.numeroEtage + "." + edl.numeroAppartement);
            ws.setColumnWidth(1, 8192);
            ws.setColumnWidth(2, 1480);
            ws.setColumnWidth(3, 1480);
            ws.setColumnWidth(4, 1480);
            ws.setColumnWidth(5, 740);
            ws.setColumnWidth(6, 1200);
            ws.setColumnWidth(7, 740);
            ws.setColumnWidth(8, 1200);
            ws.setColumnWidth(9, 15110);

            createHeaderEdl(wb, ws, edl, residence, prestation);
            int count = 10;
            for (Piece piece : edl.pieces) {
                createPieceEdl(wb, ws, piece,count);
                count++;
                for (Element element : piece.elements) {
                    createElementEdl(wb, ws, element, count);
                    count++;
                }
                sepPieceEdl(wb, ws, count);
                count++;
            }
            createObservationsGeneralesEdl(wb, ws, edl, count);
        }
        wb.write(fileOut);
        fileOut.close();
        wb.close();
        long finish = System.currentTimeMillis();
        System.out.println(LocalDate.now() + " " + LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss")) + " " + dossier + " " + residence + " excel edl Réussi --- Exec " + Long.toString(finish - start) + "ms");
    }

    public void createHeaderEdl(Workbook wb, Sheet ws,Edl edl, String residence, String prestation) {
        byte[] rgb = new byte[3];
        rgb[0] = (byte) 0;
        rgb[1] = (byte) 112;
        rgb[2] = (byte) 192;
        XSSFColor bleu = new XSSFColor(rgb);

        Font font = wb.createFont();
        font.setBold(true);
        font.setColor(IndexedColors.WHITE.getIndex());
        font.setFontHeightInPoints((short) 12);

        Row row1 = ws.createRow(1);
        Row row2 = ws.createRow(2);

        Cell coinGauche1 = row1.createCell(1);
        Cell coinDroite1 = row1.createCell(9);
        Cell coinGauche2 = row2.createCell(1);
        Cell coinDroite2 = row2.createCell(9);

        CellStyle styleGauche1 = wb.createCellStyle();
        CellStyle styleDroite1 = wb.createCellStyle();
        CellStyle styleGauche2 = wb.createCellStyle();
        CellStyle styleDroite2 = wb.createCellStyle();

        styleGauche1.setBorderLeft(BorderStyle.MEDIUM);
        styleGauche1.setBorderTop(BorderStyle.MEDIUM);
        styleGauche1.setFillForegroundColor(bleu);
        styleGauche1.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        styleGauche1.setAlignment(HorizontalAlignment.CENTER);
        styleGauche1.setVerticalAlignment(VerticalAlignment.CENTER);
        styleGauche1.setFont(font);

        styleDroite1.setBorderRight(BorderStyle.MEDIUM);
        styleDroite1.setBorderTop(BorderStyle.MEDIUM);

        styleGauche2.setBorderLeft(BorderStyle.MEDIUM);
        styleGauche2.setBorderBottom(BorderStyle.MEDIUM);
        styleGauche2.setFillForegroundColor(bleu);
        styleGauche2.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        styleGauche2.setAlignment(HorizontalAlignment.CENTER);
        styleGauche2.setVerticalAlignment(VerticalAlignment.CENTER);
        styleGauche2.setFont(font);

        styleDroite2.setBorderRight(BorderStyle.MEDIUM);
        styleDroite2.setBorderBottom(BorderStyle.MEDIUM);

        coinGauche1.setCellStyle(styleGauche1);
        coinDroite1.setCellStyle(styleDroite1);
        coinGauche1.setCellValue(prestation);
        coinGauche2.setCellStyle(styleGauche2);
        coinDroite2.setCellStyle(styleDroite2);
        coinGauche2.setCellValue(residence);

        Row row3 = ws.createRow(3);
        Cell sepGauche = row3.createCell(1);
        Cell sepDroite = row3.createCell(9);
        CellStyle style3Gauche = wb.createCellStyle();
        CellStyle style3Droite = wb.createCellStyle();
        style3Gauche.setBorderLeft(BorderStyle.MEDIUM);
        style3Droite.setBorderRight(BorderStyle.MEDIUM);
        sepGauche.setCellStyle(style3Gauche);
        sepDroite.setCellStyle(style3Droite);

        Row row4 = ws.createRow(4);
        Cell refGauche = row4.createCell(1);
        Cell refDroite = row4.createCell(9);
        CellStyle style4Gauche = wb.createCellStyle();
        CellStyle style4Droite = wb.createCellStyle();
        style4Gauche.setBorderLeft(BorderStyle.MEDIUM);
        style4Gauche.setBorderTop(BorderStyle.MEDIUM);
        style4Gauche.setBorderBottom(BorderStyle.MEDIUM);
        style4Droite.setBorderRight(BorderStyle.MEDIUM);
        style4Droite.setBorderTop(BorderStyle.MEDIUM);
        style4Droite.setBorderBottom(BorderStyle.MEDIUM);
        style4Gauche.setFont(font);
        style4Gauche.setFillForegroundColor(bleu);
        style4Gauche.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style4Gauche.setAlignment(HorizontalAlignment.CENTER);
        style4Gauche.setVerticalAlignment(VerticalAlignment.CENTER);
        refGauche.setCellValue("REFERENCE LOGEMENT");
        refGauche.setCellStyle(style4Gauche);
        refDroite.setCellStyle(style4Droite);

        Row row5 = ws.createRow(5);
        Cell infosGauche = row5.createCell(1);
        Cell infosDroite = row5.createCell(9);
        CellStyle style5Gauche = wb.createCellStyle();
        CellStyle style5Droite = wb.createCellStyle();
        style5Gauche.setAlignment(HorizontalAlignment.CENTER);
        style5Gauche.setVerticalAlignment(VerticalAlignment.CENTER);
        style5Gauche.setBorderLeft(BorderStyle.MEDIUM);
        style5Droite.setBorderRight(BorderStyle.MEDIUM);
        infosGauche.setCellStyle(style5Gauche);
        infosDroite.setCellStyle(style5Droite);
        infosGauche.setCellValue("N° appartement : " + edl.numeroAppartement + "                Type : " + edl.typeAppartement + "                Bât : " + edl.numeroBat + "                Etage : " + edl.numeroEtage);

        Row row6 = ws.createRow(6);
        Cell DecisionGauche = row6.createCell(1);
        Cell DecisionDroite = row6.createCell(9);
        CellStyle style6Gauche = wb.createCellStyle();
        CellStyle style6Droite = wb.createCellStyle();
        style6Gauche.setBorderLeft(BorderStyle.MEDIUM);
        style6Gauche.setBorderTop(BorderStyle.MEDIUM);
        style6Gauche.setBorderBottom(BorderStyle.MEDIUM);
        style6Droite.setBorderRight(BorderStyle.MEDIUM);
        style6Droite.setBorderTop(BorderStyle.MEDIUM);
        style6Droite.setBorderBottom(BorderStyle.MEDIUM);
        style6Gauche.setFont(font);
        style6Gauche.setFillForegroundColor(bleu);
        style6Gauche.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style6Gauche.setAlignment(HorizontalAlignment.CENTER);
        style6Gauche.setVerticalAlignment(VerticalAlignment.CENTER);
        DecisionGauche.setCellValue("DECISION TRAVAUX");
        DecisionGauche.setCellStyle(style6Gauche);
        DecisionDroite.setCellStyle(style6Droite);

        Row row7 = ws.createRow(7);
        Cell sepGauche2 = row7.createCell(1);
        Cell sepDroite2 = row7.createCell(9);
        CellStyle style7Gauche = wb.createCellStyle();
        CellStyle style7Droite = wb.createCellStyle();
        style7Gauche.setBorderLeft(BorderStyle.MEDIUM);
        style7Droite.setBorderRight(BorderStyle.MEDIUM);
        sepGauche2.setCellStyle(style7Gauche);
        sepDroite2.setCellStyle(style7Droite);

        for (int i=2;i<9;i++) {
            Cell cell1 = row1.createCell(i);
            CellStyle style1 = wb.createCellStyle();
            style1.setBorderTop(BorderStyle.MEDIUM);
            cell1.setCellStyle(style1);

            Cell cell2 = row2.createCell(i);
            CellStyle style2 = wb.createCellStyle();
            style2.setBorderBottom(BorderStyle.MEDIUM);
            cell2.setCellStyle(style2);

            Cell cell4 = row4.createCell(i);
            CellStyle style4 = wb.createCellStyle();
            style4.setBorderTop(BorderStyle.MEDIUM);
            style4.setBorderBottom(BorderStyle.MEDIUM);
            cell4.setCellStyle(style4);

            Cell cell6 = row6.createCell(i);
            CellStyle style6 = wb.createCellStyle();
            style6.setBorderTop(BorderStyle.MEDIUM);
            style6.setBorderBottom(BorderStyle.MEDIUM);
            cell6.setCellStyle(style6);
        }

        for (int i=1;i<8;i++) {
            ws.addMergedRegion(new CellRangeAddress(i,i,1,9));
        }

        Font fontHead = wb.createFont();
        fontHead.setBold(true);

        Row row8 = ws.createRow(8);
        Row row9 = ws.createRow(9);

        Cell designation = row8.createCell(1);
        Cell designation2 = row9.createCell(1);
        designation.setCellValue("Désignations");
        CellStyle styleDesignations = wb.createCellStyle();
        CellStyle styleDesignations2 = wb.createCellStyle();
        styleDesignations.setAlignment(HorizontalAlignment.CENTER);
        styleDesignations.setVerticalAlignment(VerticalAlignment.CENTER);
        styleDesignations.setBorderTop(BorderStyle.MEDIUM);
        styleDesignations.setBorderLeft(BorderStyle.MEDIUM);
        styleDesignations.setBorderRight(BorderStyle.MEDIUM);
        styleDesignations2.setBorderBottom(BorderStyle.MEDIUM);
        styleDesignations2.setBorderLeft(BorderStyle.MEDIUM);
        styleDesignations2.setBorderRight(BorderStyle.MEDIUM);
        styleDesignations.setFont(fontHead);
        designation2.setCellStyle(styleDesignations2); 
        designation.setCellStyle(styleDesignations);       
        ws.addMergedRegion(new CellRangeAddress(8,9,1,1));

        Cell etat = row8.createCell(2);
        Cell etat2 = row8.createCell(3);
        Cell etat3 = row8.createCell(4);
        etat.setCellValue("Etat");
        CellStyle styleEtat = wb.createCellStyle();
        CellStyle styleEtat2 = wb.createCellStyle();
        CellStyle styleEtat3 = wb.createCellStyle();
        styleEtat.setAlignment(HorizontalAlignment.CENTER);
        styleEtat.setVerticalAlignment(VerticalAlignment.CENTER);
        styleEtat.setBorderTop(BorderStyle.MEDIUM);
        styleEtat.setBorderBottom(BorderStyle.MEDIUM);
        styleEtat2.setBorderTop(BorderStyle.MEDIUM);
        styleEtat2.setBorderBottom(BorderStyle.MEDIUM);
        styleEtat3.setBorderTop(BorderStyle.MEDIUM);
        styleEtat3.setBorderBottom(BorderStyle.MEDIUM);
        styleEtat.setFont(fontHead);
        etat.setCellStyle(styleEtat);
        etat2.setCellStyle(styleEtat2);
        etat3.setCellStyle(styleEtat3);
        ws.addMergedRegion(new CellRangeAddress(8,8,2,4));

        Cell etatPlus = row9.createCell(2);
        Cell etatEgal = row9.createCell(3);
        Cell etatMoins = row9.createCell(4);
        etatPlus.setCellValue("+");
        etatEgal.setCellValue("=");
        etatMoins.setCellValue("-");
        CellStyle stylePlus = wb.createCellStyle();
        CellStyle styleEgal = wb.createCellStyle();
        CellStyle styleMoins= wb.createCellStyle();
        stylePlus.setFont(fontHead);
        styleMoins.setFont(fontHead);
        styleEgal.setFont(fontHead);
        stylePlus.setVerticalAlignment(VerticalAlignment.CENTER);
        styleMoins.setAlignment(HorizontalAlignment.CENTER);
        styleEgal.setVerticalAlignment(VerticalAlignment.CENTER);
        stylePlus.setAlignment(HorizontalAlignment.CENTER);
        styleMoins.setVerticalAlignment(VerticalAlignment.CENTER);
        styleEgal.setAlignment(HorizontalAlignment.CENTER);
        stylePlus.setBorderRight(BorderStyle.THIN);
        styleEgal.setBorderRight(BorderStyle.THIN);
        etatPlus.setCellStyle(stylePlus);
        etatEgal.setCellStyle(styleEgal);
        etatMoins.setCellStyle(styleMoins);

        Cell aFaireHautGauche = row8.createCell(5);
        Cell aFaireHautDroite = row8.createCell(8);
        Cell aFaireBasGauche = row9.createCell(5);
        Cell aFaireBasDroite = row9.createCell(8);
        CellStyle styleAFaireHautGauche = wb.createCellStyle();
        CellStyle styleAFaireHautDroite = wb.createCellStyle();
        CellStyle styleAFaireBasGauche = wb.createCellStyle();
        CellStyle styleAFaireBasDroite = wb.createCellStyle();
        styleAFaireHautGauche.setFont(fontHead);
        styleAFaireHautGauche.setBorderLeft(BorderStyle.MEDIUM);
        styleAFaireHautGauche.setBorderTop(BorderStyle.MEDIUM);
        styleAFaireHautDroite.setBorderRight(BorderStyle.MEDIUM);
        styleAFaireHautDroite.setBorderTop(BorderStyle.MEDIUM);
        styleAFaireBasGauche.setBorderLeft(BorderStyle.MEDIUM);
        styleAFaireBasGauche.setBorderBottom(BorderStyle.MEDIUM);
        styleAFaireBasDroite.setBorderRight(BorderStyle.MEDIUM);
        styleAFaireBasDroite.setBorderBottom(BorderStyle.MEDIUM);
        styleAFaireHautGauche.setAlignment(HorizontalAlignment.CENTER);
        styleAFaireHautGauche.setVerticalAlignment(VerticalAlignment.CENTER);
        aFaireHautGauche.setCellValue("A faire");
        aFaireHautGauche.setCellStyle(styleAFaireHautGauche);
        aFaireHautDroite.setCellStyle(styleAFaireHautDroite);
        aFaireBasGauche.setCellStyle(styleAFaireBasGauche);
        aFaireBasDroite .setCellStyle(styleAFaireBasDroite);
        for (int i = 6 ; i < 8 ; i++) {
            CellStyle style = wb.createCellStyle();
            CellStyle style2 = wb.createCellStyle();
            style.setBorderTop(BorderStyle.MEDIUM);
            style2.setBorderBottom(BorderStyle.MEDIUM);
            Cell cell = row8.createCell(i);
            Cell cell2 = row9.createCell(i);
            cell.setCellStyle(style);
            cell2.setCellStyle(style2);
        }
        ws.addMergedRegion(new CellRangeAddress(8,9,5,8));

        Cell observation = row8.createCell(9);
        Cell observation2 = row9.createCell(9);
        observation.setCellValue("Observations");
        CellStyle styleobservations = wb.createCellStyle();
        CellStyle styleobservations2 = wb.createCellStyle();
        styleobservations.setAlignment(HorizontalAlignment.CENTER);
        styleobservations.setVerticalAlignment(VerticalAlignment.CENTER);
        styleobservations.setBorderTop(BorderStyle.MEDIUM);
        styleobservations.setBorderLeft(BorderStyle.MEDIUM);
        styleobservations.setBorderRight(BorderStyle.MEDIUM);
        styleobservations2.setBorderBottom(BorderStyle.MEDIUM);
        styleobservations2.setBorderLeft(BorderStyle.MEDIUM);
        styleobservations2.setBorderRight(BorderStyle.MEDIUM);
        styleobservations.setFont(fontHead);
        observation2.setCellStyle(styleobservations2); 
        observation.setCellStyle(styleobservations);       
        ws.addMergedRegion(new CellRangeAddress(8,9,9,9));

        row1.setHeightInPoints(15);
        row2.setHeightInPoints(15);
        row3.setHeightInPoints(12);
        row4.setHeightInPoints(15);
        row5.setHeightInPoints(40);
        row6.setHeightInPoints(15);
        row7.setHeightInPoints(12);
        row8.setHeightInPoints(15);
        row9.setHeightInPoints(12);

    }

    public void sepPieceEdl(Workbook wb, Sheet ws, int row) {
        Row sepRow = ws.createRow(row);
        Cell gauche = sepRow.createCell(1);
        Cell droite = sepRow.createCell(9);
        CellStyle styleGauche = wb.createCellStyle();
        CellStyle styleDroite = wb.createCellStyle();
        styleGauche.setBorderLeft(BorderStyle.MEDIUM);
        styleGauche.setBorderBottom(BorderStyle.MEDIUM);
        styleGauche.setBorderTop(BorderStyle.MEDIUM);
        styleDroite.setBorderRight(BorderStyle.MEDIUM);
        styleDroite.setBorderTop(BorderStyle.MEDIUM);
        styleDroite.setBorderBottom(BorderStyle.MEDIUM);
        gauche.setCellStyle(styleGauche);
        droite.setCellStyle(styleDroite);
        for (int i=2; i<9; i++) {
            Cell cell = sepRow.createCell(i);
            CellStyle style = wb.createCellStyle();
            style.setBorderBottom(BorderStyle.MEDIUM);
            style.setBorderTop(BorderStyle.MEDIUM);
            cell.setCellStyle(style);
        }
        ws.addMergedRegion(new CellRangeAddress(row,row,1,9));
        sepRow.setHeightInPoints(10);
    }

    public void createPieceEdl(Workbook wb, Sheet ws, Piece piece, int startRow) {
        byte[] rgb = new byte[3];
        rgb[0] = (byte) 84;
        rgb[1] = (byte) 202;
        rgb[2] = (byte) 248;
        XSSFColor vert = new XSSFColor(rgb);

        Font fontTitre = wb.createFont();
        fontTitre.setBold(true);

        Row start = ws.createRow(startRow);
        Cell startCell = start.createCell(1);
        CellStyle styleNom = wb.createCellStyle();
        styleNom.setVerticalAlignment(VerticalAlignment.CENTER);
        styleNom.setFont(fontTitre);
        styleNom.setBorderBottom(BorderStyle.MEDIUM);
        styleNom.setBorderLeft(BorderStyle.MEDIUM);
        styleNom.setBorderTop(BorderStyle.MEDIUM);
        styleNom.setFillForegroundColor(vert);
        styleNom.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        startCell.setCellValue(piece.nom.toUpperCase());
        startCell.setCellStyle(styleNom);
        for (int i=2;i<9;i++) {
            Cell cell = start.createCell(i);
            CellStyle style = wb.createCellStyle();
            style.setBorderBottom(BorderStyle.MEDIUM);
            style.setBorderTop(BorderStyle.MEDIUM);
            cell.setCellStyle(style);
        }
        Cell endCell = start.createCell(9);
        CellStyle styleEnd = wb.createCellStyle();
        styleEnd.setBorderBottom(BorderStyle.MEDIUM);
        styleEnd.setBorderRight(BorderStyle.MEDIUM);
        styleEnd.setBorderTop(BorderStyle.MEDIUM);
        styleEnd.setFillForegroundColor(vert);
        styleEnd.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        styleEnd.setVerticalAlignment(VerticalAlignment.CENTER);
        endCell.setCellValue("Observations en " + piece.nom.toLowerCase() + " :");
        endCell.setCellStyle(styleEnd);
        ws.addMergedRegion(new CellRangeAddress(startRow,startRow,1,8));
    }

    public void createElementEdl(Workbook wb, Sheet ws, Element element, int startRow) {
        Row row = ws.createRow(startRow);
        row.setHeightInPoints(30);

        Cell designation = row.createCell(1);
        designation.setCellValue(element.nomElement);
        CellStyle designationStyle = wb.createCellStyle();
        designationStyle.setBorderBottom(BorderStyle.THIN);
        designationStyle.setBorderLeft(BorderStyle.MEDIUM);
        designationStyle.setBorderRight(BorderStyle.MEDIUM);
        designationStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        designation.setCellStyle(designationStyle);

        Cell plus = row.createCell(2);
        if (element.etat == 1) {
            plus.setCellValue("X");
        }
        CellStyle plusStyle = wb.createCellStyle();
        if (element.etat == 0) {
            plusStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            plusStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        }
        plusStyle.setBorderBottom(BorderStyle.THIN);
        plusStyle.setBorderRight(BorderStyle.THIN);
        plusStyle.setAlignment(HorizontalAlignment.CENTER);
        plusStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        plus.setCellStyle(plusStyle);

        Cell egal = row.createCell(3);
        if (element.etat == 2) {
            egal.setCellValue("X");
        }
        CellStyle egalStyle = wb.createCellStyle();
        if (element.etat == 0) {
            egalStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            egalStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        }
        egalStyle.setBorderBottom(BorderStyle.THIN);
        egalStyle.setBorderRight(BorderStyle.THIN);
        egalStyle.setAlignment(HorizontalAlignment.CENTER);
        egalStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        egal.setCellStyle(plusStyle);

        Cell moins = row.createCell(4);
        if (element.etat == 3) {
            moins.setCellValue("X");
        }
        CellStyle moinsStyle = wb.createCellStyle();
        if (element.etat == 0) {
            moinsStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            moinsStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        }
        moinsStyle.setBorderBottom(BorderStyle.THIN);
        moinsStyle.setAlignment(HorizontalAlignment.CENTER);
        moinsStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        moins.setCellStyle(moinsStyle);

        Cell faireOui = row.createCell(5);
        if (element.faire.equals("oui")) {
            faireOui.setCellValue("X");
        }
        CellStyle faireOuiStyle = wb.createCellStyle();
        faireOuiStyle.setBorderLeft(BorderStyle.MEDIUM);
        faireOuiStyle.setAlignment(HorizontalAlignment.CENTER);
        faireOuiStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        faireOui.setCellStyle(faireOuiStyle);

        Cell faireOui2 = row.createCell(6);
        faireOui2.setCellValue("Oui");
        CellStyle faireOui2Style = wb.createCellStyle();
        faireOui2Style.setAlignment(HorizontalAlignment.CENTER);
        faireOui2Style.setVerticalAlignment(VerticalAlignment.CENTER);
        faireOui2.setCellStyle(faireOui2Style);

        Cell faireNon = row.createCell(7);
        if (element.faire.equals("non")) {
            faireNon.setCellValue("X");
        }
        CellStyle faireNonStyle = wb.createCellStyle();
        faireNonStyle.setAlignment(HorizontalAlignment.CENTER);
        faireNonStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        faireNon.setCellStyle(faireNonStyle);

        Cell faireNon2 = row.createCell(8);
        faireNon2.setCellValue("Non");
        CellStyle faireNon2Style = wb.createCellStyle();
        faireNon2Style.setBorderRight(BorderStyle.MEDIUM);
        faireNon2Style.setAlignment(HorizontalAlignment.CENTER);
        faireNon2Style.setVerticalAlignment(VerticalAlignment.CENTER);
        faireNon2.setCellStyle(faireNon2Style);

        Cell observations = row.createCell(9);
        observations.setCellValue(element.observations);
        CellStyle observationsStyle = wb.createCellStyle();
        observationsStyle.setBorderLeft(BorderStyle.MEDIUM);
        observationsStyle.setBorderRight(BorderStyle.MEDIUM);
        observationsStyle.setBorderBottom(BorderStyle.THIN);
        observationsStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        observationsStyle.setWrapText(true);
        observations.setCellStyle(observationsStyle);
    }

    public void createObservationsGeneralesEdl(Workbook wb, Sheet ws, Edl edl, int startRow) {
        byte[] rgb = new byte[3];
        rgb[0] = (byte) 84;
        rgb[1] = (byte) 202;
        rgb[2] = (byte) 248;
        XSSFColor vert = new XSSFColor(rgb);
        Font font = wb.createFont();
        font.setBold(true);

        Row row = ws.createRow(startRow);
        Cell observations = row.createCell(1);
        observations.setCellValue("Observations générales");
        CellStyle styleGauche = wb.createCellStyle();
        styleGauche.setBorderLeft(BorderStyle.MEDIUM);
        styleGauche.setBorderBottom(BorderStyle.MEDIUM);
        styleGauche.setBorderTop(BorderStyle.MEDIUM);
        styleGauche.setFont(font);
        styleGauche.setFillForegroundColor(vert);
        styleGauche.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        observations.setCellStyle(styleGauche);

        for (int i=2;i<9;i++) {
            Cell cell = row.createCell(i);
            CellStyle style = wb.createCellStyle();
            style.setBorderBottom(BorderStyle.MEDIUM);
            style.setBorderTop(BorderStyle.MEDIUM);
            cell.setCellStyle(style);
        }

        Cell observationsEnd = row.createCell(9);
        CellStyle styleDroite = wb.createCellStyle();
        styleDroite.setBorderRight(BorderStyle.MEDIUM);
        styleDroite.setBorderBottom(BorderStyle.MEDIUM);
        styleDroite.setBorderTop(BorderStyle.MEDIUM);
        observationsEnd.setCellStyle(styleDroite);

        ws.addMergedRegion(new CellRangeAddress(startRow,startRow,1,9));

        Row row2 = ws.createRow(startRow + 1);
        Cell observationsText = row2.createCell(1);
        observationsText.setCellValue(edl.observationsGenerales);
        CellStyle styleGaucheText = wb.createCellStyle();
        styleGaucheText.setBorderLeft(BorderStyle.MEDIUM);
        styleGaucheText.setBorderBottom(BorderStyle.MEDIUM);
        styleGaucheText.setBorderTop(BorderStyle.MEDIUM);
        styleGaucheText.setVerticalAlignment(VerticalAlignment.CENTER);
        styleGaucheText.setWrapText(true);
        observationsText.setCellStyle(styleGaucheText);

        for (int i=2;i<9;i++) {
            Cell cell = row2.createCell(i);
            CellStyle style = wb.createCellStyle();
            style.setBorderBottom(BorderStyle.MEDIUM);
            style.setBorderTop(BorderStyle.MEDIUM);
            cell.setCellStyle(style);
        }

        Cell observationsTextEnd = row2.createCell(9);
        CellStyle styleDroiteText = wb.createCellStyle();
        styleDroiteText.setBorderRight(BorderStyle.MEDIUM);
        styleDroiteText.setBorderBottom(BorderStyle.MEDIUM);
        styleDroiteText.setBorderTop(BorderStyle.MEDIUM);
        observationsTextEnd.setCellStyle(styleDroiteText);

        ws.addMergedRegion(new CellRangeAddress(startRow+1,startRow+1,1,9));
        row2.setHeightInPoints(75);
    }

    public void createHeaderOpr(Workbook wb, Sheet ws,Edl edl, String residence, String prestation) {
        byte[] rgb = new byte[3];
        rgb[0] = (byte) 0;
        rgb[1] = (byte) 112;
        rgb[2] = (byte) 192;
        XSSFColor bleu = new XSSFColor(rgb);

        Font font = wb.createFont();
        font.setBold(true);
        font.setColor(IndexedColors.WHITE.getIndex());
        font.setFontHeightInPoints((short) 12);

        Row row1 = ws.createRow(1);
        Row row2 = ws.createRow(2);

        Cell coinGauche1 = row1.createCell(1);
        Cell coinDroite1 = row1.createCell(14);
        Cell coinGauche2 = row2.createCell(1);
        Cell coinDroite2 = row2.createCell(14);

        CellStyle styleGauche1 = wb.createCellStyle();
        CellStyle styleDroite1 = wb.createCellStyle();
        CellStyle styleGauche2 = wb.createCellStyle();
        CellStyle styleDroite2 = wb.createCellStyle();

        styleGauche1.setBorderLeft(BorderStyle.MEDIUM);
        styleGauche1.setBorderTop(BorderStyle.MEDIUM);
        styleGauche1.setFillForegroundColor(bleu);
        styleGauche1.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        styleGauche1.setAlignment(HorizontalAlignment.CENTER);
        styleGauche1.setVerticalAlignment(VerticalAlignment.CENTER);
        styleGauche1.setFont(font);

        styleDroite1.setBorderRight(BorderStyle.MEDIUM);
        styleDroite1.setBorderTop(BorderStyle.MEDIUM);

        styleGauche2.setBorderLeft(BorderStyle.MEDIUM);
        styleGauche2.setBorderBottom(BorderStyle.MEDIUM);
        styleGauche2.setFillForegroundColor(bleu);
        styleGauche2.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        styleGauche2.setAlignment(HorizontalAlignment.CENTER);
        styleGauche2.setVerticalAlignment(VerticalAlignment.CENTER);
        styleGauche2.setFont(font);

        styleDroite2.setBorderRight(BorderStyle.MEDIUM);
        styleDroite2.setBorderBottom(BorderStyle.MEDIUM);

        coinGauche1.setCellStyle(styleGauche1);
        coinDroite1.setCellStyle(styleDroite1);
        coinGauche1.setCellValue(prestation);
        coinGauche2.setCellStyle(styleGauche2);
        coinDroite2.setCellStyle(styleDroite2);
        coinGauche2.setCellValue(residence);

        Row row3 = ws.createRow(3);
        Cell sepGauche = row3.createCell(1);
        Cell sepDroite = row3.createCell(14);
        CellStyle style3Gauche = wb.createCellStyle();
        CellStyle style3Droite = wb.createCellStyle();
        style3Gauche.setBorderLeft(BorderStyle.MEDIUM);
        style3Droite.setBorderRight(BorderStyle.MEDIUM);
        sepGauche.setCellStyle(style3Gauche);
        sepDroite.setCellStyle(style3Droite);

        Row row4 = ws.createRow(4);
        Cell refGauche = row4.createCell(1);
        Cell refDroite = row4.createCell(14);
        CellStyle style4Gauche = wb.createCellStyle();
        CellStyle style4Droite = wb.createCellStyle();
        style4Gauche.setBorderLeft(BorderStyle.MEDIUM);
        style4Gauche.setBorderTop(BorderStyle.MEDIUM);
        style4Gauche.setBorderBottom(BorderStyle.MEDIUM);
        style4Droite.setBorderRight(BorderStyle.MEDIUM);
        style4Droite.setBorderTop(BorderStyle.MEDIUM);
        style4Droite.setBorderBottom(BorderStyle.MEDIUM);
        style4Gauche.setFont(font);
        style4Gauche.setFillForegroundColor(bleu);
        style4Gauche.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style4Gauche.setAlignment(HorizontalAlignment.CENTER);
        style4Gauche.setVerticalAlignment(VerticalAlignment.CENTER);
        refGauche.setCellValue("REFERENCE LOGEMENT");
        refGauche.setCellStyle(style4Gauche);
        refDroite.setCellStyle(style4Droite);

        Row row5 = ws.createRow(5);
        Cell infosGauche = row5.createCell(1);
        Cell infosDroite = row5.createCell(14);
        CellStyle style5Gauche = wb.createCellStyle();
        CellStyle style5Droite = wb.createCellStyle();
        style5Gauche.setAlignment(HorizontalAlignment.CENTER);
        style5Gauche.setVerticalAlignment(VerticalAlignment.CENTER);
        style5Gauche.setBorderLeft(BorderStyle.MEDIUM);
        style5Droite.setBorderRight(BorderStyle.MEDIUM);
        infosGauche.setCellStyle(style5Gauche);
        infosDroite.setCellStyle(style5Droite);
        infosGauche.setCellValue("N° appartement : " + edl.numeroAppartement + "                Type : " + edl.typeAppartement + "                Bât : " + edl.numeroBat + "                Etage : " + edl.numeroEtage);

        Row row6 = ws.createRow(6);
        Cell DecisionGauche = row6.createCell(1);
        Cell DecisionDroite = row6.createCell(9);
        Cell DecisionGaucheOpr = row6.createCell(10);
        Cell DecisionDroiteOpr = row6.createCell(14);
        CellStyle style6Gauche = wb.createCellStyle();
        CellStyle style6Droite = wb.createCellStyle();
        style6Gauche.setBorderLeft(BorderStyle.MEDIUM);
        style6Gauche.setBorderTop(BorderStyle.MEDIUM);
        style6Gauche.setBorderBottom(BorderStyle.MEDIUM);
        style6Droite.setBorderRight(BorderStyle.MEDIUM);
        style6Droite.setBorderTop(BorderStyle.MEDIUM);
        style6Droite.setBorderBottom(BorderStyle.MEDIUM);
        style6Gauche.setFont(font);
        style6Gauche.setFillForegroundColor(bleu);
        style6Gauche.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style6Gauche.setAlignment(HorizontalAlignment.CENTER);
        style6Gauche.setVerticalAlignment(VerticalAlignment.CENTER);
        DecisionGauche.setCellValue("DECISION TRAVAUX");
        DecisionGaucheOpr.setCellValue("CONSTATS PREALABLES A LA RECEPTION");
        DecisionGaucheOpr.setCellStyle(style6Gauche);
        DecisionDroiteOpr.setCellStyle(style6Droite);
        DecisionGauche.setCellStyle(style6Gauche);
        DecisionDroite.setCellStyle(style6Droite);

        Row row7 = ws.createRow(7);
        Cell sepGauche2 = row7.createCell(1);
        Cell sepDroite2 = row7.createCell(9);
        Cell sepDroite3 = row7.createCell(14);
        CellStyle style7Gauche = wb.createCellStyle();
        CellStyle style7Droite = wb.createCellStyle();
        style7Gauche.setBorderLeft(BorderStyle.MEDIUM);
        style7Droite.setBorderRight(BorderStyle.MEDIUM);
        sepGauche2.setCellStyle(style7Gauche);
        sepDroite2.setCellStyle(style7Droite);
        sepDroite3.setCellStyle(style7Droite);

        for (int i=2;i<14;i++) {
            Cell cell1 = row1.createCell(i);
            CellStyle style1 = wb.createCellStyle();
            style1.setBorderTop(BorderStyle.MEDIUM);
            cell1.setCellStyle(style1);

            Cell cell2 = row2.createCell(i);
            CellStyle style2 = wb.createCellStyle();
            style2.setBorderBottom(BorderStyle.MEDIUM);
            cell2.setCellStyle(style2);

            Cell cell4 = row4.createCell(i);
            CellStyle style4 = wb.createCellStyle();
            style4.setBorderTop(BorderStyle.MEDIUM);
            style4.setBorderBottom(BorderStyle.MEDIUM);
            cell4.setCellStyle(style4);

            if (i != 9 && i != 10) {
                Cell cell6 = row6.createCell(i);
                CellStyle style6 = wb.createCellStyle();
                style6.setBorderTop(BorderStyle.MEDIUM);
                style6.setBorderBottom(BorderStyle.MEDIUM);
                cell6.setCellStyle(style6);
            }
        }

        for (int i=1;i<6;i++) {
            ws.addMergedRegion(new CellRangeAddress(i,i,1,14));
        }
        ws.addMergedRegion(new CellRangeAddress(6,6,1,9));
        ws.addMergedRegion(new CellRangeAddress(7,7,1,9));
        ws.addMergedRegion(new CellRangeAddress(6,6,10,14));
        ws.addMergedRegion(new CellRangeAddress(7,7,10,14));

        Font fontHead = wb.createFont();
        fontHead.setBold(true);

        Row row8 = ws.createRow(8);
        Row row9 = ws.createRow(9);

        Cell designation = row8.createCell(1);
        Cell designation2 = row9.createCell(1);
        designation.setCellValue("Désignations");
        CellStyle styleDesignations = wb.createCellStyle();
        CellStyle styleDesignations2 = wb.createCellStyle();
        styleDesignations.setAlignment(HorizontalAlignment.CENTER);
        styleDesignations.setVerticalAlignment(VerticalAlignment.CENTER);
        styleDesignations.setBorderTop(BorderStyle.MEDIUM);
        styleDesignations.setBorderLeft(BorderStyle.MEDIUM);
        styleDesignations.setBorderRight(BorderStyle.MEDIUM);
        styleDesignations2.setBorderBottom(BorderStyle.MEDIUM);
        styleDesignations2.setBorderLeft(BorderStyle.MEDIUM);
        styleDesignations2.setBorderRight(BorderStyle.MEDIUM);
        styleDesignations.setFont(fontHead);
        designation2.setCellStyle(styleDesignations2); 
        designation.setCellStyle(styleDesignations);       
        ws.addMergedRegion(new CellRangeAddress(8,9,1,1));

        Cell etat = row8.createCell(2);
        Cell etat2 = row8.createCell(3);
        Cell etat3 = row8.createCell(4);
        etat.setCellValue("Etat");
        CellStyle styleEtat = wb.createCellStyle();
        CellStyle styleEtat2 = wb.createCellStyle();
        CellStyle styleEtat3 = wb.createCellStyle();
        styleEtat.setAlignment(HorizontalAlignment.CENTER);
        styleEtat.setVerticalAlignment(VerticalAlignment.CENTER);
        styleEtat.setBorderTop(BorderStyle.MEDIUM);
        styleEtat.setBorderBottom(BorderStyle.MEDIUM);
        styleEtat2.setBorderTop(BorderStyle.MEDIUM);
        styleEtat2.setBorderBottom(BorderStyle.MEDIUM);
        styleEtat3.setBorderTop(BorderStyle.MEDIUM);
        styleEtat3.setBorderBottom(BorderStyle.MEDIUM);
        styleEtat.setFont(fontHead);
        etat.setCellStyle(styleEtat);
        etat2.setCellStyle(styleEtat2);
        etat3.setCellStyle(styleEtat3);
        ws.addMergedRegion(new CellRangeAddress(8,8,2,4));

        Cell etatPlus = row9.createCell(2);
        Cell etatEgal = row9.createCell(3);
        Cell etatMoins = row9.createCell(4);
        etatPlus.setCellValue("+");
        etatEgal.setCellValue("=");
        etatMoins.setCellValue("-");
        CellStyle stylePlus = wb.createCellStyle();
        CellStyle styleEgal = wb.createCellStyle();
        CellStyle styleMoins= wb.createCellStyle();
        stylePlus.setFont(fontHead);
        styleMoins.setFont(fontHead);
        styleEgal.setFont(fontHead);
        stylePlus.setVerticalAlignment(VerticalAlignment.CENTER);
        styleMoins.setAlignment(HorizontalAlignment.CENTER);
        styleEgal.setVerticalAlignment(VerticalAlignment.CENTER);
        stylePlus.setAlignment(HorizontalAlignment.CENTER);
        styleMoins.setVerticalAlignment(VerticalAlignment.CENTER);
        styleEgal.setAlignment(HorizontalAlignment.CENTER);
        stylePlus.setBorderRight(BorderStyle.THIN);
        styleEgal.setBorderRight(BorderStyle.THIN);
        etatPlus.setCellStyle(stylePlus);
        etatEgal.setCellStyle(styleEgal);
        etatMoins.setCellStyle(styleMoins);

        Cell aFaireHautGauche = row8.createCell(5);
        Cell aFaireHautDroite = row8.createCell(8);
        Cell aFaireBasGauche = row9.createCell(5);
        Cell aFaireBasDroite = row9.createCell(8);
        CellStyle styleAFaireHautGauche = wb.createCellStyle();
        CellStyle styleAFaireHautDroite = wb.createCellStyle();
        CellStyle styleAFaireBasGauche = wb.createCellStyle();
        CellStyle styleAFaireBasDroite = wb.createCellStyle();
        styleAFaireHautGauche.setFont(fontHead);
        styleAFaireHautGauche.setBorderLeft(BorderStyle.MEDIUM);
        styleAFaireHautGauche.setBorderTop(BorderStyle.MEDIUM);
        styleAFaireHautDroite.setBorderRight(BorderStyle.MEDIUM);
        styleAFaireHautDroite.setBorderTop(BorderStyle.MEDIUM);
        styleAFaireBasGauche.setBorderLeft(BorderStyle.MEDIUM);
        styleAFaireBasGauche.setBorderBottom(BorderStyle.MEDIUM);
        styleAFaireBasDroite.setBorderRight(BorderStyle.MEDIUM);
        styleAFaireBasDroite.setBorderBottom(BorderStyle.MEDIUM);
        styleAFaireHautGauche.setAlignment(HorizontalAlignment.CENTER);
        styleAFaireHautGauche.setVerticalAlignment(VerticalAlignment.CENTER);
        aFaireHautGauche.setCellValue("A faire");
        aFaireHautGauche.setCellStyle(styleAFaireHautGauche);
        aFaireHautDroite.setCellStyle(styleAFaireHautDroite);
        aFaireBasGauche.setCellStyle(styleAFaireBasGauche);
        aFaireBasDroite .setCellStyle(styleAFaireBasDroite);
        for (int i = 6 ; i < 8 ; i++) {
            CellStyle style = wb.createCellStyle();
            CellStyle style2 = wb.createCellStyle();
            style.setBorderTop(BorderStyle.MEDIUM);
            style2.setBorderBottom(BorderStyle.MEDIUM);
            Cell cell = row8.createCell(i);
            Cell cell2 = row9.createCell(i);
            cell.setCellStyle(style);
            cell2.setCellStyle(style2);
        }
        ws.addMergedRegion(new CellRangeAddress(8,9,5,8));

        Cell observation = row8.createCell(9);
        Cell observation2 = row9.createCell(9);
        observation.setCellValue("Observations");
        CellStyle styleobservations = wb.createCellStyle();
        CellStyle styleobservations2 = wb.createCellStyle();
        styleobservations.setAlignment(HorizontalAlignment.CENTER);
        styleobservations.setVerticalAlignment(VerticalAlignment.CENTER);
        styleobservations.setBorderTop(BorderStyle.MEDIUM);
        styleobservations.setBorderLeft(BorderStyle.MEDIUM);
        styleobservations.setBorderRight(BorderStyle.MEDIUM);
        styleobservations2.setBorderBottom(BorderStyle.MEDIUM);
        styleobservations2.setBorderLeft(BorderStyle.MEDIUM);
        styleobservations2.setBorderRight(BorderStyle.MEDIUM);
        styleobservations.setFont(fontHead);
        observation2.setCellStyle(styleobservations2); 
        observation.setCellStyle(styleobservations);       
        ws.addMergedRegion(new CellRangeAddress(8,9,9,9));

        Font fontSans = wb.createFont();
        fontSans.setBold(true);
        fontSans.setColor(IndexedColors.GREEN.getIndex());
        fontSans.setFontHeightInPoints((short)8);
        Cell sans = row8.createCell(10);
        Cell sans2 = row9.createCell(10);
        sans.setCellValue("Sans\nréserve");
        CellStyle stylesans = wb.createCellStyle();
        CellStyle stylesans2 = wb.createCellStyle();
        stylesans.setAlignment(HorizontalAlignment.CENTER);
        stylesans.setVerticalAlignment(VerticalAlignment.CENTER);
        stylesans.setWrapText(true);
        stylesans.setBorderTop(BorderStyle.MEDIUM);
        stylesans.setBorderLeft(BorderStyle.MEDIUM);
        stylesans.setBorderRight(BorderStyle.THIN);
        stylesans2.setBorderBottom(BorderStyle.MEDIUM);
        stylesans2.setBorderLeft(BorderStyle.MEDIUM);
        stylesans2.setBorderRight(BorderStyle.THIN);
        stylesans.setFont(fontSans);
        sans2.setCellStyle(stylesans2); 
        sans.setCellStyle(stylesans);       
        ws.addMergedRegion(new CellRangeAddress(8,9,10,10));

        Font fontReserve = wb.createFont();
        fontReserve.setBold(true);
        fontReserve.setColor(IndexedColors.ORANGE.getIndex());
        fontReserve.setFontHeightInPoints((short)8);
        Cell Reserve = row8.createCell(11);
        Cell Reserve2 = row9.createCell(11);
        Reserve.setCellValue("Avec\nréserve(s)");
        CellStyle styleReserve = wb.createCellStyle();
        CellStyle styleReserve2 = wb.createCellStyle();
        styleReserve.setAlignment(HorizontalAlignment.CENTER);
        styleReserve.setVerticalAlignment(VerticalAlignment.CENTER);
        styleReserve.setWrapText(true);
        styleReserve.setBorderTop(BorderStyle.MEDIUM);
        styleReserve.setBorderRight(BorderStyle.THIN);
        styleReserve2.setBorderBottom(BorderStyle.MEDIUM);
        styleReserve2.setBorderRight(BorderStyle.THIN);
        styleReserve.setFont(fontReserve);
        Reserve2.setCellStyle(styleReserve2); 
        Reserve.setCellStyle(styleReserve);       
        ws.addMergedRegion(new CellRangeAddress(8,9,11,11));

        Font fonteffectue = wb.createFont();
        fonteffectue.setBold(true);
        fonteffectue.setColor(IndexedColors.RED.getIndex());
        fonteffectue.setFontHeightInPoints((short)8);
        Cell effectue = row8.createCell(12);
        Cell effectue2 = row9.createCell(12);
        effectue.setCellValue("Prestation\nnon\neffectuée");
        CellStyle styleeffectue = wb.createCellStyle();
        CellStyle styleeffectue2 = wb.createCellStyle();
        styleeffectue.setAlignment(HorizontalAlignment.CENTER);
        styleeffectue.setVerticalAlignment(VerticalAlignment.CENTER);
        styleeffectue.setWrapText(true);
        styleeffectue.setBorderTop(BorderStyle.MEDIUM);
        styleeffectue.setBorderRight(BorderStyle.THIN);
        styleeffectue2.setBorderBottom(BorderStyle.MEDIUM);
        styleeffectue2.setBorderRight(BorderStyle.THIN);
        styleeffectue.setFont(fonteffectue);
        effectue2.setCellStyle(styleeffectue2); 
        effectue.setCellStyle(styleeffectue);       
        ws.addMergedRegion(new CellRangeAddress(8,9,12,12));

        Font fontconcerne = wb.createFont();
        fontconcerne.setBold(true);
        fontconcerne.setFontHeightInPoints((short)8);
        Cell concerne = row8.createCell(13);
        Cell concerne2 = row9.createCell(13);
        concerne.setCellValue("Non\nconcerné");
        CellStyle styleconcerne = wb.createCellStyle();
        CellStyle styleconcerne2 = wb.createCellStyle();
        styleconcerne.setAlignment(HorizontalAlignment.CENTER);
        styleconcerne.setVerticalAlignment(VerticalAlignment.CENTER);
        styleconcerne.setWrapText(true);
        styleconcerne.setBorderTop(BorderStyle.MEDIUM);
        styleconcerne.setBorderRight(BorderStyle.THIN);
        styleconcerne2.setBorderBottom(BorderStyle.MEDIUM);
        styleconcerne2.setBorderRight(BorderStyle.THIN);
        styleconcerne.setFont(fontconcerne);
        concerne2.setCellStyle(styleconcerne2); 
        concerne.setCellStyle(styleconcerne);       
        ws.addMergedRegion(new CellRangeAddress(8,9,13,13));

        Cell observationOpr = row8.createCell(14);
        Cell observationOpr2 = row9.createCell(14);
        observationOpr.setCellValue("Observations");
        CellStyle styleobservationOprs = wb.createCellStyle();
        CellStyle styleobservationOprs2 = wb.createCellStyle();
        styleobservationOprs.setAlignment(HorizontalAlignment.CENTER);
        styleobservationOprs.setVerticalAlignment(VerticalAlignment.CENTER);
        styleobservationOprs.setBorderTop(BorderStyle.MEDIUM);
        styleobservationOprs.setBorderLeft(BorderStyle.MEDIUM);
        styleobservationOprs.setBorderRight(BorderStyle.MEDIUM);
        styleobservationOprs2.setBorderBottom(BorderStyle.MEDIUM);
        styleobservationOprs2.setBorderLeft(BorderStyle.MEDIUM);
        styleobservationOprs2.setBorderRight(BorderStyle.MEDIUM);
        styleobservationOprs.setFont(fontHead);
        observationOpr2.setCellStyle(styleobservationOprs2); 
        observationOpr.setCellStyle(styleobservationOprs);       
        ws.addMergedRegion(new CellRangeAddress(8,9,14,14));

        row1.setHeightInPoints(15);
        row2.setHeightInPoints(15);
        row3.setHeightInPoints(12);
        row4.setHeightInPoints(15);
        row5.setHeightInPoints(40);
        row6.setHeightInPoints(15);
        row7.setHeightInPoints(12);
        row8.setHeightInPoints(23);
        row9.setHeightInPoints(15);

    }

    public void createPieceOpr(Workbook wb, Sheet ws, Piece piece, int startRow) {
        byte[] rgb = new byte[3];
        rgb[0] = (byte) 84;
        rgb[1] = (byte) 202;
        rgb[2] = (byte) 248;
        XSSFColor vert = new XSSFColor(rgb);

        Font fontTitre = wb.createFont();
        fontTitre.setBold(true);
        Row start = ws.getRow(startRow);
        
        for (int i=10; i<14;i++) {
            Cell cell = start.createCell(i);
            CellStyle style = wb.createCellStyle();
            style.setBorderBottom(BorderStyle.MEDIUM);
            style.setBorderTop(BorderStyle.MEDIUM);
            style.setFillForegroundColor(vert);
            style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            cell.setCellStyle(style);
        }
        ws.addMergedRegion(new CellRangeAddress(startRow,startRow,10,13));

        Cell observ = start.createCell(14);
        observ.setCellValue("Observations MOE :");
        CellStyle style = wb.createCellStyle();
        style.setBorderBottom(BorderStyle.MEDIUM);
        style.setBorderLeft(BorderStyle.MEDIUM);
        style.setBorderRight(BorderStyle.MEDIUM);
        style.setBorderTop(BorderStyle.MEDIUM);
        style.setFillForegroundColor(vert);
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        style.setVerticalAlignment(VerticalAlignment.CENTER);
        style.setFont(fontTitre);
        observ.setCellStyle(style);
    }

    public void sepPieceOpr(Workbook wb,Sheet ws, int row) {
        Row sepRow = ws.getRow(row);
        Cell gauche = sepRow.createCell(10);
        Cell droite = sepRow.createCell(14);
        CellStyle styleGauche = wb.createCellStyle();
        CellStyle styleDroite = wb.createCellStyle();
        styleGauche.setBorderLeft(BorderStyle.MEDIUM);
        styleGauche.setBorderBottom(BorderStyle.MEDIUM);
        styleGauche.setBorderTop(BorderStyle.MEDIUM);
        styleDroite.setBorderRight(BorderStyle.MEDIUM);
        styleDroite.setBorderTop(BorderStyle.MEDIUM);
        styleDroite.setBorderBottom(BorderStyle.MEDIUM);
        gauche.setCellStyle(styleGauche);
        droite.setCellStyle(styleDroite);
        for (int i=11; i<14; i++) {
            Cell cell = sepRow.createCell(i);
            CellStyle style = wb.createCellStyle();
            style.setBorderBottom(BorderStyle.MEDIUM);
            style.setBorderTop(BorderStyle.MEDIUM);
            cell.setCellStyle(style);
        }
        ws.addMergedRegion(new CellRangeAddress(row,row,10,14));
    }

    public void createElementOpr(Workbook wb, Sheet ws, Element element, int startRow) {
        Row row = ws.getRow(startRow);
        Font green = wb.createFont();
        Font orange = wb.createFont();
        Font red = wb.createFont();
        green.setColor(IndexedColors.GREEN.getIndex());
        orange.setColor(IndexedColors.ORANGE.getIndex());
        red.setColor(IndexedColors.RED.getIndex());Cell reserve = row.createCell(10);
        CellStyle stylereserve = wb.createCellStyle();
        stylereserve.setBorderRight(BorderStyle.THIN);
        stylereserve.setBorderBottom(BorderStyle.THIN);
        stylereserve.setAlignment(HorizontalAlignment.CENTER);
        stylereserve.setVerticalAlignment(VerticalAlignment.CENTER);
        stylereserve.setFont(green);
        if (element.etatOpr == 1) {
            reserve.setCellValue("X");
        }
        if (element.etatOpr == 0) {
            stylereserve.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            stylereserve.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        }
        reserve.setCellStyle(stylereserve);

        Cell sans = row.createCell(11);
        CellStyle stylesans = wb.createCellStyle();
        stylesans.setBorderRight(BorderStyle.THIN);
        stylesans.setBorderBottom(BorderStyle.THIN);
        stylesans.setAlignment(HorizontalAlignment.CENTER);
        stylesans.setVerticalAlignment(VerticalAlignment.CENTER);
        stylesans.setFont(orange);
        if (element.etatOpr == 2) {
            sans.setCellValue("X");
        }
        if (element.etatOpr == 0) {
            stylesans.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            stylesans.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        }
        sans.setCellStyle(stylesans);

        Cell prestation = row.createCell(12);
        CellStyle styleprestation = wb.createCellStyle();
        styleprestation.setBorderRight(BorderStyle.THIN);
        styleprestation.setBorderBottom(BorderStyle.THIN);
        styleprestation.setAlignment(HorizontalAlignment.CENTER);
        styleprestation.setVerticalAlignment(VerticalAlignment.CENTER);
        styleprestation.setFont(red);
        if (element.etatOpr == 3) {
            prestation.setCellValue("X");
        }
        if (element.etatOpr == 0) {
            styleprestation.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            styleprestation.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        }
        prestation.setCellStyle(styleprestation);

        Cell concerne = row.createCell(13);
        CellStyle styleconcerne = wb.createCellStyle();
        styleconcerne.setBorderBottom(BorderStyle.THIN);
        styleconcerne.setAlignment(HorizontalAlignment.CENTER);
        styleconcerne.setVerticalAlignment(VerticalAlignment.CENTER);
        if (element.etatOpr == 4) {
            concerne.setCellValue("X");
        }
        if (element.etatOpr == 0) {
            styleconcerne.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            styleconcerne.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        }
        concerne.setCellStyle(styleconcerne);

        Cell observMoe = row.createCell(14);
        CellStyle styleobservMoe = wb.createCellStyle();
        styleobservMoe.setBorderLeft(BorderStyle.MEDIUM);
        styleobservMoe.setBorderRight(BorderStyle.MEDIUM);
        styleobservMoe.setBorderBottom(BorderStyle.THIN);
        styleobservMoe.setVerticalAlignment(VerticalAlignment.CENTER);
        styleobservMoe.setWrapText(true);
        observMoe.setCellValue(element.observationsOpr);
        observMoe.setCellStyle(styleobservMoe);
    }

    public void createObservationsGeneralesOpr(Workbook wb, Sheet ws, Edl edl, int startRow) {
        byte[] rgb = new byte[3];
        rgb[0] = (byte) 84;
        rgb[1] = (byte) 202;
        rgb[2] = (byte) 248;
        XSSFColor vert = new XSSFColor(rgb);
        Font font = wb.createFont();
        font.setBold(true);

        Row row = ws.getRow(startRow);
        Cell observations = row.createCell(10);
        observations.setCellValue("Observations générales MOE");
        CellStyle styleGauche = wb.createCellStyle();
        styleGauche.setBorderLeft(BorderStyle.MEDIUM);
        styleGauche.setBorderBottom(BorderStyle.MEDIUM);
        styleGauche.setBorderTop(BorderStyle.MEDIUM);
        styleGauche.setFont(font);
        styleGauche.setFillForegroundColor(vert);
        styleGauche.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        observations.setCellStyle(styleGauche);

        for (int i=11;i<14;i++) {
            Cell cell = row.createCell(i);
            CellStyle style = wb.createCellStyle();
            style.setBorderBottom(BorderStyle.MEDIUM);
            style.setBorderTop(BorderStyle.MEDIUM);
            cell.setCellStyle(style);
        }

        Cell observationsEnd = row.createCell(14);
        CellStyle styleDroite = wb.createCellStyle();
        styleDroite.setBorderRight(BorderStyle.MEDIUM);
        styleDroite.setBorderBottom(BorderStyle.MEDIUM);
        styleDroite.setBorderTop(BorderStyle.MEDIUM);
        observationsEnd.setCellStyle(styleDroite);

        ws.addMergedRegion(new CellRangeAddress(startRow,startRow,10,14));

        Row row2 = ws.getRow(startRow + 1);
        Cell observationsText = row2.createCell(10);
        observationsText.setCellValue(edl.observationsGeneralesOpr);
        CellStyle styleGaucheText = wb.createCellStyle();
        styleGaucheText.setBorderLeft(BorderStyle.MEDIUM);
        styleGaucheText.setBorderBottom(BorderStyle.MEDIUM);
        styleGaucheText.setBorderTop(BorderStyle.MEDIUM);
        styleGaucheText.setVerticalAlignment(VerticalAlignment.CENTER);
        styleGaucheText.setWrapText(true);
        observationsText.setCellStyle(styleGaucheText);

        for (int i=11;i<14;i++) {
            Cell cell = row2.createCell(i);
            CellStyle style = wb.createCellStyle();
            style.setBorderBottom(BorderStyle.MEDIUM);
            style.setBorderTop(BorderStyle.MEDIUM);
            cell.setCellStyle(style);
        }

        Cell observationsTextEnd = row2.createCell(14);
        CellStyle styleDroiteText = wb.createCellStyle();
        styleDroiteText.setBorderRight(BorderStyle.MEDIUM);
        styleDroiteText.setBorderBottom(BorderStyle.MEDIUM);
        styleDroiteText.setBorderTop(BorderStyle.MEDIUM);
        observationsTextEnd.setCellStyle(styleDroiteText);

        ws.addMergedRegion(new CellRangeAddress(startRow+1,startRow+1,10,14));
    }
}