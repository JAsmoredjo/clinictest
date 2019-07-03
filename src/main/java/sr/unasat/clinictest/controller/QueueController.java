package sr.unasat.clinictest.controller;

import sr.unasat.clinictest.entity.Queue;
import sr.unasat.clinictest.service.QueueService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("queue")
public class QueueController {
    private QueueService queueService = new QueueService();

    @Path("/all")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Queue> all() {
        return queueService.all();
    }

    @Path("/today")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public List<Queue> today() {
        return queueService.today();
    }

    @Path("/queue")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Queue queue(Queue queue) {
        return queueService.queue(queue);
    }

    @Path("/update")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public List<Queue> update(List<Queue> queues) {
        return queueService.update(queues);
    }

    @Path("/call")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    public List<Queue> call() {
        return queueService.call();
    }
}
