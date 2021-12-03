import React, { FC, useState, useEffect, useRef } from 'react';
import { MaterialPickerProps } from './materialPicker.interface';
import { RenderMonth, RangeDates } from '../../core';
import styles from './materialPicker.module.css';
import { format } from 'date-fns';
import { enGB } from 'date-fns/locale';
import { formatToComparableDate, getNextMonth, getPrevMonth, getWeekDays } from '../../utils';
import classNames from 'classnames';
import { ReactComponent as LeftIcon } from './icons/leftIcon.svg';
import { ReactComponent as RightIcon } from './icons/rightIcon.svg';
import { getThemeableClassNames } from '../../core';

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
    dateRange,
    darkMode = false
}) => {
    const [currentDateRange, setCurrentDateRange] = useState<RangeDates>({
        startDate: dateRange?.startDate,
        endDate: dateRange?.endDate
    });
    const handleCurrentDateRangeChange = (range: RangeDates) => {
        setCurrentDateRange(range);

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
    }, [currentDatePosition, onPositionChanged]);

    useEffect(() => {
        // keep local state updated with parent state
        setCurrentDateRange({ startDate: dateRange?.startDate, endDate: dateRange?.endDate });
    }, [dateRange]);

    const handleDateSelection = (date: Date) => {
        if (formatToComparableDate(date) === formatToComparableDate(selectedDate.current || new Date())) return;

        setSelectedDate(date);
    }

    const getRangePickerFormattedDate = () => {
        if (!range) return;

        let dateString = ' - ';

        const { startDate, endDate } = currentDateRange;

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
                    selectedClassName={getThemeableClassNames(darkMode, styles['selected-day'], '', selectedClassName)}
                    changeMonthIfDateOutside={changeMonthIfDateOutside}
                    onPositionChanged={setCurrentDatePosition}
                    onDateSelect={handleDateSelection}
                    disabledClassName={getThemeableClassNames(darkMode, styles['material-disabled'], '', disabledClassName)}
                    currentDatePosition={currentDatePosition}
                    selectedDate={selectedDate.current}
                    range={range}
                    startFrom={startFrom}
                    endFrom={endFrom}
                    showNotThisMonthDays={showNotThisMonthDays}
                    inRangeHoverClassName={getThemeableClassNames(darkMode, styles['material-inRange_hover'], '', inRangeHoverClassName)}
                    onDateRangeChange={handleCurrentDateRangeChange}
                    inRangeClassName={getThemeableClassNames(darkMode, styles['material-inRange'], '', inRangeClassName)}
                    dayClassName={getThemeableClassNames(darkMode, styles['material-day'], '', dayClassName)}
                    lastInRangeClassName={getThemeableClassNames(darkMode, styles['material-last-range-day'], '', lastInRangeClassName)}
                    firstInRangeClassName={getThemeableClassNames(darkMode, styles['material-first-range-day'], '', firstInRangeClassName)}
                    wrapperClassName={wrapperClassName}
                    notThisMonthClassName={getThemeableClassNames(darkMode, styles['notThisMonth-day'], '', notThisMonthClassName)}
                    dateRange={currentDateRange}
                />
            </div>
        </div>
    )
}
