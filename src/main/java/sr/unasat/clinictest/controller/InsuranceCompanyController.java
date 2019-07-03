package sr.unasat.clinictest.controller;

import sr.unasat.clinictest.entity.InsuranceCompany;
import sr.unasat.clinictest.service.InsuranceCompanyService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("insurance-company")
public class InsuranceCompanyController {
    private InsuranceCompanyService insuranceCompanyService = new InsuranceCompanyService();

    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<InsuranceCompany> all() {
        return insuranceCompanyService.all();
    }
}
