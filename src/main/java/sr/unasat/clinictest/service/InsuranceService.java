package sr.unasat.clinictest.service;

import sr.unasat.clinictest.config.JPAConfiguration;
import sr.unasat.clinictest.dao.InsuranceDAO;
import sr.unasat.clinictest.entity.Insurance;

import java.util.List;

public class InsuranceService {
    private static InsuranceDAO insuranceDAO;

    public InsuranceService() {
        if (insuranceDAO == null) {
            insuranceDAO = new InsuranceDAO(JPAConfiguration.getEntityManager());
        }
    }

    public List<Insurance> all() {
        return insuranceDAO.all();
    }
}
