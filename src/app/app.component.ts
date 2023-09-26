import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';

const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AppComponent {
  date = new FormControl(new Date());

  constructor() {}

  updateInfo(year: any){
    const header = document.querySelector(".mat-focus-indicator.mat-calendar-period-button.mat-button.mat-button-base .mat-button-wrapper");
    const subHeaderRef = document.querySelector(".mat-calendar-body-label");
    if(header){
      header.innerHTML = year
    }
    if(subHeaderRef){
      subHeaderRef.innerHTML = year;
    }
   

  }
  chosenMonthHandler(normalizedMonth: any,picker : MatDatepicker<any>) {
    const ctrlValue = this.date.value || new Date();
    ctrlValue.setMonth(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    picker.close()

  }

 
  previousYear() {
    const selectedDate = this.date.value || new Date();
    const prevYear = selectedDate.getFullYear() - 1;
    selectedDate.setFullYear(prevYear);
    this.updateInfo(prevYear)
    this.date.setValue(selectedDate);
    
  }


  nextYear() {
    const selectedDate = this.date.value || new Date();
    const nextYear = selectedDate.getFullYear() + 1;
    selectedDate.setFullYear(nextYear);
    this.updateInfo(nextYear)
    this.date.setValue(selectedDate);
  }
}
