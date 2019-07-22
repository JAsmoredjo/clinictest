package sr.unasat.clinictest.dao;

import sr.unasat.clinictest.entity.Insurance;
import sr.unasat.clinictest.entity.InsuranceCompany;
import sr.unasat.clinictest.entity.Patient;
import sr.unasat.clinictest.entity.Visit;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import java.time.LocalDate;
import java.util.List;

public class PatientDAO {
    private EntityManager entityManager;

    public PatientDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Patient> all() {
        entityManager.getTransaction().begin();
        String jpql = "select p from Patient p";
        TypedQuery<Patient> patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
        List<Patient> patients = patientTypedQuery.getResultList();
        entityManager.getTransaction().commit();
        return patients;
    }

    public Patient search(Patient patient) {
        entityManager.getTransaction().begin();
        String jpql = "select p from Patient p where upper(p.insuranceNumber) = :insuranceNumber";
        TypedQuery<Patient> patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
        patientTypedQuery.setParameter("insuranceNumber", patient.getInsuranceNumber().toUpperCase());
        try {
            patient = patientTypedQuery.getSingleResult();
            entityManager.getTransaction().commit();
            return patient;
        } catch (NoResultException e) {
            entityManager.getTransaction().commit();
            return new Patient();
        }
    }

    public Patient register(Patient patient) {
        entityManager.getTransaction().begin();
        String jpql = "select p from Patient p where p.insuranceNumber = :insuranceNumber";
        TypedQuery<Patient> patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
        patientTypedQuery.setParameter("insuranceNumber", patient.getInsuranceNumber());
        try {
            Patient patientTemp = patientTypedQuery.getSingleResult();
            entityManager.getTransaction().commit();
            patient.setInsuranceNumber(null);
            return patient;
        } catch (NoResultException noInsuranceNumber) {
            jpql = "select i from Insurance i where i.name = :name";
            TypedQuery<Insurance> insuranceTypedQuery = entityManager.createQuery(jpql, Insurance.class);
            insuranceTypedQuery.setParameter("name", patient.getInsurance().getName());
            Insurance insurance = insuranceTypedQuery.getSingleResult();
            patient.setInsurance(insurance);
            entityManager.persist(patient);
            entityManager.getTransaction().commit();
            return patient;
        }
    }

    public Patient visit(Patient patient) {
        entityManager.getTransaction().begin();
        String jpql = "select p from Patient p join p.visits v where p.insuranceNumber = :insuranceNumber and v.date = :date";
        TypedQuery<Patient> patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
        patientTypedQuery.setParameter("insuranceNumber", patient.getInsuranceNumber());
        patientTypedQuery.setParameter("date", LocalDate.now());
        try {
            Patient patientTemp = patientTypedQuery.getSingleResult();
            patientTemp.getVisits().get(patientTemp.getVisits().size() - 1).setAnamnesis(patientTemp.getVisits().get(patientTemp.getVisits().size() - 1).getAnamnesis() + ", " + patient.getVisits().get(0).getAnamnesis());
            entityManager.merge(patientTemp);
            entityManager.getTransaction().commit();
            return search(patientTemp);
        } catch (NoResultException e) {
            jpql = "select p from Patient p where p.insuranceNumber = :insuranceNumber";
            patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
            patientTypedQuery.setParameter("insuranceNumber", patient.getInsuranceNumber());
            Patient patientTemp = patientTypedQuery.getSingleResult();
            Visit visit = new Visit();
            visit.setPatient(patientTemp);
            visit.setDate(LocalDate.now());
            visit.setAnamnesis(patient.getVisits().get(0).getAnamnesis());
            entityManager.persist(visit);
            patientTemp.getVisits().add(visit);
            entityManager.merge(patientTemp);
            entityManager.getTransaction().commit();
            return search(patientTemp);
        }
    }

