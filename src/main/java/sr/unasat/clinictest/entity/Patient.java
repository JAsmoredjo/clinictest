package sr.unasat.clinictest.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "patient")
public class Patient {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @ManyToOne
    @JoinColumn(name = "insurance_fk", nullable = false)
    private Insurance insurance;

    @Column(name = "insurance_number", nullable = false, unique = true)
    private String insuranceNumber;

    @ManyToOne
    @JoinColumn(name = "staff_fk", nullable = false)
    private Staff doctor;

    @OneToMany(mappedBy = "patient")
    private List<Visit> visits = new ArrayList<>();

    public Patient() {
    }

    public Patient(int id, String lastName, String firstName, Insurance insurance, String insuranceNumber, Staff doctor, List<Visit> visits) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.insurance = insurance;
        this.insuranceNumber = insuranceNumber;
        this.doctor = doctor;
        this.visits = visits;
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

    public Insurance getInsurance() {
        return insurance;
    }

    public void setInsurance(Insurance insurance) {
        this.insurance = insurance;
    }

    public String getInsuranceNumber() {
        return insuranceNumber;
    }

    public void setInsuranceNumber(String insuranceNumber) {
        this.insuranceNumber = insuranceNumber;
    }

    public Staff getDoctor() {
        return doctor;
    }

    public void setDoctor(Staff doctor) {
        this.doctor = doctor;
    }

    public List<Visit> getVisits() {
        return visits;
    }

    public void setVisits(List<Visit> visits) {
        this.visits = visits;
    }
}