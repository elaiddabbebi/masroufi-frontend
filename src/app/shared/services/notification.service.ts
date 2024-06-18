import {Injectable} from "@angular/core";
import {MessageService} from "primeng/api";
import {TranslatePipe} from "../pipes/translate.pipe";

@Injectable()
export class NotificationService {

  constructor(
    private messageService: MessageService,
    private translate: TranslatePipe
  ) {}

  public notifySuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: this.translate.transform(message),
    });
  }

  public notifyWarning(message: string): void {
    this.messageService.add({
      severity: 'warn',
      summary: this.translate.transform(message),
    });
  }

  public notifyError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: this.translate.transform(message),
    });
  }

  public notifyInfo(message: string): void {
    this.messageService.add({
      severity: 'info',
      summary: this.translate.transform(message),
    });
  }

  public clear(): void {
    this.messageService.clear();
  }
}
