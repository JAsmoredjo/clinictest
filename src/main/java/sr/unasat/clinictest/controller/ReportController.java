package sr.unasat.clinictest.controller;

import sr.unasat.clinictest.entity.User;
import sr.unasat.clinictest.service.ReportService;
import sr.unasat.clinictest.service.UserService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.time.LocalDate;

@Path("report")
public class ReportController {
    private UserService userService = new UserService();
    private ReportService reportService = new ReportService();
    private static final String PATH = "C:\\Report\\";

    @Path("/current")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response current(@FormParam("access") String access) {
        User user = new User();
        user.setAccess(access);
        user = userService.verify(user);
        if (user.getId() > 0) {
            reportService.createVisitReport(LocalDate.now());
        } else {
            reportService.createEmptyReport();
        }
        Response.ResponseBuilder response = Response.ok().entity(new StreamingOutput() {
            @Override
            public void write(OutputStream outputStream) throws IOException, WebApplicationException {
                try {
                    Files.copy(Paths.get(PATH + "Report.zip"), outputStream);
                } finally {
                    Files.walkFileTree(Paths.get(PATH), new SimpleFileVisitor<java.nio.file.Path>() {
                        @Override
                        public FileVisitResult visitFile(java.nio.file.Path file, BasicFileAttributes attrs) throws IOException {
                            Files.delete(file);
                            return FileVisitResult.CONTINUE;
                        }

                        @Override
                        public FileVisitResult postVisitDirectory(java.nio.file.Path dir, IOException exc) throws IOException {
                            Files.delete(dir);
                            return FileVisitResult.CONTINUE;
                        }
                    });
                }
            }
        });
        response.header("Content-Disposition", "attachment; filename=\"Report.zip\"");
        return response.build();
    }

    @Path("/previous")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response previous(@FormParam("access") String access) {
        User user = new User();
        user.setAccess(access);
        user = userService.verify(user);
        if (user.getId() > 0) {
            reportService.createVisitReport(LocalDate.now().minusMonths(1));
        } else {
            reportService.createEmptyReport();
        }
        Response.ResponseBuilder response = Response.ok().entity(new StreamingOutput() {
            @Override
            public void write(OutputStream outputStream) throws IOException, WebApplicationException {
                try {
                    Files.copy(Paths.get(PATH + "Report.zip"), outputStream);
                } finally {
                    Files.walkFileTree(Paths.get(PATH), new SimpleFileVisitor<java.nio.file.Path>() {
                        @Override
                        public FileVisitResult visitFile(java.nio.file.Path file, BasicFileAttributes attrs) throws IOException {
                            Files.delete(file);
                            return FileVisitResult.CONTINUE;
                        }

                        @Override
                        public FileVisitResult postVisitDirectory(java.nio.file.Path dir, IOException exc) throws IOException {
                            Files.delete(dir);
                            return FileVisitResult.CONTINUE;
                        }
                    });
                }
            }
        });
        response.header("Content-Disposition", "attachment; filename=\"Report.zip\"");
        return response.build();
    }

    @Path("/custom")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response select(@FormParam("access") String access, @FormParam("startDate") String startDate, @FormParam("endDate") String endDate) {
        User user = new User();
        user.setAccess(access);
        user = userService.verify(user);
        if (user.getId() > 0) {
            reportService.createVisitReport(LocalDate.parse(startDate), LocalDate.parse(endDate));
        } else {
            reportService.createEmptyReport();
        }
        Response.ResponseBuilder response = Response.ok().entity(new StreamingOutput() {
            @Override
            public void write(OutputStream outputStream) throws IOException, WebApplicationException {
                try {
                    Files.copy(Paths.get(PATH + "Report.zip"), outputStream);
                } finally {
                    Files.walkFileTree(Paths.get(PATH), new SimpleFileVisitor<java.nio.file.Path>() {
                        @Override
                        public FileVisitResult visitFile(java.nio.file.Path file, BasicFileAttributes attrs) throws IOException {
                            Files.delete(file);
                            return FileVisitResult.CONTINUE;
                        }

                        @Override
                        public FileVisitResult postVisitDirectory(java.nio.file.Path dir, IOException exc) throws IOException {
                            Files.delete(dir);
                            return FileVisitResult.CONTINUE;
                        }
                    });
                }
            }
        });
        response.header("Content-Disposition", "attachment; filename=\"Report.zip\"");
        return response.build();
    }
}