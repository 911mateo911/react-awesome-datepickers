import {
    sub,
    add,
    getDaysInMonth,
    startOfMonth,
    endOfMonth,
    getDay,
    format,
    eachDayOfInterval,
    startOfWeek,
    endOfWeek,
    Locale,
    isWithinInterval,
    isBefore,
    isAfter
} from 'date-fns';

export const getPrevMonth = (date: Date) => sub(date, { months: 1 });

export const getNextMonth = (date: Date) => add(date, { months: 1 });

export const getNOfDaysForMonth = (date: Date) => getDaysInMonth(date);

export const getSafePadding = (num: number) => (num <= 0 || num > 6) ? 0 : num;

export const getPadStart = (date: Date) => {
    // -1 as european date starts at monday
    const padding = getDay(startOfMonth(date)) - 1;

    // bug => -1 equals sunday
    if (padding === -1) return 6;
    return getSafePadding(padding);
};

export const getPadEnd = (date: Date) => getSafePadding(7 - getDay(endOfMonth(date)));

export const formatToComparableDate = (date: Date) => format(date, 'dd/MM/yyyy');

export const getWeekDays = (locale: Locale, slice: number) =>
    eachDayOfInterval({
        start: startOfWeek(new Date(), { weekStartsOn: 1 }),
        end: endOfWeek(new Date(), { weekStartsOn: 1 })
    }).map(date => format(date, 'EEEEEE', { locale }).slice(0, slice));

export const checkIfDatesMatch = (date: Date, dateToMatch: Date | null | undefined) => dateToMatch && (
    formatToComparableDate(date) === formatToComparableDate(dateToMatch));

export const checkIfInBetweenDates = (currentDate: Date, start: Date, end: Date) => {
    if (isBefore(end, start)) return isWithinInterval(currentDate, { start: end, end: start });

    return isWithinInterval(currentDate, { start, end });
}

export const checkIfDisabled = (
    startDate: Date | null | undefined,
    endDate: Date | null | undefined,
    dateToCheck: Date) => {
    const isDisabled = {
        start: false,
        end: false
    };

    if (startDate) isDisabled.start = isBefore(dateToCheck, startDate);
    if (endDate) isDisabled.end = isAfter(dateToCheck, endDate);

    return Object.values(isDisabled).some(Boolean);
}

export const checkIfDatesMatchRangeOrSelected = (
    date: Date,
    selectedDate: Date | (Date | null | undefined)[] | null | undefined
) => {
    // if we dont have anything at all
    if (!selectedDate) return false;

    // if not an array (not of type range) return condition
    if (!Array.isArray(selectedDate)) return checkIfDatesMatch(date, selectedDate);

    // below type range => destructure 
    const [startDate, endDate] = selectedDate;

    // return same condition
    return checkIfDatesMatch(date, startDate) || checkIfDatesMatch(date, endDate);
}
