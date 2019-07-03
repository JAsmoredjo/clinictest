package sr.unasat.clinictest.controller;

import sr.unasat.clinictest.entity.Service;
import sr.unasat.clinictest.service.ServiceService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("service")
public class ServiceController {
    private ServiceService serviceService = new ServiceService();

    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Service> all() {
        return serviceService.all();
    }
}
