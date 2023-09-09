import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GlobalValueService {
  private globalValue: string= "Last 1 Hour";
  private timeStr : any =this.getLastHour();

  constructor(private datePipe: DatePipe) {

   }
  getGlobalValue() {
    return this.globalValue;
  }
  
  setGlobalValue(value: any) {
    this.globalValue = value;
  }

  getTimeValue(){
    return this.timeStr;
  }

  getLastHour(){
    const now = new Date(); 
    const start = new Date(now.getTime() - 60 * 60 * 1000);
    return this.formatTime(start);
  }

  formatTime(date: Date): string {
    return this.datePipe.transform(date, 'h:mm a');
  }

}
