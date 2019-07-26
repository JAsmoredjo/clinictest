package sr.unasat.clinictest.controller;

import sr.unasat.clinictest.entity.User;
import sr.unasat.clinictest.service.UserService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;
import java.util.List;

@Path("user")
public class UserController {
    private UserService userService = new UserService();

    @Path("/all")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> all() {
        return userService.all();
    }

    @Path("/login")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User login(User user) throws NoSuchAlgorithmException, InvalidKeySpecException {
        return userService.login(user);
    }

    @Path("/register")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User register(User user) throws NoSuchAlgorithmException, InvalidKeySpecException {
        return userService.register(user);
    }

    @Path("/remove")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User remove(User user) {
        return userService.remove(user);
    }

    @Path("/verify")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User verify(User user) {
        return userService.verify(user);
    }

    @Path("/logout")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public User logout(User user) throws NoSuchAlgorithmException, InvalidKeySpecException {
        return userService.logout(user);
    }
}
