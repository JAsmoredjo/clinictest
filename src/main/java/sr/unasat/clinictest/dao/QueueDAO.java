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

    public Queue queue(Queue queue) {
        entityManager.getTransaction().begin();
        String jpql = "select p from Patient p where p.insuranceNumber = :insuranceNumber";
        TypedQuery<Patient> patientTypedQuery = entityManager.createQuery(jpql, Patient.class);
        patientTypedQuery.setParameter("insuranceNumber", queue.getPatient().getInsuranceNumber());
        try {
            Patient patient = patientTypedQuery.getSingleResult();
            queue.setDate(LocalDate.now());
            queue.setPatient(patient);
            entityManager.persist(queue);
            entityManager.getTransaction().commit();
            return queue;
        } catch (NoResultException e) {
            entityManager.getTransaction().commit();
            return new Queue();
        }
    }

    public List<Queue> update(List<Queue> queues) {
        entityManager.getTransaction().begin();
        for (Queue queue : queues) {
            String jpql = "select q from Queue q where q.id = :id";
            TypedQuery<Queue> queueTypedQuery = entityManager.createQuery(jpql, Queue.class);
            queueTypedQuery.setParameter("id", queue.getId());
            Queue queueTemp = queueTypedQuery.getSingleResult();
            queueTemp.setStatus(queue.getStatus());
            if (queue.getStatus() == "Calling" && queue.getPatient().getDoctor().getStatus() != "Busy") {
                queue.getPatient().getDoctor().setStatus("Busy");
            } else {
                queue.getPatient().getDoctor().setStatus("Free");
            }
            entityManager.merge(queueTemp);
        }
        entityManager.getTransaction().commit();
        return queues;
    }

    public List<Queue> call() {
        entityManager.getTransaction().begin();
        String jpql = "select q from Queue q where q.date = :date and q.status = :status";
        TypedQuery<Queue> queueTypedQuery = entityManager.createQuery(jpql, Queue.class);
        queueTypedQuery.setParameter("date", LocalDate.now());
        queueTypedQuery.setParameter("status", "Calling");
        List<Queue> queues = queueTypedQuery.getResultList();
        entityManager.getTransaction().commit();
        return queues;
    }
}
