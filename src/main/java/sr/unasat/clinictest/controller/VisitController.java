package sr.unasat.clinictest.controller;

import sr.unasat.clinictest.entity.Visit;
import sr.unasat.clinictest.service.VisitService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("visit")
public class VisitController {
    private VisitService visitService = new VisitService();

    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Visit> all() {
        return visitService.all();
    }
}
