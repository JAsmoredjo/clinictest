package sr.unasat.clinictest.controller;

import sr.unasat.clinictest.entity.Patient;
import sr.unasat.clinictest.service.PatientService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("patient")
public class PatientController {
    private PatientService patientService = new PatientService();

    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Patient> all() {
        return patientService.all();
    }

    @Path("/search")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Patient search(Patient patient) {
        return patientService.search(patient);
    }

    @Path("/register")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Patient register(Patient patient) {
        return patientService.register(patient);
    }

    @Path("/visit")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Patient visit(Patient patient) {
        return patientService.visit(patient);
    }

    @Path("/update")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Patient update(Patient patient) {
        return patientService.update(patient);
    }
}
