import moment from "moment";
import React, { createContext, useEffect, useState } from "react";
import { EnumLang, EnumTheme } from "./components/datepicker/enum";
var moment_jalali = require("jalali-moment");
moment_jalali.locale("fa");

export interface IConfigDatePicker {
    lang: "fa" | "en";
    theme: keyof typeof EnumTheme;
    pick?: "day" | "month" | "year";
    setPick?: (val: "day" | "month" | "year") => void;
    date: moment.Moment;
    setDate?: Function;
    setValue?: Function;
    value?: moment.Moment;
    dayEffects?: {
        title?: string;
        color?: string;
        dotColor?: string;
        day: string;
    }[];
    disabledDate?: (date: moment.Moment) => Boolean;
}

const DatepickerContext = createContext<IConfigDatePicker>({
    lang: "en",
    theme: EnumTheme.blue,
    pick: "day",
    date: moment(),
    value: moment(),
});

interface IProps {
    children: React.ReactNode;
    config: {
        lang: keyof typeof EnumLang;
        theme: keyof typeof EnumTheme;
        dayEffects?: {
            title?: string;
            color?: string;
            dotColor?: string;
            day: string;
        }[];
        disabledDate?: (date: moment.Moment) => Boolean;
    };
    input: any;
    format: string;
    onChange?: (val?: moment.Moment) => void;
    value?: moment.Moment;
    defaultValue?: moment.Moment;
}

const DatepickerProvider = ({
    children,
    config,
    input,
    format,
    onChange,
    value: value_,
    defaultValue,
}: IProps) => {
    const moment_ = config.lang === "fa" ? moment_jalali : moment;
    const [pick, setPick] = useState<"day" | "month" | "year">("day");
    const [date, setDate] = useState(moment_());
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        if (value) input.current.value = value.format(format);
        if (onChange && value !== undefined) onChange(value.clone().locale("en"));
        if (value) setDate(value);
    }, [value]);

    useEffect(() => {
        if (value_) setValue(value_);
    }, [value_]);

    return (
        <DatepickerContext.Provider
            value={{
                ...config,
                setPick,
                pick,
                date: date.clone(),
                setDate: (i: moment.Moment) => {
                    setDate(i);
                },
                value,
                setValue: (i: moment.Moment) => {
                    setValue(i);
                },
            }}>
            {children}
        </DatepickerContext.Provider>
    );
};

export { DatepickerProvider, DatepickerContext };
