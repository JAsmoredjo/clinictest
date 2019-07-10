package sr.unasat.clinictest.entity;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "queue")
public class Queue {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "patient_fk", nullable = false)
    private Patient patient;

    @Column(name = "priority", nullable = false)
    private Boolean priority;

    @Column(name = "status", nullable = false)
    private String status;

    public Queue() {
    }

    public Queue(int id, LocalDate date, Patient patient, Boolean priority, String status) {
        this.id = id;
        this.date = date;
        this.patient = patient;
        this.priority = priority;
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

    public Boolean getPriority() {
        return priority;
    }

    public void setPriority(Boolean priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}