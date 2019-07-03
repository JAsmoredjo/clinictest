package sr.unasat.clinictest.dao;

import sr.unasat.clinictest.entity.Visit;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

public class VisitDAO {
    private EntityManager entityManager;

    public VisitDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Visit> all() {
        entityManager.getTransaction().begin();
        String jpql = "select v from Visit v";
        TypedQuery<Visit> visitTypedQuery = entityManager.createQuery(jpql, Visit.class);
        List<Visit> visits = visitTypedQuery.getResultList();
        entityManager.getTransaction().commit();
        return visits;
    }
}
