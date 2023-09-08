/*
 * Copyright (C) 2023 Spanning Cloud Apps.  All rights reserved.
 */

import StepExecutor from '../StepExecutor';
import ExecutedWorkflowService from '../../service/ExecutedWorkflowService';
import ExecutedWorkflowStepService from '../../service/ExecutedWorkflowStepService';
import QueueService from '../../service/QueueService';
import { WorkflowStepRow } from '../../repository/model/WorkflowStep';
import { ExecutedWorkflowRow } from '../../repository/model/ExecutedWorkflow';

export default class AskFullNameStepExecutor implements StepExecutor {

  private readonly executedWorkflowService: ExecutedWorkflowService;
  private readonly executedWorkflowStepService: ExecutedWorkflowStepService;
  private readonly queueService: QueueService;

  constructor(
    executedWorkflowService: ExecutedWorkflowService,
    executedWorkflowStepService: ExecutedWorkflowStepService,
    queueService: QueueService
  ) {
    this.executedWorkflowService = executedWorkflowService;
    this.executedWorkflowStepService = executedWorkflowStepService;
    this.queueService = queueService;
  }

  public execute = async (executedWorkflow: ExecutedWorkflowRow, workflowStep: WorkflowStepRow, message: any): Promise<boolean> => {
    const clientRequest = {
      question: 'Could you provide me a full name of the user?',
      actor: executedWorkflow.data?.actor
    }
    await this.queueService.publishStepDataRequest(JSON.stringify(clientRequest));
    await this.executedWorkflowStepService.createStepExecution(executedWorkflow.id!, workflowStep);
    await this.executedWorkflowService.updateExecutedWorkflowStep(executedWorkflow.id!, workflowStep.type);
    return Promise.resolve(false);
  }

}