    public Patient update(Patient patient) {
        entityManager.getTransaction().begin();
        String jpql = "select p from Patient p where upper(p.insuranceNumber) = :insuranceNumber";
        TypedQuery<Patient> patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
        patientTypedQuery.setParameter("insuranceNumber", patient.getInsuranceNumber().toUpperCase());
        try {
            Patient patientTemp = patientTypedQuery.getSingleResult();
            if (patientTemp.getId() == patient.getId()) {
                jpql = "select i from Insurance i where i.name = :name";
                TypedQuery<Insurance> insuranceTypedQuery = entityManager.createQuery(jpql, Insurance.class);
                insuranceTypedQuery.setParameter("name", patient.getInsurance().getName());
                Insurance insurance = insuranceTypedQuery.getSingleResult();
                patientTemp.setLastName(patient.getLastName());
                patientTemp.setFirstName(patient.getFirstName());
                patientTemp.setDateOfBirth(patient.getDateOfBirth());
                patientTemp.setAddress(patient.getAddress());
                patientTemp.setPhoneNumber(patient.getPhoneNumber());
                patientTemp.setInsurance(insurance);
                patientTemp.setInsuranceNumber(patient.getInsuranceNumber());
                entityManager.merge(patientTemp);
                entityManager.getTransaction().commit();
                return patientTemp;
            } else {
                patient.setInsuranceNumber(null);
                entityManager.getTransaction().commit();
                return patient;
            }
        } catch (NoResultException e) {
            jpql = "select p from Patient p where p.id = :id";
            patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
            patientTypedQuery.setParameter("id", patient.getId());
            Patient patientTemp = patientTypedQuery.getSingleResult();
            jpql = "select i from Insurance i where i.name = :name";
            TypedQuery<Insurance> insuranceTypedQuery = entityManager.createQuery(jpql, Insurance.class);
            insuranceTypedQuery.setParameter("name", patient.getInsurance().getName());
            Insurance insurance = insuranceTypedQuery.getSingleResult();
            patientTemp.setLastName(patient.getLastName());
            patientTemp.setFirstName(patient.getFirstName());
            patientTemp.setDateOfBirth(patient.getDateOfBirth());
            patientTemp.setAddress(patient.getAddress());
            patientTemp.setPhoneNumber(patient.getPhoneNumber());
            patientTemp.setInsurance(insurance);
            patientTemp.setInsuranceNumber(patient.getInsuranceNumber());
            entityManager.getTransaction().commit();
            return patientTemp;
        }
    }

    public List<Patient> report(InsuranceCompany insuranceCompany, LocalDate date) {
        entityManager.getTransaction().begin();
        String jpql = "select p from Patient p join p.visits v where p.insurance.insuranceCompany.name = :name and v.date between :startDate and :endDate";
        TypedQuery<Patient> patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
        patientTypedQuery.setParameter("name", insuranceCompany.getName());
        patientTypedQuery.setParameter("startDate", date.withDayOfMonth(1));
        patientTypedQuery.setParameter("endDate", date.withDayOfMonth(date.lengthOfMonth()));
        List<Patient> patients = patientTypedQuery.getResultList();
        entityManager.getTransaction().commit();
        for (Patient patient : patients) {
            for (Visit visit : patient.getVisits()) {
                if (visit.getDate().isBefore(date.withDayOfMonth(1)) || visit.getDate().isAfter(date.withDayOfMonth(date.lengthOfMonth()))) {
                    patient.getVisits().remove(visit);
                }
            }
        }
        return patients;
    }

    public List<Patient> report(InsuranceCompany insuranceCompany, LocalDate startDate, LocalDate endDate) {
        entityManager.getTransaction().begin();
        String jpql = "select p from Patient p join p.visits v where p.insurance.insuranceCompany.name = :name and v.date between :startDate and :endDate";
        TypedQuery<Patient> patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
        patientTypedQuery.setParameter("name", insuranceCompany.getName());
        patientTypedQuery.setParameter("startDate", startDate);
        patientTypedQuery.setParameter("endDate", endDate);
        List<Patient> patients = patientTypedQuery.getResultList();
        entityManager.getTransaction().commit();
        for (Patient patient : patients) {
            for (Visit visit : patient.getVisits()) {
                if (visit.getDate().isBefore(startDate) || visit.getDate().isAfter(endDate)) {
                    patient.getVisits().remove(visit);
                }
            }
        }
        return patients;
    }
}
