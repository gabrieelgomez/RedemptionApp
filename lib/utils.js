import moment from 'moment';

export function friendlyApiDate(passedString) {
  return (
    passedString ?
    moment(passedString.slice(0,10)).format('DD/MM/YY')
    :
    ''
    )
}
