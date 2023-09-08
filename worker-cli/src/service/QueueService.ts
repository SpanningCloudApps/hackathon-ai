/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */
import config from 'config';

export default class QueueService {

  private readonly workflowRequestQueue: string;
  private readonly workflowResultQueue: string;
  private readonly workflowStepInteractionRequestQueue: string;
  private readonly workflowStepInteractionResultQueue: string;

  constructor() {
    this.workflowRequestQueue = config.get('sqs.queues.workflowRequestQueue');
    this.workflowResultQueue = config.get('sqs.queues.workflowResultQueue');
    this.workflowStepInteractionRequestQueue = config.get('sqs.queues.workflowStepInteractionRequestQueue');
    this.workflowStepInteractionResultQueue = config.get('sqs.queues.workflowStepInteractionResultQueue');
  }

  public async subscribeToWorkflows() {
    console.log(`Subscribed to workflows ${this.workflowRequestQueue}`);
  }

  public async publishWorkflowResult(data: any) {
    console.log(`Publish message to the queue ${this.workflowResultQueue} data ${JSON.stringify(data)}`);
  }

  public async subscribeToStepResults() {
    console.log(`Subscribed to step results for the queue ${this.workflowStepInteractionRequestQueue}`);
  }

  public async publishStepDataRequest(data: any) {
    console.log(`Publish message to the queue ${this.workflowStepInteractionResultQueue} data ${JSON.stringify(data)}`);
  }

}
