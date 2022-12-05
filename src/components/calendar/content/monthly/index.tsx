import useDateTools from "../../../../hooks/useDateTools";
import Body from "../body";
import React from "react";
import Table from "../../../table";
import Cell from "./cell";
import usePersian from "../../../../hooks/usePersian";

const MonthCalendar = () => {
    const { getWeakDayName, getMonth, getMonthStartWith, moment, date, getYear } = useDateTools();
    const { convertNumbers } = usePersian();

    const countTr = Math.ceil(getMonth().countDay / 7);
    return (
        <Body
            header={
                <div className="__calender-month-header">
                    <div className="__calender-header-title">{getMonth()?.fullName}</div>
                    <div className="__calender-header-subtitle">{convertNumbers(getYear())}</div>
                </div>
            }>
            <Table>
                <thead>
                    <tr>
                        {getWeakDayName().map(item => (
                            <th>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {new Array(countTr).fill("w").map((i, index) => {
                        const rangeOfDays = {
                            start: index * 7 - getMonthStartWith(),
                            end: (index + 1) * 7,
                        };

                        return (
                            <tr>
                                {index === 0 && <FillStart />}
                                {new Array(7).fill("d").map((i, index) => {
                                    const day = index + 1 + rangeOfDays.start;
                                    if (day <= getMonth().countDay && day > 0)
                                        return <Cell date={date.format("YYYY-MM-") + day} />;
                                })}
                                {index === countTr - 1 && <FillEnd />}
                            </tr>
                        );
                    })}
                    <tr></tr>
                </tbody>
            </Table>
        </Body>
    );
};

const FillStart = () => {
    const { getMonthStartWith, getMonth, date } = useDateTools();

    const getPrevMonthCount = () => {
        const month = getMonth(-1);
        if (month) {
            return month.countDay;
        }

        return 0;
    };

    const getEndOfPrevMonth = (index: number) => {
        const day = getPrevMonthCount() - (getMonthStartWith() - (index + 1));
        const date_ = date.clone().add(-1);

        return date_.format("YYYY-MM-") + day;
    };

    return (
        <>
            {new Array(getMonthStartWith()).fill("d").map((i, index) => (
                <Cell date={getEndOfPrevMonth(index)} disabled={true} />
            ))}
        </>
    );
};

const FillEnd = () => {
    const { getMonthStartWith, getMonth, date } = useDateTools();

    const getMonthCountToEnd = () => {
        const countNow = getMonthStartWith() + getMonth().countDay;
        return Math.ceil(countNow / 7) * 7 - countNow;
    };

    const getEndOfPrevMonth = (index: number) => {
        const day = index + 1;
        const date_ = date.clone().add(1);

        return date_.format("YYYY-MM-") + day;
    };

    return (
        <>
            {new Array(getMonthCountToEnd()).fill("d").map((i, index) => (
                <Cell date={getEndOfPrevMonth(index)} disabled={true} />
            ))}
        </>
    );
};
export default MonthCalendar;
