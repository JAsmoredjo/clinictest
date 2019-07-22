package sr.unasat.clinictest.dto;

import sr.unasat.clinictest.entity.InsuranceCompany;

public class InsuranceDTO {
    private int id;

    private InsuranceCompany insuranceCompany;

    private String name;

    public InsuranceDTO() {
    }

    public InsuranceDTO(int id, InsuranceCompany insuranceCompany, String name) {
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
