import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartLabelsService {

  commarize() {
    let min;
    min = min || 1e3;
    if (this >= min) {
      var units = ["k", "M", "B", "T"];
      var order = Math.floor(Math.log(+this) / Math.log(1000));
      var unitname = units[(order - 1)];
      var num = Math.floor(+this / 1000 ** order);
      return String(num) + unitname
    }
    return this.toLocaleString()
  }
  constructor() { }
}
