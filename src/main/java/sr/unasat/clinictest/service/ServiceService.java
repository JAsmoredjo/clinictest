package sr.unasat.clinictest.service;

import sr.unasat.clinictest.config.JPAConfiguration;
import sr.unasat.clinictest.dao.ServiceDAO;
import sr.unasat.clinictest.entity.Service;

import java.util.List;

public class ServiceService {
    private static ServiceDAO serviceDAO;

    public ServiceService() {
        if (serviceDAO == null) {
            serviceDAO = new ServiceDAO(JPAConfiguration.getEntityManager());
        }
    }

    public List<Service> all() {
        return serviceDAO.all();
    }
}
