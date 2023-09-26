import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe], // Add DatePipe as a provider
})
export class AppComponent {
  date = new FormControl();

  constructor(private datePipe: DatePipe) {}

  chosenYearHandler(normalizedYear: Date) {
    const ctrlValue = this.date.value || new Date();
    ctrlValue.setFullYear(normalizedYear.getFullYear());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Date, dp: MatDatepicker<Date>) {
    const ctrlValue = this.date.value || new Date();
    ctrlValue.setMonth(normalizedMonth.getMonth());
    this.date.setValue(ctrlValue);
    dp.close();
  }

  // Format the date for display in the input field
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'MM/yyyy') || '';
  }
}