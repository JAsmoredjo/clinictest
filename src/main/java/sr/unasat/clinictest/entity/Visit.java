package sr.unasat.clinictest.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "visit")
public class Visit {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "patient_fk")
    private Patient patient;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "anamnesis", nullable = false)
    private String anamnesis;

    public Visit() {
    }

    public Visit(int id, Patient patient, LocalDate date, String anamnesis) {
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
