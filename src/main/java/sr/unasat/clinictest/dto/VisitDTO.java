package sr.unasat.clinictest.dto;

import sr.unasat.clinictest.entity.Patient;

import java.time.LocalDate;

public class VisitDTO {
    private int id;

    private Patient patient;

    private LocalDate date;

    private String anamnesis;

    public VisitDTO() {
    }

    public VisitDTO(int id, Patient patient, LocalDate date, String anamnesis) {
        this.id = id;
        this.patient = patient;
        this.date = date;
        this.anamnesis = anamnesis;
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

    public String getAnamnesis() {
        return anamnesis;
    }

    public void setAnamnesis(String anamnesis) {
        this.anamnesis = anamnesis;
    }
}
