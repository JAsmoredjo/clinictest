package sr.unasat.clinictest.service;

import sr.unasat.clinictest.config.JPAConfiguration;
import sr.unasat.clinictest.dao.PatientDAO;
import sr.unasat.clinictest.entity.Patient;

import java.util.List;

public class PatientService {
    private static PatientDAO patientDAO;

    public PatientService() {
        if (patientDAO == null) {
            patientDAO = new PatientDAO(JPAConfiguration.getEntityManager());
        }
    }

    public List<Patient> all() {
        return patientDAO.all();
    }

    public List<Patient> info(Patient patient) {
        return patientDAO.info(patient);
    }

    public Patient search(Patient patient) {
        return patientDAO.search(patient);
    }

    public Patient register(Patient patient) {
        return patientDAO.register(patient);
    }
}
