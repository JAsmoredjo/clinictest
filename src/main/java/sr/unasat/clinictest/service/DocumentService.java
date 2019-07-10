package sr.unasat.clinictest.service;

import sr.unasat.clinictest.utility.Excel;
import sr.unasat.clinictest.utility.Zip;

public class DocumentService {
    public static Excel excel;
    public static Zip zip;

    public DocumentService() {
        if (excel == null && zip == null) {
            excel = new Excel();
            zip = new Zip();
        }
    }

    public void createVisitReport() {
        excel.createVisitExcel();
        zip.createVisitZip();
    }
}