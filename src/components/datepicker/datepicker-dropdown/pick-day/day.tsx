import React, { useContext } from "react";
import useDateTools from "../../../../hooks/useDateTools";
import usePersian from "../../../../hooks/usePersian";
import { DatepickerContext } from "../../../../provider";

interface IProps {
    day: string;
    date: moment.Moment;
    onClick?: () => void;
    disabled?: boolean;
}

const Day = ({ day, date, disabled, onClick }: IProps) => {
    const config = useContext(DatepickerContext);
    const { moment } = useDateTools();
    const { convertNumbers } = usePersian();

    const findEffect = () => {
        return config.dayEffects?.find(
            item => moment(item.day).format("YYYY-MM-D") === moment(day).format("YYYY-MM-D")
        );
    };

    const classes = () => {
        let class_ = "__datepicker-days";
        if (day === moment().format("YYYY-MM-D")) {
            class_ += " __datepicker-today";
        }
        if (day === config.value?.format("YYYY-MM-D")) {
            class_ += " __datepicker-selected";
        }
        if ((config?.disabledDate && config?.disabledDate(moment(day))) || disabled) {
            class_ += " __datepicker-day-disabled";
        }

        return class_;
    };

    return (
        <div
            className={classes()}
            style={{
                color: findEffect() ? findEffect()?.color : "",
            }}
            onClick={() => {
                if (config.setValue) {
                    if (onClick) onClick();
                    if ((config?.disabledDate && config?.disabledDate(moment(day))) || disabled) {
                        return false;
                    }
                    config.setValue(moment(day));
                }
            }}
            title={findEffect()?.title}
        >
            {convertNumbers(moment(day).format("D"))}
            {findEffect() && (
                <span
                    className="__datepicker-day-effect"
                    style={{ background: findEffect()?.dotColor }}
                />
            )}
        </div>
    );
};

export default Day;
