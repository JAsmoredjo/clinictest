package sr.unasat.clinictest.service;

import sr.unasat.clinictest.config.JPAConfiguration;
import sr.unasat.clinictest.dao.InsuranceCompanyDAO;
import sr.unasat.clinictest.entity.InsuranceCompany;

import java.util.List;

public class InsuranceCompanyService {
    private static InsuranceCompanyDAO insuranceCompanyDAO;

    public InsuranceCompanyService() {
        if (insuranceCompanyDAO == null) {
            insuranceCompanyDAO = new InsuranceCompanyDAO(JPAConfiguration.getEntityManager());
        }
    }

    public List<InsuranceCompany> all() {
        return insuranceCompanyDAO.all();
    }
}
