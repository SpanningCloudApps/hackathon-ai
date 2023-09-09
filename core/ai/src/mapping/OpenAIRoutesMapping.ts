import { FastifyInstance } from 'fastify/types/instance';
import { FastifyRequest } from 'fastify/types/request';
import { openAIFacade } from 'facades/OpenAIFacade';
import { tensorFlowConnector } from 'tensorflow/TensorFlowConnector';
import { OpenAIRequestBody, ReinforcementRequestBody } from 'dto/RequestDto';

const addOpenAiRoutes = (server: FastifyInstance) => {
  server.register((app, _, done) => {
    app.post(
      '/test',
      async (req: FastifyRequest, res) => {
        const { ticket } = (req.body as OpenAIRequestBody);

        try {
          const result = await openAIFacade.categorize(ticket);

          res.send(result);
        } catch (err) {
          console.error('Request to /ai/test failed', err);
          res.status(500).send({ errorMessage: err.message });
        }
      }
    );

    app.post(
      '/learn',
      async (req: FastifyRequest, res) => {
        const { prompt } = (req.body as ReinforcementRequestBody);

        try {
          await openAIFacade.reinforcementLearn(prompt);

          res.status(204);
        } catch (err) {
          console.error('Request to /ai/learn failed', err);
          res.status(500).send({ errorMessage: err.message });
        }
      }
    );

    app.post(
      '/tensorflow',
      async (req: FastifyRequest, res) => {
        const { ticket } = (req.body as OpenAIRequestBody);

        let ticketPrompt = `Request's title: ${ticket.title}, the request is following: ${ticket.description}.`;
        if (ticket.additionalInfo) {
          ticketPrompt = `${ticketPrompt}. Additional helpful information: ${ticket.additionalInfo.join(', ')}.`
        }

        try {
          const result = await tensorFlowConnector.executeWithContext('what ideas Tesla pursued?');

          res.send(result);
        } catch (err) {
          console.error('Request to /ai/test failed', err);
          res.status(500).send({ errorMessage: err.message });
        }
      }
    )

    done();
  }, { prefix: 'ai' })
};

export {
  addOpenAiRoutes
};
