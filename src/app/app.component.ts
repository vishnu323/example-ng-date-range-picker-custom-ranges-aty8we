import { Component,ViewChild } from '@angular/core';
import {MatDatepicker} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // startDate = new Date(); // The initial date to show in the calendar
  // selectedYear: number = this.startDate.getFullYear();

  // onSelectedChange(event: any) {
  //   // Handle the selected date change here
  //   if (event) {
  //     this.selectedYear = event.getFullYear();
  //     console.log(`Selected Year: ${this.selectedYear}`);
  //   }
  // }

  // previousYear() {
  //   // Navigate to the previous year
  //   this.selectedYear -= 1;
  // }

  // nextYear() {
  //   // Navigate to the next year
  //   this.selectedYear += 1;
  // }


  date = new FormControl(new Date());

  get selectedYearAndMonth(): Date {
    return this.date.value;
  }

  chosenYearHandler(normalizedYear: Date) {
    const ctrlValue = this.date.value;
    ctrlValue.setFullYear(normalizedYear.getFullYear());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Date) {
    const ctrlValue = this.date.value;
    ctrlValue.setMonth(normalizedMonth.getMonth());
    this.date.setValue(ctrlValue);
  }

   
}
