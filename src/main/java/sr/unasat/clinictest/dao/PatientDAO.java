package sr.unasat.clinictest.dao;

import sr.unasat.clinictest.entity.Patient;

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

    public List<Patient> info(Patient patient) {
        entityManager.getTransaction().begin();
        String jpql = "select q.patient from Queue q where q.date = :date and q.patient.doctor.firstName = :firstName and q.patient.doctor.lastName = :lastName and q.status = :status";
        TypedQuery<Patient> patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
        patientTypedQuery.setParameter("date", LocalDate.now());
        patientTypedQuery.setParameter("firstName", patient.getDoctor().getFirstName());
        patientTypedQuery.setParameter("lastName", patient.getDoctor().getLastName());
        patientTypedQuery.setParameter("status", "In Progress");
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
}
