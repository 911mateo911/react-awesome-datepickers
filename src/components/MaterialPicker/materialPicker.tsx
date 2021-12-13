import React, { FC, useState, useEffect, useRef } from 'react';
import { MaterialPickerProps } from './materialPicker.interface';
import { RenderMonth, RangeDates } from '../../core';
import styles from './materialPicker.module.css';
import { format } from 'date-fns';
import { formatToComparableDate, getNextMonth, getPrevMonth, getWeekDays } from '../../utils';
import classNames from 'classnames';
import { ReactComponent as LeftIcon } from './icons/leftIcon.svg';
import { ReactComponent as RightIcon } from './icons/rightIcon.svg';
import { getThemeableClassNames } from '../../core';
import { LOCALE } from '../../core/locale';
import { MaterialYearDropdown } from './materialPicker.dropdown';
import { ReactComponent as DropDownIcon } from './icons/dropdown.svg';

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
    darkMode = false,
    locale = LOCALE.enGB,
    weekDaysFormat,
    weekDaysLength,
    selectedDateFormat,
    datePositionFormat,
    withYearDropDown = true,
    dropdownWrapperClassName,
    dropdownYearClassName
}) => {
    const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const handleDropDownOpen = () => {
        if (!withYearDropDown) return;

        setDropdownOpen(true);
    }

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

        if (startDate) dateString = format(startDate, (selectedDateFormat ?? 'eee, MMM dd'), { locale }) + dateString;
        if (endDate) dateString = dateString + format(endDate, (selectedDateFormat ?? 'eee, MMM dd'), { locale });

        return dateString;
    }

    return (
        <div className={classNames(
            styles['material-picker-container'],
            {
                [styles['material-picker-container_light']]: !darkMode,
                [styles['material-picker-dark-container_dark']]: darkMode
            }
        )} >
            <div onClick={handleDropDownOpen} className={styles['material-year']}>
                {selectedDate.current ? selectedDate.current.getFullYear() : new Date().getFullYear()}
                <DropDownIcon className={styles['material-dropdown']} />
                {withYearDropDown && <MaterialYearDropdown
                    onClose={() => setDropdownOpen(false)}
                    onYearClick={date => {
                        setCurrentDatePosition(date);
                        setSelectedDate(date)
                    }}
                    open={isDropdownOpen}
                    selectedDate={selectedDate.current}
                    yearClassName={dropdownYearClassName}
                    wrapperClassName={dropdownWrapperClassName}
                    darkMode={darkMode}
                />}
            </div>
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
                    format(selectedDate.current || new Date(), (selectedDateFormat ?? 'eee, MMM dd'), { locale }))}
            </p>
            <div className={classNames(
                styles['material-month-container-wrapper'],
                {
                    [styles['material-month-container-wrapper_dark']]: darkMode,
                    [styles['material-month-container-wrapper_light']]: !darkMode
                }
            )} >
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
                            className={classNames(
                                styles['material-icon'],
                                {
                                    [styles['material-icon_dark']]: darkMode,
                                    [styles['material-icon_light']]: !darkMode
                                }
                            )}
                        />))}
                    <p className={classNames(
                        styles['material-action-year'],
                        {
                            [styles['material-action-year_dark']]: darkMode,
                            [styles['material-action-year_light']]: !darkMode
                        }
                    )} >{format(currentDatePosition, (datePositionFormat ?? 'MMM, yyyy'), { locale })}</p>
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
                            className={classNames(
                                styles['material-icon'],
                                {
                                    [styles['material-icon_dark']]: darkMode,
                                    [styles['material-icon_light']]: !darkMode
                                }
                            )}
                        />
                    ))}
                </div>
                <div className={styles['material-flex']} >
                    {getWeekDays(locale, (weekDaysLength ?? 2), weekDaysFormat).map(weekDay =>
                        <p
                            className={classNames(
                                styles['material-weekDay'],
                                styles['material-flex'],
                                {
                                    [styles['material-weekDay_dark']]: darkMode,
                                    [styles['material-weekDay_light']]: !darkMode
                                }
                            )}
                            key={weekDay}
                        >
                            {weekDay}
                        </p>)}
                </div>
                <RenderMonth
                    selectedClassName={getThemeableClassNames(
                        darkMode,
                        styles['selected-day_light'],
                        styles['selected-day_dark'],
                        selectedClassName)}
                    changeMonthIfDateOutside={changeMonthIfDateOutside}
                    onPositionChanged={setCurrentDatePosition}
                    onDateSelect={handleDateSelection}
                    disabledClassName={classNames(styles['material-disabled'], getThemeableClassNames(
                        darkMode,
                        styles['material-disabled_light'],
                        styles['material-disabled_dark'],
                        disabledClassName))}
                    currentDatePosition={currentDatePosition}
                    selectedDate={selectedDate.current}
                    range={range}
                    startFrom={startFrom}
                    endFrom={endFrom}
                    showNotThisMonthDays={showNotThisMonthDays}
                    inRangeHoverClassName={getThemeableClassNames(
                        darkMode,
                        styles['material-inRange_hover__light'],
                        styles['material-inRange_hover__dark'],
                        inRangeHoverClassName)}
                    onDateRangeChange={handleCurrentDateRangeChange}
                    inRangeClassName={getThemeableClassNames(
                        darkMode,
                        styles['material-inRange_light'],
                        styles['material-inRange_dark'],
                        inRangeClassName)}
                    dayClassName={classNames(styles['material-day'], getThemeableClassNames(
                        darkMode,
                        styles['material-day_light'],
                        styles['material-day_dark'],
                        dayClassName))}
                    lastInRangeClassName={classNames(styles['material-last-range-day'], getThemeableClassNames(
                        darkMode,
                        styles['material-last-range-day_light'],
                        styles['material-last-range-day_dark'],
                        lastInRangeClassName))}
                    firstInRangeClassName={classNames(styles['material-first-range-day'], getThemeableClassNames(
                        darkMode,
                        styles['material-first-range-day_light'],
                        styles['material-first-range-day_dark'],
                        firstInRangeClassName))}
                    wrapperClassName={wrapperClassName}
                    notThisMonthClassName={getThemeableClassNames(
                        darkMode,
                        styles['notThisMonth-day_light'],
                        styles['notThisMonth-day_dark'],
                        notThisMonthClassName)}
                    dateRange={currentDateRange}
                />
            </div>
        </div>
    )
}
