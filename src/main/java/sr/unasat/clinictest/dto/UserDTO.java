package sr.unasat.clinictest.dto;

import sr.unasat.clinictest.entity.Staff;

public class UserDTO {
    private int id;

    private String username;

    private String password;

    private String salt;

    private String access;

    private Staff staff;

    public UserDTO() {
    }

    public UserDTO(int id, String username, String password, String salt, String access, Staff staff) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.salt = salt;
        this.access = access;
        this.staff = staff;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getAccess() {
        return access;
    }

    public void setAccess(String access) {
        this.access = access;
    }

    public Staff getStaff() {
        return staff;
    }

    public void setStaff(Staff staff) {
        this.staff = staff;
    }
}