import { MonthNDay } from '../interfaces';

export interface DayProps extends MonthNDay {
    isNotThisMonth?: boolean
    onClick: (date: Date) => void
    dateInHover?: Date | null
    dayNumber: number
    firstDayInRange?: Date | null
    lastDayInRange?: Date | null
    show?: boolean
    date: Date
    selectedDate?: Date | (Date | null | undefined)[] | null;
    onHover?: (date: Date) => void
}
