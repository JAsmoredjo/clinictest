package sr.unasat.clinictest.controller;

import sr.unasat.clinictest.entity.Insurance;
import sr.unasat.clinictest.service.InsuranceService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("insurance")
public class InsuranceController {
    private InsuranceService insuranceService = new InsuranceService();

    @Path("/all")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public List<Insurance> all() {
        return insuranceService.all();
    }

    @Path("/search")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Insurance> search(Insurance insurance) {
        return insuranceService.search(insurance);
    }

    @Path("/register")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<Insurance> register(Insurance insurance) {
        return insuranceService.register(insurance);
    }
}
