package sr.unasat.clinictest.controller;

import sr.unasat.clinictest.service.ReportService;

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
    private ReportService reportService = new ReportService();
    private static final String PATH = "C:\\Report\\";

    @Path("/current")
    @POST
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response current() {
        reportService.createVisitReport(LocalDate.now());
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
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response previous() {
        reportService.createVisitReport(LocalDate.now().minusMonths(1));
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
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response select(@FormParam("startDate") String startDate, @FormParam("endDate") String endDate) {
        reportService.createVisitReport(LocalDate.parse(startDate), LocalDate.parse(endDate));
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