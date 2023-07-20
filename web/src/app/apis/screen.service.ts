import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class ScreenService {
  
    private requestSubject = new BehaviorSubject<string>('Initial Value');
    public request$ = this.requestSubject.asObservable();
    private responseSubject = new BehaviorSubject<string>('Initial Value');
    public response$ = this.responseSubject.asObservable();
  
    updateRequest(req: string) {
      this.requestSubject.next(req);
    };
  
    updateResponse(res: string) {
        this.responseSubject.next(res);
    };

};