package sr.unasat.clinictest.controller;

import sr.unasat.clinictest.entity.Staff;
import sr.unasat.clinictest.service.StaffService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("staff")
public class StaffController {
    private StaffService staffService = new StaffService();

    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Staff> all() {
        return staffService.all();
    }
}
