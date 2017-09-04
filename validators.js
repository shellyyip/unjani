import moment from 'moment'

export function birthYearValidator(year) {
  let birthYear = parseInt(year); 
  let thisYear = moment().year();
  let earliestYear = thisYear - 130;
  return (earliestYear < birthYear && birthYear <= thisYear)
}

