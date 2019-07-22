package sr.unasat.clinictest.service;

import sr.unasat.clinictest.utility.Excel;
import sr.unasat.clinictest.utility.Zip;

import java.time.LocalDate;

public class ReportService {
    public static Excel excel;
    public static Zip zip;

    public ReportService() {
        if (excel == null && zip == null) {
            excel = new Excel();
            zip = new Zip();
        }
    }

    public void createVisitReport(LocalDate date) {
        excel.createVisitExcel(date);
        zip.createReportZip();
    }

    public void createVisitReport(LocalDate startDate, LocalDate endDate) {
        excel.createVisitExcel(startDate, endDate);
        zip.createReportZip();
    }
}