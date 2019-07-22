package sr.unasat.clinictest.service;

import sr.unasat.clinictest.config.JPAConfiguration;
import sr.unasat.clinictest.dao.PatientDAO;
import sr.unasat.clinictest.entity.InsuranceCompany;
import sr.unasat.clinictest.entity.Patient;

import java.time.LocalDate;
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

    public Patient search(Patient patient) {
        return patientDAO.search(patient);
    }

    public Patient register(Patient patient) {
        return patientDAO.register(patient);
    }

    public Patient visit(Patient patient) {
        return patientDAO.visit(patient);
    }

    public Patient update(Patient patient) {
        return patientDAO.update(patient);
    }

    public List<Patient> report(InsuranceCompany insuranceCompany, LocalDate date) {
        return patientDAO.report(insuranceCompany, date);
    }

    public List<Patient> report(InsuranceCompany insuranceCompany, LocalDate startDate, LocalDate endDate) {
        return patientDAO.report(insuranceCompany, startDate, endDate);
    }
}
