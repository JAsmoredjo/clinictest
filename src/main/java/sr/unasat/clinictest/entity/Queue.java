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

    @Column(name = "ticket", nullable = false)
    private int ticket;

    @ManyToOne
    @JoinColumn(name = "patient_fk", nullable = false)
    private Patient patient;

    @Column(name = "status", nullable = false)
    private String status;

    public Queue() {
    }

    public Queue(int id, LocalDate date, int ticket, Patient patient, String status) {
        this.id = id;
        this.date = date;
        this.ticket = ticket;
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

    public int getTicket() {
        return ticket;
    }

    public void setTicket(int ticket) {
        this.ticket = ticket;
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