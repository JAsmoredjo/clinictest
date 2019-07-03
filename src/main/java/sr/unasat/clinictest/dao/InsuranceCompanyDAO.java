package sr.unasat.clinictest.dao;

import sr.unasat.clinictest.entity.InsuranceCompany;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

public class InsuranceCompanyDAO {
    private EntityManager entityManager;

    public InsuranceCompanyDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<InsuranceCompany> all() {
        entityManager.getTransaction().begin();
        String jpql = "select i from InsuranceCompany i";
        TypedQuery<InsuranceCompany> insuranceCompanyTypedQuery = entityManager.createQuery(jpql, InsuranceCompany.class);
        List<InsuranceCompany> insuranceCompanies = insuranceCompanyTypedQuery.getResultList();
        entityManager.getTransaction().commit();
        return insuranceCompanies;
    }
}
