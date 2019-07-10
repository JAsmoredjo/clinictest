package sr.unasat.clinictest.service;

import sr.unasat.clinictest.config.JPAConfiguration;
import sr.unasat.clinictest.dao.QueueDAO;
import sr.unasat.clinictest.entity.Queue;

import java.util.List;

public class QueueService {
    private static QueueDAO queueDAO;

    public QueueService() {
        if (queueDAO == null) {
            queueDAO = new QueueDAO(JPAConfiguration.getEntityManager());
        }
    }

    public List<Queue> all() {
        return queueDAO.all();
    }

    public List<Queue> today() {
        return queueDAO.today();
    }

    public List<Queue> queue(Queue queue) {
        return queueDAO.queue(queue);
    }

    public List<Queue> update(Queue queue) {
        return queueDAO.update(queue);
    }
}
