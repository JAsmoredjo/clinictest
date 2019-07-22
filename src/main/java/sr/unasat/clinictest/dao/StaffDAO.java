package sr.unasat.clinictest.dao;

import sr.unasat.clinictest.entity.Staff;
import sr.unasat.clinictest.entity.User;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
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

    public List<Staff> search(Staff staff) {
        entityManager.getTransaction().begin();
        String jpql = "select s from Staff s where lower(s.lastName) like :lastName or lower(s.firstName) like :firstName order by s.lastName asc, s.firstName asc";
        TypedQuery<Staff> staffTypedQuery = entityManager.createQuery(jpql, Staff.class);
        staffTypedQuery.setParameter("lastName", "%" + staff.getLastName().toLowerCase() + "%");
        staffTypedQuery.setParameter("firstName", "%" + staff.getLastName().toLowerCase() + "%");
        List<Staff> staffList = staffTypedQuery.getResultList();
        entityManager.getTransaction().commit();
        return staffList;
    }

}
