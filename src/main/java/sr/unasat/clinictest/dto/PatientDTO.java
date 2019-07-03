package sr.unasat.clinictest.dto;

import sr.unasat.clinictest.entity.Insurance;
import sr.unasat.clinictest.entity.Staff;
import sr.unasat.clinictest.entity.Visit;

import java.util.ArrayList;
import java.util.List;

public class PatientDTO {
    private int id;

    private String lastName;

    private String firstName;

    private Insurance insurance;

    private String insuranceNumber;

    private Staff doctor;

    private List<Visit> visits = new ArrayList<>();

    public PatientDTO() {
    }

    public PatientDTO(int id, String lastName, String firstName, Insurance insurance, String insuranceNumber, Staff doctor, List<Visit> visits) {
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