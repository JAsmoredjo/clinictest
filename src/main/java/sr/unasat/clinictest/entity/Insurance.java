package sr.unasat.clinictest.entity;

import javax.persistence.*;

@Entity
@Table(name = "insurance")
public class Insurance {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "insurance_company_fk", nullable = false)
    private InsuranceCompany insuranceCompany;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    public Insurance() {
    }

    public Insurance(int id, InsuranceCompany insuranceCompany, String name) {
        this.id = id;
        this.insuranceCompany = insuranceCompany;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public InsuranceCompany getInsuranceCompany() {
        return insuranceCompany;
    }

    public void setInsuranceCompany(InsuranceCompany insuranceCompany) {
        this.insuranceCompany = insuranceCompany;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
