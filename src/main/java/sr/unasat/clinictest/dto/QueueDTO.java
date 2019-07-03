package sr.unasat.clinictest.dto;

import sr.unasat.clinictest.entity.Patient;

import java.time.LocalDate;

public class QueueDTO {
    private int id;

    private LocalDate date;

    private Patient patient;

    private String status;

    public QueueDTO() {
    }

    public QueueDTO(int id, LocalDate date, Patient patient, String status) {
        this.id = id;
        this.date = date;
        this.patient = patient;
        this.status = status;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}