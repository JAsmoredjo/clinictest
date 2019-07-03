package sr.unasat.clinictest.dao;

import sr.unasat.clinictest.entity.Insurance;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

public class InsuranceDAO {
    private EntityManager entityManager;

    public InsuranceDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Insurance> all() {
        entityManager.getTransaction().begin();
        String jpql = "select i from Insurance i order by i.insuranceCompany.name asc, i.name asc";
        TypedQuery<Insurance> insuranceTypedQuery = entityManager.createQuery(jpql, Insurance.class);
        List<Insurance> insurances = insuranceTypedQuery.getResultList();
        entityManager.getTransaction().commit();
        return insurances;
    }
}
