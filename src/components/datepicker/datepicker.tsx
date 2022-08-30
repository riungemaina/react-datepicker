import React, { BaseSyntheticEvent, useRef, useState } from "react";
import DatepickerDropdown from "./datepicker-dropdown/datepickerDropdown";
import { DatepickerProvider } from "../../provider";
import { useOutsideClick } from "../../hooks/useOutSideClick";
import moment from "moment";
import "./style.scss";
import { EnumLang, EnumTheme } from "./enum";
export interface IPropsDatepicker {
    theme?: keyof typeof EnumTheme;
    lang?: keyof typeof EnumLang;
    input?: JSX.Element;
    format?: string;
    footer?: (
        moment?: any,
        setValue?: (val?: moment.Moment) => void
    ) => JSX.Element | JSX.Element[] | string;
    onChange?: (val?: moment.Moment) => void;
    value?: moment.Moment;
    defaultValue?: moment.Moment;
    modeTheme?: "dark" | "light";
    dayEffects?: {
        title?: string;
        color?: string;
        dotColor?: string;
        day: string;
    }[];
    disabledDate?: (date: moment.Moment) => Boolean;
    disabled?: boolean;
    loading?: boolean;
}

const Datepicker = ({
    theme = EnumTheme.blue,
    lang = EnumLang.fa,
    input = <input placeholder="datepicker" />,
    format = "YYYY/MM/DD",
    footer,
    onChange,
    value,
    defaultValue,
    modeTheme = "light",
    dayEffects,
    disabled,
    disabledDate,
    loading,
}: IPropsDatepicker) => {
    const [open, setOpen] = useState<boolean>(false);
    const ref = useRef(null);

    const refInput = useRef();

    const Input = React.cloneElement(input, {
        ref: refInput,
        onFocus: () => setOpen(true),
        disabled: disabled,
    });

    useOutsideClick(ref, () => {
        setOpen(false);
    });
    moment.locale(lang);

    return (
        <DatepickerProvider
            config={{
                lang: lang,
                theme: theme,
                disabledDate,
                dayEffects,
            }}
            format={format}
            onChange={onChange}
            value={value}
            defaultValue={defaultValue}
            input={refInput}>
            <div
                className={`__datepicker __datepicker-theme-${theme} __datepicker-theme-mode-${modeTheme}`}
                ref={ref}>
                <div className={"__datepicker-input"}>{Input}</div>
                {open && <DatepickerDropdown open={open} footer={footer} />}
            </div>
        </DatepickerProvider>
    );
};

export default Datepicker;
