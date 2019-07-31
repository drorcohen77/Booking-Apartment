import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public getRangeOfDates(startAt,endAt) {
    const tempDates=[];
    const mEndAt =moment(endAt);
    let mStartAt =moment(startAt);

    while(mStartAt < endAt) {
      tempDates.push(mStartAt.format('YYYY-MM-DD'));
      mStartAt=mStartAt.add(1,'day');
    }

    tempDates.push(moment(startAt).format('YYYY-MM-DD'));
    tempDates.push(mEndAt.format('YYYY-MM-DD'));

    return tempDates;
  }
}
