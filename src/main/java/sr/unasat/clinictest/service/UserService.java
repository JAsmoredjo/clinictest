package sr.unasat.clinictest.service;

import sr.unasat.clinictest.config.JPAConfiguration;
import sr.unasat.clinictest.dao.UserDAO;
import sr.unasat.clinictest.entity.User;

import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;

public class UserService {
    private static UserDAO userDAO;

    public UserService() {
        if (userDAO == null) {
            userDAO = new UserDAO(JPAConfiguration.getEntityManager());
        }
    }

    public List<User> all() {
        return userDAO.all();
    }

    public User login(User user) throws NoSuchAlgorithmException, InvalidKeySpecException {
        return userDAO.login(user);
    }

    public User register(User user) throws NoSuchAlgorithmException, InvalidKeySpecException {
        return userDAO.register(user);
    }

    public User remove(User user) {
        return userDAO.remove(user);
    }

    public User verify(User user) {
        return userDAO.verify(user);
    }

    public User logout(User user) throws NoSuchAlgorithmException, InvalidKeySpecException {
        return userDAO.logout(user);
    }
}
