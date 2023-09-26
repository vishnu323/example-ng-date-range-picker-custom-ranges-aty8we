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


  chosenYearHandler(normalizedYear: any) {
    const ctrlValue = this.date.value || new Date();
    ctrlValue.setFullYear(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }


  chosenMonthHandler(normalizedMonth: any,picker : MatDatepicker<any>) {
    const ctrlValue = this.date.value || new Date();
    ctrlValue.setMonth(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    picker.close()

  }

 
  previousYear() {
    const selectedDate = this.date.value || new Date();
    selectedDate.setFullYear(selectedDate.getFullYear() - 1);
    this.date.setValue(selectedDate);
    
  }


  nextYear() {
    const selectedDate = this.date.value || new Date();
    selectedDate.setFullYear(selectedDate.getFullYear() + 1);
    this.date.setValue(selectedDate);
  }
}
