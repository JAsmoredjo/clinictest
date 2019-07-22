package sr.unasat.clinictest.service;

import sr.unasat.clinictest.utility.MYSQL;

import java.io.IOException;

public class BackupService {
    private static MYSQL mysql;

    public BackupService() {
        if (mysql == null) {
            mysql = new MYSQL();
        }
    }

    public void create(String date) throws IOException, InterruptedException {
        mysql.createBackup(date);
    }

    public void restore(String file) throws IOException, InterruptedException {
        mysql.restoreBackup(file);
    }
}
