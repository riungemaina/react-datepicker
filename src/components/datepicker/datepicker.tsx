import moment, { Moment } from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '../../hooks/useOutSideClick'
import { DatepickerProvider } from '../../provider'
import DatepickerDropdown from './datepicker-dropdown/datepickerDropdown'
import { EDropdownPositions } from './datepicker-dropdown/useDropdownRoles'
import { EnumTheme } from './enum'
import './style.scss'

export interface IPropsDatepicker {
  theme?: keyof typeof EnumTheme
  adjustPosition?: typeof EDropdownPositions | 'modal' | 'auto'
  input?: JSX.Element
  format?: string
  footer?: (moment?: any, setValue?: (val?: moment.Moment) => void) => JSX.Element | JSX.Element[] | string
  onChange?: (val?: moment.Moment) => void
  value?: moment.Moment | string
  defaultValue?: moment.Moment
  modeTheme?: 'dark' | 'light'
  dayEffects?: {
    title?: string
    color?: string
    dotColor?: string
    day: string
  }[]
  disabledDate?: (date: moment.Moment) => Boolean
  disabled?: boolean
  loading?: boolean
  closeWhenSelectADay?: boolean
  onOpen?: Function
  spinnerComponent?: JSX.Element | JSX.Element[]
  name?: string
}

const Datepicker = ({
  theme = EnumTheme.blue,
  input = <input placeholder="datepicker" />,
  format = 'YYYY/MM/DD',
  footer,
  onChange,
  value: value_,
  defaultValue,
  modeTheme = 'light',
  dayEffects,
  disabled,
  disabledDate,
  loading,
  closeWhenSelectADay = true,
  onOpen,
  spinnerComponent,
  adjustPosition = 'auto',
  name,
}: IPropsDatepicker) => {
  const moment_ = moment
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<Moment>()
  const ref = useRef<any>(null)
  const [cloneInputRef, setCloneRef] = useState<any>()
  const refInput = useRef<any>(null)

  useOutsideClick(ref, () => {
    setOpen(false)
  })

  useEffect(() => {
    let v = moment_(value_)
    if (value_ && value_ !== value) setValue(v.locale('en'))
  }, [value_])

  useEffect(() => {
    if (open && onOpen) onOpen()
  }, [open])

  useEffect(() => {
    setCloneRef(ref.current !== null ? ref.current.querySelector('input') : undefined)
  }, [ref])

  return (
    <DatepickerProvider
      config={{
        theme: theme,
        disabledDate,
        dayEffects,
      }}
      format={format}
      setOpen={setOpen}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      closeWhenSelectADay={closeWhenSelectADay}
      input={refInput}
    >
      <div className={`__datepicker __datepicker-theme-${theme} __datepicker-theme-mode-${modeTheme} `} ref={ref}>
        <div className={'__datepicker-input'}>
          {cloneInputRef === undefined && <div style={{ display: 'none' }}>{input}</div>}
          <input
            ref={refInput}
            className={cloneInputRef?.getAttribute('class')}
            placeholder={cloneInputRef?.getAttribute('placeholder')}
            onFocus={() => setOpen(true)}
            autoComplete={'disabled'}
            disabled={disabled}
            onChange={(e: any) => {
              let date
              if (typeof e === 'string') date = moment_(e)
              else if (e.target !== undefined) date = moment_(e.target.value)
              if (date && date.isValid()) setValue(date)
            }}
            name={name ? name : cloneInputRef?.getAttribute('name')}
          />
          {/* TODO :: add delete icon if user select a date and if not show date icon */}
        </div>
        {open && (
          <DatepickerDropdown
            open={open}
            footer={footer}
            loading={loading}
            spinnerComponent={spinnerComponent}
            adjustPosition={adjustPosition}
            refMain={ref}
            setOpen={setOpen}
          />
        )}
      </div>
    </DatepickerProvider>
  )
}

export default Datepicker
