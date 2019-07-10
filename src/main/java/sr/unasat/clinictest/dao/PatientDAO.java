package sr.unasat.clinictest.dao;

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
        String jpql = "select p from Patient p where p.insuranceNumber = :insuranceNumber";
        TypedQuery<Patient> patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
        patientTypedQuery.setParameter("insuranceNumber", patient.getInsuranceNumber());
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
        String jpql = "select p from Patient p where p.lastName = :lastName and p.firstName = :firstName";
        TypedQuery<Patient> patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
        patientTypedQuery.setParameter("lastName", patient.getLastName());
        patientTypedQuery.setParameter("firstName", patient.getFirstName());
        try {
            Patient patientTemp = patientTypedQuery.getSingleResult();
            entityManager.getTransaction().commit();
            patient.setLastName(null);
            patient.setFirstName(null);
            return patient;
        } catch (NoResultException noName) {
            jpql = "select p from Patient p where p.insuranceNumber = :insuranceNumber";
            patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
            patientTypedQuery.setParameter("insuranceNumber", patient.getInsuranceNumber());
            try {
                Patient patientTemp = patientTypedQuery.getSingleResult();
                entityManager.getTransaction().commit();
                patient.setInsuranceNumber(null);
                return patient;
            } catch (NoResultException noInsuranceNumber) {
                entityManager.persist(patient);
                entityManager.getTransaction().commit();
                return patient;
            }
        }
    }

    public Patient visit(Patient patient) {
        entityManager.getTransaction().begin();
        String jpql = "select p from Patient p join p.visits v where p.insuranceNumber = :insuranceNumber and v.date = :date order by v.date desc";
        TypedQuery<Patient> patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
        patientTypedQuery.setParameter("insuranceNumber", patient.getInsuranceNumber());
        patientTypedQuery.setParameter("date", LocalDate.now());
        List<Patient> patients = patientTypedQuery.getResultList();
        if (patients.size() > 0) {
            patients.get(0).getVisits().get(patients.get(0).getVisits().size() - 1).setAnamnesis(patients.get(0).getVisits().get(patients.get(0).getVisits().size() - 1).getAnamnesis() + ", " + patient.getVisits().get(0).getAnamnesis());
            entityManager.merge(patients.get(0));
            entityManager.getTransaction().commit();
            return patients.get(0);
        } else {
            jpql = "select p from Patient p where p.insuranceNumber = :insuranceNumber";
            patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
            patientTypedQuery.setParameter("insuranceNumber", patient.getInsuranceNumber());
            try {
                Patient patientTemp = patientTypedQuery.getSingleResult();
                Visit visit = new Visit();
                visit.setPatient(patientTemp);
                visit.setDate(LocalDate.now());
                visit.setAnamnesis(patient.getVisits().get(0).getAnamnesis());
                entityManager.persist(visit);
                jpql = "select p from Patient p where p.insuranceNumber = :insuranceNumber";
                patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
                patientTypedQuery.setParameter("insuranceNumber", patient.getInsuranceNumber());
                try {
                    patientTemp = patientTypedQuery.getSingleResult();
                    entityManager.getTransaction().commit();
                    return patientTemp;
                } catch (NoResultException e) {
                    entityManager.getTransaction().commit();
                    return new Patient();
                }
            } catch (NoResultException e) {
                entityManager.getTransaction().commit();
                return new Patient();
            }
        }
    }

    public Patient update(Patient patient) {
        entityManager.getTransaction().begin();
        entityManager.merge(patient);
        entityManager.getTransaction().commit();
        return patient;
    }

    public List<Patient> report(InsuranceCompany insuranceCompany) {
        entityManager.getTransaction().begin();
        String jpql = "select p from Patient p join p.visits v where p.insurance.insuranceCompany.name = :name and v.date between :startDate and :endDate";
        TypedQuery<Patient> patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
        patientTypedQuery.setParameter("name", insuranceCompany.getName());
        patientTypedQuery.setParameter("startDate", LocalDate.now().withDayOfMonth(1));
        patientTypedQuery.setParameter("endDate", LocalDate.now().withDayOfMonth(LocalDate.now().lengthOfMonth()));
        List<Patient> patients = patientTypedQuery.getResultList();
        entityManager.getTransaction().commit();
        return patients;
    }
}
