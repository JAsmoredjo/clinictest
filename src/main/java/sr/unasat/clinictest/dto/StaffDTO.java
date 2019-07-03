package sr.unasat.clinictest.dto;

public class StaffDTO {
    private int id;

    private String lastName;

    private String firstName;

    private String job;

    private String status;

    public StaffDTO() {
    }

    public StaffDTO(int id, String lastName, String firstName, String job, String status) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.job = job;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}