package sr.unasat.clinictest.controller;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;
import sr.unasat.clinictest.entity.User;
import sr.unasat.clinictest.service.BackupService;
import sr.unasat.clinictest.service.UserService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import java.io.*;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.time.LocalDate;

@Path("backup")
public class BackupController {
    private UserService userService = new UserService();
    private BackupService backupService = new BackupService();
    private static final String PATH = "C:\\Backup\\";

    @Path("create")
    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response create(@FormParam("access") String access) throws IOException, InterruptedException {
        String date = LocalDate.now().toString();
        if (access.contains(":")) {
            User user = new User();
            user.setAccess(access);
            user = userService.verify(user);
            if (user.getId() > 0) {
                backupService.create(date);
            } else {
                File directory = new File(PATH);
                if (!directory.exists()) {
                    directory.mkdir();
                }
                File emptyFile = new File(PATH + "Backup-" + date + ".sql");
                emptyFile.createNewFile();
            }
        } else {
            File directory = new File(PATH);
            if (!directory.exists()) {
                directory.mkdir();
            }
            File emptyFile = new File(PATH + "Backup-" + date + ".sql");
            emptyFile.createNewFile();
        }
        Response.ResponseBuilder response = Response.ok().entity(new StreamingOutput() {
            @Override
            public void write(OutputStream outputStream) throws IOException, WebApplicationException {
                try {
                    Files.copy(Paths.get(PATH + "Backup-" + date + ".sql"), outputStream);
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
        response.header("Content-Disposition", "attachment; filename=\"Backup-" + date + ".sql\"");
        return response.build();
    }

    @Path("restore")
    @POST
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public void restore(@FormDataParam("access") String access, @FormDataParam("upload") InputStream is, @FormDataParam("upload") FormDataContentDisposition formData) throws InterruptedException, IOException{
        if (access.contains(":")) {
            User user = new User();
            user.setAccess(access);
            user = userService.verify(user);
            if (user.getId() > 0) {
                File directory = new File(PATH);
                if (!directory.exists()) {
                    directory.mkdir();
                }
                String uploadFile = PATH + formData.getFileName();
                FileOutputStream fos = new FileOutputStream(new File(uploadFile));
                int read = 0;
                byte[] bytes = new byte[1024];
                while ((read = is.read(bytes)) != -1) {
                    fos.write(bytes, 0, read);
                }
                fos.flush();
                fos.close();
                backupService.restore(formData.getFileName());
            }
        }
    }
}
