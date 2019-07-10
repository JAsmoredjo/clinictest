package sr.unasat.clinictest.dao;

import sr.unasat.clinictest.entity.Patient;
import sr.unasat.clinictest.entity.Queue;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import java.time.LocalDate;
import java.util.List;

public class QueueDAO {
    private EntityManager entityManager;

    public QueueDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Queue> all() {
        entityManager.getTransaction().begin();
        String jpql = "select q from Queue q";
        TypedQuery<Queue> queueTypedQuery = entityManager.createQuery(jpql, Queue.class);
        List<Queue> queues = queueTypedQuery.getResultList();
        entityManager.getTransaction().commit();
        return queues;
    }

    public List<Queue> today() {
        entityManager.getTransaction().begin();
        String jpql = "select q from Queue q where q.date = :date and q.status != 'Finished' and q.status != 'Canceled'";
        TypedQuery<Queue> queueTypedQuery = entityManager.createQuery(jpql, Queue.class);
        queueTypedQuery.setParameter("date", LocalDate.now());
        List<Queue> queues = queueTypedQuery.getResultList();
        entityManager.getTransaction().commit();
        return queues;
    }

    public List<Queue> queue(Queue queue) {
        entityManager.getTransaction().begin();
        String jpql = "select p from Patient p where p.insuranceNumber = :insuranceNumber";
        TypedQuery<Patient> patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
        patientTypedQuery.setParameter("insuranceNumber", queue.getPatient().getInsuranceNumber());
        try {
            Patient patient = patientTypedQuery.getSingleResult();
            queue.setDate(LocalDate.now());
            queue.setPatient(patient);
            queue.setPriority(false);
            queue.setStatus("Waiting");
            entityManager.persist(queue);
            entityManager.getTransaction().commit();
            return today();
        } catch (NoResultException e) {
            entityManager.getTransaction().commit();
            return today();
        }
    }

    public List<Queue> update(Queue queue) {
        entityManager.getTransaction().begin();
        String jpql = "select q from Queue q where q.id = :id";
        TypedQuery<Queue> queueTypedQuery = entityManager.createQuery(jpql, Queue.class);
        queueTypedQuery.setParameter("id", queue.getId());
        try {
            Queue queueTemp = queueTypedQuery.getSingleResult();
            if (queue.getPriority() != null) {
                queueTemp.setPriority(queue.getPriority());
            }
            if (queue.getStatus() != null) {
                queueTemp.setStatus(queue.getStatus());
            }
            entityManager.merge(queueTemp);
            entityManager.getTransaction().commit();
            return today();
        } catch (NoResultException e) {
            entityManager.getTransaction().commit();
            return today();
        }
    }
}
