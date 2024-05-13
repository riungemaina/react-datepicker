import React, { useContext } from 'react'
import useDateTools from '../../../../hooks/useDateTools'
import { DatepickerContext } from '../../../../provider'

interface IProps {
  day: string
  date: moment.Moment
  onClick?: () => void
  disabled?: boolean
}

const Day = ({ day, date, disabled, onClick }: IProps) => {
  const config = useContext(DatepickerContext)
  const { moment } = useDateTools()

  const findEffect = () => {
    return config.dayEffects?.find(item => moment(item.day).format('YYYY-MM-D') === moment(day).format('YYYY-MM-D'))
  }

  const classes = () => {
    let class_ = '__datepicker-days'
    if (day === moment().format('YYYY-MM-D')) {
      class_ += ' __datepicker-today'
    }
    if (day === config.value?.format('YYYY-MM-D')) {
      class_ += ' __datepicker-selected'
    }
    if ((config?.disabledDate && config?.disabledDate(moment(day))) || disabled) {
      class_ += ' __datepicker-day-disabled'
    }

    return class_
  }

  const YYYY = day.split('-')[0]
  const MM = day.split('-')[1].length == 1 ? '0' + day.split('-')[1] : day.split('-')[1]
  const DD = day.split('-')[2].length == 1 ? '0' + day.split('-')[2] : day.split('-')[2]
  const properDateString = `${YYYY + '-' + MM + '-' + DD}`

  return (
    <div
      className={classes()}
      style={{
        color: findEffect() ? findEffect()?.color : '',
      }}
      onClick={() => {
        if (config.setValue) {
          if (onClick) onClick()
          if ((config?.disabledDate && config?.disabledDate(moment(day))) || disabled) {
            return false
          }
          config.setValue(moment(day))
        }
      }}
      title={findEffect()?.title}
    >
      {moment(properDateString).format('D')}
      {findEffect() && <span className="__datepicker-day-effect" style={{ background: findEffect()?.dotColor }} />}
    </div>
  )
}

export default Day
