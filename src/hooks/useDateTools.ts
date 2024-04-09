import moment from 'moment'
import { useContext } from 'react'
import { DatepickerContext } from '../provider'

const useDateTools = () => {
  const config = useContext(DatepickerContext)
  const date = config.date.clone()
  const value = config.value

  const getYear = (date_?: string) => date.format('YYYY')
  const getMonthStartWith = () => date.startOf('month').weekday()
  const momentDatePicker = () => moment
  const getMonths = () => momentDatePicker()().localeData().monthsShort()

  const getWeakDayName = (minName: boolean = true) => {
    let dayNames = [...(minName ? date.localeData().weekdaysMin() : date.localeData().weekdays())]
    return dayNames
  }

  const getMonth = (month?: number) => {
    const cloneDate = momentDatePicker()(date.clone())
    if (month !== undefined) cloneDate.add(month, 'M')

    return {
      countDay: cloneDate.daysInMonth(),
      name: cloneDate.format('MMM'),
      fullName: cloneDate.format('MMMM'),
    }
  }

  return {
    getMonth,
    maxMonth: 12,
    maxWeak: 7,
    getYear,
    getMonthStartWith,
    date: date,
    value,
    getMonths,
    setValue: config.setValue,
    moment: momentDatePicker(),
    getWeakDayName,
  }
}

export default useDateTools
