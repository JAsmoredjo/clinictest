package sr.unasat.clinictest.service;

import sr.unasat.clinictest.config.JPAConfiguration;
import sr.unasat.clinictest.dao.VisitDAO;
import sr.unasat.clinictest.entity.Visit;

import java.util.List;

public class VisitService {
    private static VisitDAO visitDAO;

    public VisitService() {
        if (visitDAO == null) {
            visitDAO = new VisitDAO(JPAConfiguration.getEntityManager());
        }
    }

    public List<Visit> all() {
        return visitDAO.all();
    }
}
