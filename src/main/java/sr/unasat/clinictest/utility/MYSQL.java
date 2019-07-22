package sr.unasat.clinictest.utility;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;

public class MYSQL {
    private static final String PATH = "C:\\Backup\\";

    public void createBackup(String date) throws IOException, InterruptedException {
        File directory = new File(PATH);
        if (!directory.exists()) {
            directory.mkdir();
        }
        Process runtimeProcess = Runtime.getRuntime().exec("mysqldump -uroot -pYin69Yang --databases clinic_test -r \"" + PATH + "Backup-" + date + ".sql\"");
        int processComplete = runtimeProcess.waitFor();
        if (processComplete == 0) {
            System.out.println("Successful");
        } else {
            System.out.println("Failed");
        }
    }

    public void restoreBackup(String file) throws IOException, InterruptedException {
        String[] cmd = new String[]{"mysql", "-uroot", "-pYin69Yang", "-e", "source \"" + PATH + file +"\""};
        Process runtimeProcess = Runtime.getRuntime().exec(cmd);
        int processComplete = runtimeProcess.waitFor();
        if (processComplete == 0) {
            System.out.println("Successful");
            Files.walkFileTree(Paths.get(PATH), new SimpleFileVisitor<Path>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                    Files.delete(file);
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult postVisitDirectory(Path dir, IOException exc) throws IOException {
                    Files.delete(dir);
                    return FileVisitResult.CONTINUE;
                }
            });
        } else {
            System.out.println("Failed");
        }
    }
}
