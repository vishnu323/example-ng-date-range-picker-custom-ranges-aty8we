import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { MatDateRangePicker } from '@angular/material/datepicker';
import { GlobalValueService } from '../global-value.service';
const customPresets = [
  'Last 1 Hour',
  'Last 6 Hour',
  'Last 24 Hour',
  'Last 7 days',
  'Last 30 days',
  'Last 90 days',
  'Custom range'
] as const; // convert to readonly tuple of string literals

// equivalent to "today" | "last 7 days" | ... | "last year"
type CustomPreset = typeof customPresets[number];

@Component({
  selector: 'app-custom-range-panel',
  templateUrl: './custom-range-panel.component.html',
  styleUrls: ['./custom-range-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomRangePanelComponent<D> {

 
  // list of range presets we want to provide:
  readonly customPresets = customPresets;
  @HostBinding('class.touch-ui')
  readonly isTouchUi = this.picker.touchUi;
  public todayVar: boolean = true;
  public timeValue: any;

  constructor(
    private dateAdapter: DateAdapter<D>,
    private picker: MatDateRangePicker<D>,
    private globalValueService: GlobalValueService
    
  ) {
   this.timeValue = this.globalValueService.getFromTimeValue();
  }

  updateGlobalValue(newValue: any) {
    this.globalValueService.setGlobalValue(newValue);
  }

  // Example of getting the global value
  getGlobalValue() {
    return this.globalValueService.getGlobalValue();
  }


  applyClassOrStyleOnce() {
    const ref:any = document.querySelector(`#Today`);
    ref.style.backgroundColor = "blue"
  }

  ngAfterViewInit() {
    if(this.getGlobalValue()){
      const ref:any = document.querySelector(`#${this.replaceSpacesWithHyphens(this.getGlobalValue())}`);
      ref.style.backgroundColor = "blue"
      const textElement = ref.querySelectorAll("span");
      textElement[0].style.color='white'
    }
  }
  // called when user selects a range preset:
  selectRange(rangeName: CustomPreset): void {
    const [start, end] = this.calculateDateRange(rangeName);
    this.picker.select(start);
    this.picker.select(end);
    if(start && end){
      this.picker.close();
    }
    
  }
 
  setBackGround = (id:string,type:string) =>{
    const ref:any = document.querySelector(`#${this.replaceSpacesWithHyphens(id)}`);
    if(ref){
      ref.style.backgroundColor=type;
      const textElement = ref.querySelectorAll("span");
      textElement[0].style.color='white'
    }
  }


  idSelector = (id:string) =>{
      this.setBackGround(id,"blue");
      this.updateGlobalValue(id);
  }

    replaceSpacesWithHyphens = (inputString:any) =>{
      return inputString.replace(/ /g, '-');
    }
  
  updateFromToTime(start,end){
    const startFormat = this.globalValueService.formatTime(start);
    const endFormat = this.globalValueService.formatTime(end);
    this.globalValueService.setFromTimeValue(startFormat);
    this.globalValueService.setToTimeValue(endFormat)
  }

  private calculateDateRange(rangeName: CustomPreset): [start: any, end: any] {
    const today = this.today;
    const year = this.dateAdapter.getYear(today);
    this.idSelector(rangeName);
    switch (rangeName) {
      case 'Last 1 Hour':
        const [start,end] = this.globalValueService.getHourDate(1);
        this.updateFromToTime(start,end)
        return [start, end];
      case 'Last 6 Hour': {
        const [start,end] = this.globalValueService.getHourDate(6);
        this.updateFromToTime(start,end)
        
        return [start, end];
      }
      case 'Last 24 Hour': {
        const [start,end] = this.globalValueService.getHourDate(24);
        this.updateFromToTime(start,end)
        return [start, end];
      }
      case 'Last 7 days': {
        const start = this.dateAdapter.addCalendarDays(today, -6);
        return [today, today];
      }
      case 'Last 30 days':{
        const end = today;
        const start = this.dateAdapter.addCalendarDays(today, -30);
        return [start, end];
      }
      case 'Last 90 days': {
        const end = today;
        const start = this.dateAdapter.addCalendarDays(today, -90);
        return [start, end];
      }
      case 'Custom range':{
        const end = today;
        const start = this.dateAdapter.addCalendarDays(today, -90);
        return [null, null];
      }
      default:
      console.log(" vishnu123556")
        // exhaustiveness check;
        // rangeName has type never, if every possible value is handled in the switch cases.
        // Otherwise, the following line will result in compiler error:
        // "Type 'string' is not assignable to type '[start: D, end: D]'"
        return rangeName;
    }
  }

  private get today(): D {
    const today = this.dateAdapter.getValidDateOrNull(new Date());
    if (today === null) {
      throw new Error('date creation failed');
    }
    return today;
  }
}
