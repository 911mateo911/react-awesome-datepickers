import React, { FC, useMemo, useCallback, useEffect, useState } from 'react';
import { RenderMonthProps } from './renderMonth.interface';
import { getYear, getMonth, isBefore } from 'date-fns';
import {
    getNOfDaysForMonth,
    getPadStart,
    getPadEnd,
    getPrevMonth,
    getNextMonth
} from "../../utils";
import styles from './renderMonth.module.css';
import { Day } from '../../core/Day';
import classNames from 'classnames';
import { isValid } from 'date-fns';

export const RenderMonth: FC<RenderMonthProps> = ({
    dayClassName,
    inRangeClassName,
    disabledClassName,
    selectedClassName,
    notThisMonthClassName,
    showNotThisMonthDays = true,
    wrapperClassName,
    selectedDate,
    currentDatePosition,
    onDateSelect = () => ({}),
    range = false,
    changeMonthIfDateOutside,
    onPositionChanged = () => ({}),
    inRangeHoverClassName,
    onDateRangeChange = () => ({}),
    startFrom,
    endFrom,
    lastInRangeClassName,
    firstInRangeClassName,
    setDateRange,
    dateRange
}) => {
    // if in range, the first date is selected
    const [selectsEndDate, setSelectsEndDate] = useState<boolean>(!!dateRange.startDate);
    // current date which is hovered on
    const [dateBeingHoveredOn, setDateBeingHoveredOn] = useState<Date | null | undefined>(null);

    useEffect(() => {
        // call callback on parent
        onDateRangeChange(dateRange);
    }, [dateRange, onDateRangeChange]);

    useEffect(() => {
        // reset hover if endDate is Present
        if (isValid(dateRange.endDate)) setDateBeingHoveredOn(null);
    }, [dateRange.endDate]);

    const getSelectedDate = useCallback(
        () => {
            if (range) {
                const { startDate, endDate } = dateRange;

                // return array to check
                return [startDate, endDate];
            }

            // return single value from props
            return selectedDate;
        },
        [dateRange, range, selectedDate],
    )

    const handleDateSelect = useCallback(
        (date: Date) => {
            if (range) {
                // modify end date if selectsEndDate is checked
                if (selectsEndDate && dateRange.startDate) {
                    if (isBefore(date, dateRange.startDate)) {
                        return setDateRange({
                            startDate: date,
                            endDate: dateRange.startDate
                        })
                    }
                    setDateRange({ ...dateRange, endDate: date });
                }
                else {
                    // set that it checks endDate as startDate is checked
                    setSelectsEndDate(true);
                    return setDateRange({ ...dateRange, startDate: date });
                }
            }

            // or just call single Callback
            onDateSelect(date);
        },
        [dateRange, onDateSelect, range, selectsEndDate, setDateRange],
    )

    const handleNotThisMonthClick = useCallback((date: Date) => {
        // check if dates not on the current month should be checked
        if (!changeMonthIfDateOutside) return;

        handleDateSelect(date);
        // call onPosition Changed from parent
        onPositionChanged(date);
    }, [changeMonthIfDateOutside, handleDateSelect, onPositionChanged]);

    const handleOnHover = (date: Date) => {
        // drop if first date is not selected, is not range or endDate not selected
        if (!selectsEndDate || !range || dateRange.endDate) return;

        setDateBeingHoveredOn(date);
    }

    const padStart = useMemo(() => Array(getPadStart(currentDatePosition))
        .fill('')
        .map((_date, index, { length }) => (
            <Day
                onClick={handleNotThisMonthClick}
                key={index}
                isNotThisMonth
                show={showNotThisMonthDays}
                firstDayInRange={dateRange.startDate}
                lastDayInRange={dateRange.endDate}
                dateInHover={dateBeingHoveredOn}
                inRangeClassName={inRangeClassName}
                dayClassName={dayClassName}
                notThisMonthClassName={notThisMonthClassName}
                disabledClassName={disabledClassName}
                dayNumber={getNOfDaysForMonth(getPrevMonth(currentDatePosition)) - (length - 1 - index)}
                date={new Date(
                    getYear(getPrevMonth(currentDatePosition)),
                    getMonth(getPrevMonth(currentDatePosition)),
                    getNOfDaysForMonth(getPrevMonth(currentDatePosition)) - (getPadStart(currentDatePosition) - (index + 1)))
                }
                endFrom={endFrom}
                startFrom={startFrom}
                selectedDate={selectedDate}
                firstInRangeClassName={firstInRangeClassName}
                lastInRangeClassName={lastInRangeClassName}
            />
        )), [currentDatePosition, dateBeingHoveredOn, dateRange.endDate, dateRange.startDate, dayClassName,
        handleNotThisMonthClick, inRangeClassName, notThisMonthClassName, firstInRangeClassName,
        selectedDate, showNotThisMonthDays, endFrom, startFrom, disabledClassName, lastInRangeClassName]);

    const padEnd = useMemo(() => Array(getPadEnd(currentDatePosition))
        .fill('')
        .map((_date, index) => (
            <Day
                onClick={handleNotThisMonthClick}
                key={index}
                isNotThisMonth
                show={showNotThisMonthDays}
                firstDayInRange={dateRange.startDate}
                lastDayInRange={dateRange.endDate}
                dateInHover={dateBeingHoveredOn}
                inRangeClassName={inRangeClassName}
                dayClassName={dayClassName}
                notThisMonthClassName={notThisMonthClassName}
                disabledClassName={disabledClassName}
                dayNumber={index + 1}
                date={new Date(
                    getYear(getNextMonth(currentDatePosition)),
                    getMonth(getNextMonth(currentDatePosition)),
                    index + 1)
                }
                endFrom={endFrom}
                startFrom={startFrom}
                selectedDate={selectedDate}
                lastInRangeClassName={lastInRangeClassName}
                firstInRangeClassName={firstInRangeClassName}
            />
        )), [currentDatePosition, dateBeingHoveredOn, dateRange.endDate, dateRange.startDate,
        dayClassName, handleNotThisMonthClick, inRangeClassName, notThisMonthClassName, firstInRangeClassName,
        selectedDate, showNotThisMonthDays, endFrom, startFrom, disabledClassName, lastInRangeClassName]);

    return (
        <div className={classNames(
            wrapperClassName,
            styles['months-wrapper']
        )} >
            {padStart}
            {Array(getNOfDaysForMonth(currentDatePosition)).fill('').map((_date, index) => (
                <Day
                    key={index}
                    selectedClassName={selectedClassName}
                    inRangeClassName={inRangeClassName}
                    dayClassName={dayClassName}
                    show={true}
                    onHover={handleOnHover}
                    dateInHover={dateBeingHoveredOn}
                    firstDayInRange={dateRange.startDate}
                    inRangeHoverClassName={inRangeHoverClassName}
                    lastDayInRange={dateRange.endDate}
                    disabledClassName={disabledClassName}
                    onClick={handleDateSelect}
                    dayNumber={index + 1}
                    date={new Date(getYear(currentDatePosition), getMonth(currentDatePosition), index + 1)}
                    endFrom={endFrom}
                    startFrom={startFrom}
                    selectedDate={getSelectedDate()}
                    lastInRangeClassName={lastInRangeClassName}
                    firstInRangeClassName={firstInRangeClassName}
                />
            ))}
            {padEnd}
        </div>
    )
}
