import { Component,ViewChild } from '@angular/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';

export const MY_FORMATS = {
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
})
export class AppComponent {
 

  date = new FormControl(new Date());

  chosenYearHandler(normalizedYear: Date) {
    const ctrlValue = this.date.value;
    ctrlValue.setFullYear(normalizedYear.getFullYear());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Date,picker :MatDatepicker<Date> ) {
    const ctrlValue = this.date.value;
    ctrlValue.setMonth(normalizedMonth.getMonth());
    this.date.setValue(ctrlValue);
    picker.close()
  }

   
}
