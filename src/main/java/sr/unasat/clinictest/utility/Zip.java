package sr.unasat.clinictest.utility;

import sr.unasat.clinictest.entity.InsuranceCompany;
import sr.unasat.clinictest.service.InsuranceCompanyService;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class Zip {
    private static final String PATH = "C:\\Report\\";

    public void createVisitZip() {
        try{
            FileOutputStream fos = new FileOutputStream(PATH + "Visit.zip");
            ZipOutputStream zos = new ZipOutputStream(fos);
            InsuranceCompanyService insuranceCompanyService = new InsuranceCompanyService();
            List<InsuranceCompany> insuranceCompanies = insuranceCompanyService.all();
            for (InsuranceCompany insuranceCompany : insuranceCompanies) {
                FileInputStream fis = new FileInputStream(PATH + insuranceCompany.getName() + ".xlsx");
                ZipEntry ze = new ZipEntry(insuranceCompany.getName() + ".xlsx");
                zos.putNextEntry(ze);

                byte[] buffer = new byte[1024];
                int length;
                while ((length = fis.read(buffer)) > 0) {
                    zos.write(buffer, 0, length);
                }
                fis.close();
            }
            zos.close();
            fos.close();
        }catch(IOException ex){
            ex.printStackTrace();
        }
    }
}
