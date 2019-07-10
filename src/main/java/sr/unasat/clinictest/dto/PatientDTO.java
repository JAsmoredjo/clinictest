package sr.unasat.clinictest.dto;

import sr.unasat.clinictest.entity.Insurance;
import sr.unasat.clinictest.entity.Visit;

import java.util.ArrayList;
import java.util.List;

public class PatientDTO {
    private int id;

    private String lastName;

    private String firstName;

    private String dateOfBirth;

    private String address;

    private int phoneNumber;

    private Insurance insurance;

    private String insuranceNumber;

    private List<Visit> visits = new ArrayList<>();

    public PatientDTO() {
    }

    public PatientDTO(int id, String lastName, String firstName, String dateOfBirth, String address, int phoneNumber, Insurance insurance, String insuranceNumber, List<Visit> visits) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.insurance = insurance;
        this.insuranceNumber = insuranceNumber;
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

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
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

    public List<Visit> getVisits() {
        return visits;
    }

    public void setVisits(List<Visit> visits) {
        this.visits = visits;
    }
}