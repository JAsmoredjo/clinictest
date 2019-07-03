package sr.unasat.clinictest.controller;

import sr.unasat.clinictest.entity.Insurance;
import sr.unasat.clinictest.service.InsuranceService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("insurance")
public class InsuranceController {
    private InsuranceService insuranceService = new InsuranceService();

    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Insurance> all() {
        return insuranceService.all();
    }
}
