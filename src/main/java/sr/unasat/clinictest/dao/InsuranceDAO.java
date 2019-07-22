package sr.unasat.clinictest.dao;

import sr.unasat.clinictest.entity.Insurance;
import sr.unasat.clinictest.entity.InsuranceCompany;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
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

    public List<Insurance> search(Insurance insurance) {
        entityManager.getTransaction().begin();
        String jpql = "select i from Insurance i where lower(i.insuranceCompany.name) like :insuranceCompanyName or lower(i.name) like :insuranceName order by i.insuranceCompany.name asc, i.name asc";
        TypedQuery<Insurance> insuranceTypedQuery = entityManager.createQuery(jpql, Insurance.class);
        insuranceTypedQuery.setParameter("insuranceCompanyName", "%" + insurance.getInsuranceCompany().getName().toLowerCase() + "%");
        insuranceTypedQuery.setParameter("insuranceName", "%" + insurance.getName().toLowerCase() + "%");
        List<Insurance> insurances = insuranceTypedQuery.getResultList();
        entityManager.getTransaction().commit();
        return insurances;
    }

    public List<Insurance> search(InsuranceCompany insuranceCompany) {
        entityManager.getTransaction().begin();
        String jpql = "select i from Insurance i where lower(i.insuranceCompany.name) = :name order by i.insuranceCompany.name asc, i.name asc";
        TypedQuery<Insurance> insuranceTypedQuery = entityManager.createQuery(jpql, Insurance.class);
        insuranceTypedQuery.setParameter("name", insuranceCompany.getName().toLowerCase());
        List<Insurance> insurances = insuranceTypedQuery.getResultList();
        entityManager.getTransaction().commit();
        return insurances;
    }

    public List<Insurance> register(Insurance insurance) {
        if (insurance.getInsuranceCompany().getId() > 0) {
            entityManager.getTransaction().begin();
            String jpql = "select i from Insurance i where i.insuranceCompany.id = :id and lower(i.name) = :name";
            TypedQuery<Insurance> insuranceTypedQuery = entityManager.createQuery(jpql, Insurance.class);
            insuranceTypedQuery.setParameter("id", insurance.getInsuranceCompany().getId());
            insuranceTypedQuery.setParameter("name", insurance.getName());
            try {
                Insurance insuranceTemp = insuranceTypedQuery.getSingleResult();
                entityManager.getTransaction().commit();
                return new ArrayList<>();
            } catch (NoResultException e) {
                jpql = "select i from InsuranceCompany i where i.id = :id";
                TypedQuery<InsuranceCompany> insuranceCompanyTypedQuery= entityManager.createQuery(jpql, InsuranceCompany.class);
                insuranceCompanyTypedQuery.setParameter("id", insurance.getInsuranceCompany().getId());
                InsuranceCompany insuranceCompany = insuranceCompanyTypedQuery.getSingleResult();
                insurance.setInsuranceCompany(insuranceCompany);
                entityManager.persist(insurance);
                entityManager.getTransaction().commit();
                return search(insuranceCompany);
            }
        } else {
            entityManager.getTransaction().begin();
            entityManager.persist(insurance.getInsuranceCompany());
            entityManager.persist(insurance);
            entityManager.getTransaction().commit();
            return search(insurance.getInsuranceCompany());
        }
    }
}
