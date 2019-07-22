package sr.unasat.clinictest.utility;

import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import sr.unasat.clinictest.entity.InsuranceCompany;
import sr.unasat.clinictest.entity.Patient;
import sr.unasat.clinictest.entity.Visit;
import sr.unasat.clinictest.service.InsuranceCompanyService;
import sr.unasat.clinictest.service.PatientService;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class Excel {
    private static final String PATH = "C:\\Report\\";

    public void createVisitExcel(LocalDate date) {
        File directory = new File(PATH);
        if (!directory.exists()) {
            directory.mkdir();
        }
        InsuranceCompanyService insuranceCompanyService = new InsuranceCompanyService();
        List<InsuranceCompany> insuranceCompanies = insuranceCompanyService.all();
        for (InsuranceCompany insuranceCompany : insuranceCompanies) {
            XSSFWorkbook workbook = new XSSFWorkbook();
            XSSFSheet sheet = workbook.createSheet("Patient");
            PatientService patientService = new PatientService();
            List<Patient> patients = patientService.report(insuranceCompany, date);
            if (patients.size() > 0) {
                XSSFRow row = sheet.createRow(0);
                XSSFCell cell = row.createCell(0);
                cell.setCellValue("Last Name");
                cell = row.createCell(1);
                cell.setCellValue("First Name");
                cell = row.createCell(2);
                cell.setCellValue("Date of Birth");
                cell = row.createCell(3);
                cell.setCellValue("Address");
                cell = row.createCell(4);
                cell.setCellValue("Phone Number");
                cell = row.createCell(5);
                cell.setCellValue("Insurance");
                cell = row.createCell(6);
                cell.setCellValue("Insurance Number");
                cell = row.createCell(7);
                cell.setCellValue("Visit Date");
                cell = row.createCell(8);
                cell.setCellValue("Visit Anamnesis");
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d-M-yyyy");
                int rowNumber = 1;
                int patientId = 0;
                for (Patient patient : patients) {
                    if (patient.getId() != patientId) {
                        int firstRow = rowNumber;
                        patientId = patient.getId();
                        row = sheet.createRow(rowNumber++);
                        cell = row.createCell(0);
                        cell.setCellValue(patient.getLastName());
                        cell = row.createCell(1);
                        cell.setCellValue(patient.getFirstName());
                        cell = row.createCell(2);
                        cell.setCellValue(patient.getDateOfBirth());
                        cell = row.createCell(3);
                        cell.setCellValue(patient.getAddress());
                        cell = row.createCell(4);
                        cell.setCellValue(patient.getPhoneNumber());
                        cell = row.createCell(5);
                        cell.setCellValue(patient.getInsurance().getName());
                        cell = row.createCell(6);
                        cell.setCellValue(patient.getInsuranceNumber());
                        if (patient.getVisits().size() > 0) {
                            for (Visit visit : patient.getVisits()) {
                                if (patient.getVisits().indexOf(visit) == 0) {
                                    cell = row.createCell(7);
                                    cell.setCellValue(visit.getDate().format(formatter));
                                    cell = row.createCell(8);
                                    cell.setCellValue(visit.getAnamnesis());
                                } else {
                                    row = sheet.createRow(rowNumber++);
                                    cell = row.createCell(7);
                                    cell.setCellValue(visit.getDate().format(formatter));
                                    cell = row.createCell(8);
                                    cell.setCellValue(visit.getAnamnesis());
                                }
                            }
                        }
                        if (patient.getVisits().size() > 1) {
                            sheet.addMergedRegion(new CellRangeAddress(firstRow, firstRow + patient.getVisits().size() - 1,0, 0));
                            sheet.addMergedRegion(new CellRangeAddress(firstRow, firstRow + patient.getVisits().size() - 1,1, 1));
                            sheet.addMergedRegion(new CellRangeAddress(firstRow, firstRow + patient.getVisits().size() - 1,2, 2));
                            sheet.addMergedRegion(new CellRangeAddress(firstRow, firstRow + patient.getVisits().size() - 1,3, 3));
                            sheet.addMergedRegion(new CellRangeAddress(firstRow, firstRow + patient.getVisits().size() - 1,4, 4));
                            sheet.addMergedRegion(new CellRangeAddress(firstRow, firstRow + patient.getVisits().size() - 1,5, 5));
                            sheet.addMergedRegion(new CellRangeAddress(firstRow, firstRow + patient.getVisits().size() - 1,6, 6));
                        }
                    }
                }
                sheet.autoSizeColumn(0);
                sheet.autoSizeColumn(1);
                sheet.autoSizeColumn(2);
                sheet.autoSizeColumn(3);
                sheet.autoSizeColumn(4);
                sheet.autoSizeColumn(5);
                sheet.autoSizeColumn(6);
                sheet.autoSizeColumn(7);
                sheet.autoSizeColumn(8);
            }
            try {
                FileOutputStream fileOutputStream = new FileOutputStream(PATH + insuranceCompany.getName() + ".xlsx");
                workbook.write(fileOutputStream);
                workbook.close();
                fileOutputStream.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    public void createVisitExcel(LocalDate startDate, LocalDate endDate) {
        File directory = new File(PATH);
        if (!directory.exists()) {
            directory.mkdir();
        }
        InsuranceCompanyService insuranceCompanyService = new InsuranceCompanyService();
        List<InsuranceCompany> insuranceCompanies = insuranceCompanyService.all();
        for (InsuranceCompany insuranceCompany : insuranceCompanies) {
            XSSFWorkbook workbook = new XSSFWorkbook();
            XSSFSheet sheet = workbook.createSheet("Patient");
            PatientService patientService = new PatientService();
            List<Patient> patients = patientService.report(insuranceCompany, startDate, endDate);
            if (patients.size() > 0) {
                XSSFRow row = sheet.createRow(0);
                XSSFCell cell = row.createCell(0);
                cell.setCellValue("Last Name");
                cell = row.createCell(1);
                cell.setCellValue("First Name");
                cell = row.createCell(2);
                cell.setCellValue("Date of Birth");
                cell = row.createCell(3);
                cell.setCellValue("Address");
                cell = row.createCell(4);
                cell.setCellValue("Phone Number");
                cell = row.createCell(5);
                cell.setCellValue("Insurance");
                cell = row.createCell(6);
                cell.setCellValue("Insurance Number");
                cell = row.createCell(7);
                cell.setCellValue("Visit Date");
                cell = row.createCell(8);
                cell.setCellValue("Visit Anamnesis");
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d-M-yyyy");
                int rowNumber = 1;
                int patientId = 0;
                for (Patient patient : patients) {
                    if (patient.getId() != patientId) {
                        int firstRow = rowNumber;
                        patientId = patient.getId();
                        row = sheet.createRow(rowNumber++);
                        cell = row.createCell(0);
                        cell.setCellValue(patient.getLastName());
                        cell = row.createCell(1);
                        cell.setCellValue(patient.getFirstName());
                        cell = row.createCell(2);
                        cell.setCellValue(patient.getDateOfBirth());
                        cell = row.createCell(3);
                        cell.setCellValue(patient.getAddress());
                        cell = row.createCell(4);
                        cell.setCellValue(patient.getPhoneNumber());
                        cell = row.createCell(5);
                        cell.setCellValue(patient.getInsurance().getName());
                        cell = row.createCell(6);
                        cell.setCellValue(patient.getInsuranceNumber());
                        if (patient.getVisits().size() > 0) {
                            for (Visit visit : patient.getVisits()) {
                                if (patient.getVisits().indexOf(visit) == 0) {
                                    cell = row.createCell(7);
                                    cell.setCellValue(visit.getDate().format(formatter));
                                    cell = row.createCell(8);
                                    cell.setCellValue(visit.getAnamnesis());
                                } else {
                                    row = sheet.createRow(rowNumber++);
                                    cell = row.createCell(7);
                                    cell.setCellValue(visit.getDate().format(formatter));
                                    cell = row.createCell(8);
                                    cell.setCellValue(visit.getAnamnesis());
                                }
                            }
                        }
                        if (patient.getVisits().size() > 1) {
                            sheet.addMergedRegion(new CellRangeAddress(firstRow, firstRow + patient.getVisits().size() - 1,0, 0));
                            sheet.addMergedRegion(new CellRangeAddress(firstRow, firstRow + patient.getVisits().size() - 1,1, 1));
                            sheet.addMergedRegion(new CellRangeAddress(firstRow, firstRow + patient.getVisits().size() - 1,2, 2));
                            sheet.addMergedRegion(new CellRangeAddress(firstRow, firstRow + patient.getVisits().size() - 1,3, 3));
                            sheet.addMergedRegion(new CellRangeAddress(firstRow, firstRow + patient.getVisits().size() - 1,4, 4));
                            sheet.addMergedRegion(new CellRangeAddress(firstRow, firstRow + patient.getVisits().size() - 1,5, 5));
                            sheet.addMergedRegion(new CellRangeAddress(firstRow, firstRow + patient.getVisits().size() - 1,6, 6));
                        }
                    }
                }
                sheet.autoSizeColumn(0);
                sheet.autoSizeColumn(1);
                sheet.autoSizeColumn(2);
                sheet.autoSizeColumn(3);
                sheet.autoSizeColumn(4);
                sheet.autoSizeColumn(5);
                sheet.autoSizeColumn(6);
                sheet.autoSizeColumn(7);
                sheet.autoSizeColumn(8);
            }
            try {
                FileOutputStream fileOutputStream = new FileOutputStream(PATH + insuranceCompany.getName() + ".xlsx");
                workbook.write(fileOutputStream);
                workbook.close();
                fileOutputStream.close();
            } catch (FileNotFoundException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}