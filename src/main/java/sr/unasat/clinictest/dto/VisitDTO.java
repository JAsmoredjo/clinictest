package sr.unasat.clinictest.dto;

import sr.unasat.clinictest.entity.Patient;
import sr.unasat.clinictest.entity.Service;

import java.time.LocalDate;

public class VisitDTO {
    private int id;

    private Patient patient;

    private LocalDate date;

    private Service service;

    private String comment;

    public VisitDTO() {
    }

    public VisitDTO(int id, Patient patient, LocalDate date, Service service, String comment) {
        this.id = id;
        this.patient = patient;
        this.date = date;
        this.service = service;
        this.comment = comment;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Service getService() {
        return service;
    }

    public void setService(Service service) {
        this.service = service;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
