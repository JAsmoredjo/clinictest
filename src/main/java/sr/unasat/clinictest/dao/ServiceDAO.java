package sr.unasat.clinictest.dao;

import sr.unasat.clinictest.entity.Service;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

public class ServiceDAO {
    private EntityManager entityManager;

    public ServiceDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Service> all() {
        entityManager.getTransaction().begin();
        String jpql = "select s from Service s order by s.name asc";
        TypedQuery<Service> serviceTypedQuery = entityManager.createQuery(jpql, Service.class);
        List<Service> services = serviceTypedQuery.getResultList();
        entityManager.getTransaction().commit();
        return services;
    }
}
