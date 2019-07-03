package sr.unasat.clinictest.dao;

import sr.unasat.clinictest.entity.Staff;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import java.util.List;

public class StaffDAO {
    private EntityManager entityManager;

    public StaffDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Staff> all() {
        entityManager.getTransaction().begin();
        String jpql = "select s from Staff s order by s.lastName asc, s.firstName asc";
        TypedQuery<Staff> staffTypedQuery = entityManager.createQuery(jpql, Staff.class);
        List<Staff> staff = staffTypedQuery.getResultList();
        entityManager.getTransaction().commit();
        return staff;
    }
}
