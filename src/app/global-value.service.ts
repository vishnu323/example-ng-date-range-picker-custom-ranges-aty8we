import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GlobalValueService {
  private globalValue: string= "Last 1 Hour";
  private fromTimeStr : any =this.formatTime(this.getHourDate(1)[0]);
  private toTimeStr : any =this.formatTime(this.getHourDate(1)[1]);
  private startDate : any = new Date();
  private endDate: any = new Date();

  constructor(private datePipe: DatePipe) {

   }
  getGlobalValue() {
    return this.globalValue;
  }
  
  setGlobalValue(value: any) {
    this.globalValue = value;
  }

  getFromTimeValue(){
    return this.fromTimeStr;
  }

  setFromTimeValue(time : any){
    this.fromTimeStr = time
  }
  getToTimeValue(){
    return this.toTimeStr;
  }

  setToTimeValue(time : any){
    this.toTimeStr = time
  }

  getHourDate(hour:number){
    const now = new Date(); 
    const start = new Date(now.getTime() - hour*60 * 60 * 1000);
    return [start,now];
  }

  formatTime(date: Date): string {
    return this.datePipe.transform(date, 'h:mm a');
  }

  getStartDate():Date{
    return this.startDate;
  }
  setStartDate(date: Date):void{
    this.startDate = date;
  }

  getEndDate():Date{
    return this.endDate;
  }
  setEndDate(date: Date):void{
    this.endDate = date;
  }
}
