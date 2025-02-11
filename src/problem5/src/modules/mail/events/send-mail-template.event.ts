import EventEmitter from 'events';

import { NodeMailerService } from '../providers';

class SendMailTemplateEvent extends EventEmitter {
  constructor() {
    super();
    this.on('sendMailTemplate', this.emitSendMailTemplate);
  }

  private async emitSendMailTemplate(email: string): Promise<void> {
    try {
      await NodeMailerService.sendMailTemplate(email);
    } catch (error) {
      throw error;
    }
  }
}

export default new SendMailTemplateEvent();
