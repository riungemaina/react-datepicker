import moment from 'moment'
import { useContext } from 'react'
import { DatepickerContext } from '../provider'
var moment_jalali = require('jalali-moment')

const useDateTools = () => {
  const config = useContext(DatepickerContext)
  const date = config.date.clone()
  const value = config.value

  const getYear = (date_?: string) => {
    return date.format('YYYY')
  }

  const getMonthStartWith = () => {
    return date.startOf('month').weekday()
  }

  const momentDatePicker = () => {
    if (config.lang === 'en') return moment
    return moment_jalali
  }
  const getMonths = () => {
    return momentDatePicker()().localeData().monthsShort()
  }

  const getWeakDayName = (minName: boolean = true) => {
    let dayNames = [...(minName ? date.localeData().weekdaysMin() : date.localeData().weekdays())]

    return dayNames
  }

  const getMonth = (month?: number) => {
    const cloneDate = momentDatePicker()(date.clone())
    if (month !== undefined) {
      cloneDate.add(month, 'M')
    }

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
