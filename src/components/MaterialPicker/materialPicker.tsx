import React, { FC, useState, useEffect, useRef } from 'react';
import { MaterialPickerProps } from './materialPicker.interface';
import { RangeDates, RenderMonth } from '../../core';
import styles from './materialPicker.module.css';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { formatToComparableDate, getNextMonth, getPrevMonth, getWeekDays } from '../../utils';
import classNames from 'classnames';
import { ReactComponent as LeftIcon } from './icons/leftIcon.svg';
import { ReactComponent as RightIcon } from './icons/rightIcon.svg';

export const MaterialPicker: FC<MaterialPickerProps> = ({
    dayClassName,
    wrapperClassName,
    selectedClassName,
    disabledClassName,
    notThisMonthClassName,
    inRangeClassName,
    nextButton,
    prevButton,
    range,
    hideNavigationButtons,
    nextButtonWrapperClassName,
    prevButtonWrapperClassName,
    startDate,
    endDate,
    startFrom,
    endFrom,
    showNotThisMonthDays,
    inRangeHoverClassName,
    onDateSelect = () => ({}),
    onDateRangeChange = () => ({}),
    onPositionChanged = () => ({}),
    changeMonthIfDateOutside = true,
    initialSelectedDate,
    initialMonthPosition,
    lastInRangeClassName,
    firstInRangeClassName,
}) => {
    const rangeDate = useRef<RangeDates>({
        startDate: startDate,
        endDate: endDate
    })
    const setRange = (range: RangeDates) => {
        rangeDate.current = range;

        onDateRangeChange(range);
    }

    const selectedDate = useRef<Date | null | undefined>(initialSelectedDate);
    const setSelectedDate = (date: Date) => {
        selectedDate.current = date;

        onDateSelect(date);
    };

    const [currentDatePosition, setCurrentDatePosition] = useState<Date>(initialMonthPosition || new Date());

    useEffect(() => {
        // update onPositionChanged from parent
        onPositionChanged(currentDatePosition);
    }, [currentDatePosition, onPositionChanged])

    const handleDateSelection = (date: Date) => {
        if (formatToComparableDate(date) === formatToComparableDate(selectedDate.current || new Date())) return;

        setSelectedDate(date);
    }

    const getRangePickerFormattedDate = () => {
        if (!range) return;

        let dateString = ' - ';

        const { startDate, endDate } = rangeDate.current;

        if (startDate) dateString = format(startDate, 'eee, MMM dd') + dateString;
        if (endDate) dateString = dateString + format(endDate, 'eee, MMM dd');

        return dateString;
    }

    return (
        <div className={styles['material-picker-container']} >
            <p className={styles['material-year']} >{selectedDate.current ? selectedDate.current.getFullYear() : new Date().getFullYear()}</p>
            <p
                className={classNames(
                    styles['material-date'],
                    {
                        [styles['material-date_range']]: range
                    }
                )}
            >
                {range ? (getRangePickerFormattedDate()
                ) : (
                    format(selectedDate.current || new Date(), 'eee, MMM dd'))}
            </p>
            <div className={styles['material-month-container-wrapper']} >
                <div className={classNames(
                    styles['material-flex'],
                    styles['material-action-wrapper']
                )} >
                    {(!hideNavigationButtons) && (prevButton ? (
                        <div
                            className={prevButtonWrapperClassName}
                            onClick={() => setCurrentDatePosition(getPrevMonth(currentDatePosition))}
                        >
                            {prevButton}
                        </div>
                    ) : (
                        <LeftIcon
                            onClick={() => setCurrentDatePosition(getPrevMonth(currentDatePosition))}
                            className={styles['material-icon']}
                        />))}
                    <p className={styles['material-action-year']} >{format(currentDatePosition, 'MMM, yyyy')}</p>
                    {(!hideNavigationButtons) && (nextButton ? (
                        <div
                            className={nextButtonWrapperClassName}
                            onClick={() => setCurrentDatePosition(getNextMonth(currentDatePosition))}
                        >
                            {nextButton}
                        </div>
                    ) : (
                        <RightIcon
                            onClick={() => setCurrentDatePosition(getNextMonth(currentDatePosition))}
                            className={styles['material-icon']}
                        />
                    ))}
                </div>
                <div className={styles['material-flex']} >
                    {getWeekDays(enGB, 2).map(weekDay =>
                        <p
                            className={classNames(
                                styles['material-weekDay'],
                                styles['material-flex']
                            )}
                            key={weekDay}
                        >
                            {weekDay}
                        </p>)}
                </div>
                <RenderMonth
                    selectedClassName={classNames(selectedClassName, styles['selected-day'])}
                    changeMonthIfDateOutside={changeMonthIfDateOutside}
                    onPositionChanged={setCurrentDatePosition}
                    onDateSelect={handleDateSelection}
                    disabledClassName={classNames(styles['material-disabled'], disabledClassName)}
                    currentDatePosition={currentDatePosition}
                    selectedDate={selectedDate.current}
                    range={range}
                    startFrom={startFrom}
                    endFrom={endFrom}
                    showNotThisMonthDays={showNotThisMonthDays}
                    inRangeHoverClassName={classNames(styles['material-inRange_hover'], inRangeHoverClassName)}
                    onDateRangeChange={setRange}
                    inRangeClassName={classNames(styles['material-inRange'], inRangeClassName)}
                    dayClassName={classNames(dayClassName, styles['material-day'])}
                    lastInRangeClassName={classNames(lastInRangeClassName, styles['material-last-range-day'])}
                    firstInRangeClassName={classNames(firstInRangeClassName, styles['material-first-range-day'])}
                    wrapperClassName={wrapperClassName}
                    notThisMonthClassName={classNames(notThisMonthClassName, styles['notThisMonth-day'])}
                    dateRange={rangeDate.current}
                    setDateRange={setRange}
                />
            </div>
        </div>
    )
}
