import React, { FC, memo } from 'react';
import { DayProps } from './day.interface';
import styles from './day.module.css';
import { getYear, getMonth } from 'date-fns';
import classNames from 'classnames';
import {
    checkIfDisabled,
    checkIfInBetweenDates,
    checkIfDatesMatch,
    checkIfDatesMatchRangeOrSelected
} from '../../utils';

export const Day: FC<DayProps> = memo(({
    dateInHover,
    firstDayInRange,
    isNotThisMonth,
    dayClassName,
    disabledClassName = '',
    selectedClassName = '',
    notThisMonthClassName = '',
    inRangeClassName = '',
    inRangeHoverClassName = '',
    onClick,
    endFrom,
    startFrom,
    dayNumber,
    date,
    show,
    selectedDate,
    onHover = () => ({}),
    lastDayInRange,
    lastInRangeClassName = '',
    firstInRangeClassName = ''
}) => {
    const handleClick = () => {
        const currentMonth = getMonth(date);

        const currentYear = getYear(date);

        onClick(new Date(currentYear, currentMonth, dayNumber));
    }

    return (
        <div
            className={classNames(
                dayClassName,
                styles['day-wrapper'],
                {
                    [inRangeHoverClassName]: (firstDayInRange && dateInHover && !checkIfDatesMatchRangeOrSelected(date, selectedDate)) && (checkIfInBetweenDates(date, firstDayInRange, dateInHover)),
                    [disabledClassName]: checkIfDisabled(startFrom, endFrom, date),
                    [selectedClassName]: checkIfDatesMatchRangeOrSelected(date, selectedDate) && !checkIfDatesMatch(date, firstDayInRange),
                    [notThisMonthClassName]: isNotThisMonth,
                    [styles['day-hidden']]: !show,
                    [inRangeClassName]: (firstDayInRange && lastDayInRange && !checkIfDatesMatchRangeOrSelected(date, selectedDate)) && checkIfInBetweenDates(date, firstDayInRange, lastDayInRange),
                    [lastInRangeClassName]: checkIfDatesMatch(date, lastDayInRange),
                    [firstInRangeClassName]: checkIfDatesMatch(date, firstDayInRange)
                }
            )}
            onClick={handleClick}
            onMouseEnter={() => onHover(date)}
            current-date={date}
            aria-label={`Select Date: ${date}`}
            first-selected={(firstDayInRange && lastDayInRange && checkIfDatesMatch(date, firstDayInRange)) ? 'true' : 'false'}
            last-selected={(firstDayInRange && lastDayInRange && checkIfDatesMatch(date, lastDayInRange)) ? 'true' : 'false'}
        >
            <span>{dayNumber}</span>
        </div>
    )
})
