package sr.unasat.clinictest.dao;

import sr.unasat.clinictest.entity.Staff;
import sr.unasat.clinictest.entity.User;
import sr.unasat.clinictest.utility.PBKDF2;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.TypedQuery;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;

public class UserDAO {
    private EntityManager entityManager;

    public UserDAO(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<User> all() {
        entityManager.getTransaction().begin();
        String jpql = "select u from User u";
        TypedQuery<User> userTypedQuery = entityManager.createQuery(jpql, User.class);
        List<User> users = userTypedQuery.getResultList();
        entityManager.getTransaction().commit();
        return users;
    }

    public User login(User user) throws NoSuchAlgorithmException, InvalidKeySpecException {
        entityManager.getTransaction().begin();
        String jpql = "select u from User u where u.username = :username";
        TypedQuery<User> userTypedQuery = entityManager.createQuery(jpql, User.class);
        userTypedQuery.setParameter("username", user.getUsername());
        try {
            User userTemp = userTypedQuery.getSingleResult();
            PBKDF2 pbkdf2 = new PBKDF2();
            if (pbkdf2.validate(user.getPassword(), userTemp.getPassword(), userTemp.getSalt())) {
                user.setStaff(userTemp.getStaff());
            } else {
                user = new User();
            }
            entityManager.getTransaction().commit();
            return user;
        } catch (NoResultException e) {
            entityManager.getTransaction().commit();
            return new User();
        }
    }

    public User register(User user) throws NoSuchAlgorithmException, InvalidKeySpecException {
        entityManager.getTransaction().begin();
        String jpql = "select u from User u where u.username = :username";
        TypedQuery<User> userTypedQuery = entityManager.createQuery(jpql, User.class);
        userTypedQuery.setParameter("username", user.getUsername());
        try {
            User userTemp = userTypedQuery.getSingleResult();
            entityManager.getTransaction().commit();
            user.setUsername(null);
            return user;
        } catch (NoResultException noUser) {
            jpql = "select s from Staff s where s.firstName = :firstName and s.lastName = :lastName";
            TypedQuery<Staff> staffTypedQuery = entityManager.createQuery(jpql, Staff.class);
            staffTypedQuery.setParameter("firstName", user.getStaff().getFirstName());
            staffTypedQuery.setParameter("lastName", user.getStaff().getLastName());
            try {
                Staff staff = staffTypedQuery.getSingleResult();
                entityManager.getTransaction().commit();
                user.setStaff(null);
                return user;
            } catch (NoResultException noStaff) {
                PBKDF2 pbkdf2 = new PBKDF2();
                String hash = pbkdf2.hash(user.getPassword());
                String[] hashSplit = hash.split(":");
                user.setPassword(hashSplit[0]);
                user.setSalt(hashSplit[1]);
                entityManager.persist(user.getStaff());
                entityManager.persist(user);
                entityManager.getTransaction().commit();
                return user;
            }
        }
    }
}