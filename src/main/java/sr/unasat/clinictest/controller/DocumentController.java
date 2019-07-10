package sr.unasat.clinictest.controller;

import sr.unasat.clinictest.service.DocumentService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.File;

@Path("document")
public class DocumentController {
    private DocumentService documentService = new DocumentService();
    private static final String PATH = "C:\\Report\\";

    @Path("/visit")
    @GET
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response visit() {
        documentService.createVisitReport();
        File file = new File(PATH + "Visit.zip");
        Response.ResponseBuilder response  = Response.ok((Object) file);
        response.header("Content-Disposition", "attachment; filename=\"Visit.zip\"");
        return response.build();
    }
}