package sr.unasat.clinictest.service;

import sr.unasat.clinictest.config.JPAConfiguration;
import sr.unasat.clinictest.dao.StaffDAO;
import sr.unasat.clinictest.entity.Staff;

import java.util.List;

public class StaffService {
    private static StaffDAO staffDAO;

    public StaffService() {
        if (staffDAO == null) {
            staffDAO = new StaffDAO(JPAConfiguration.getEntityManager());
        }
    }

    public List<Staff> all() {
        return staffDAO.all();
    }

    public List<Staff> search(Staff staff) {
        return staffDAO.search(staff);
    }
}
