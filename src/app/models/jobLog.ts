import {Timer2TicketError} from "./timer2TicketError";

export class JobLog {
  _id!: string;
  userId!: string;
  // type: 'config' | 'time-entries'
  type!: string;
  // origin: 't2t-auto' | 'manual'
  origin!: string;
  // status: 'scheduled' | 'running' | 'successful' | 'unsuccessful'
  status!: string;
  scheduledDate!: number;
  started!: number | null;
  completed!: number | null;
  errors: Timer2TicketError[] = [];

  static getDistinctErrorFields(jobLog: JobLog): string {
    const arr = Array.from(
      new Set(
        jobLog.errors
          .map(error => {
            if (error.exception?.status === 403 || error.exception?.status === 401)
              return error.specification;
            const objectId = error.data.objectId === null ? "" : "Object with ID " + error.data.objectId;
            const additionalInfo = error.data.objectExtraInformation.length === 0 ? "" : " (" + error.data.objectExtraInformation.join(", ") + ")";
            const apiErrors = error.data.responseErrors.length === 0 ? "" : " - [" + error.data.responseErrors.join(", ") + "]";
            return error.data.service + " failed - " + objectId + additionalInfo + apiErrors;
          })
          .filter(data => data !== undefined)
      )
    );
    return arr.length === 0 ? "There was some error" : arr.join(', ');
  }

}
