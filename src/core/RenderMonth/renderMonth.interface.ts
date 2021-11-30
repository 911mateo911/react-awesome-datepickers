import { MonthNDay } from "../../core/interfaces";

export interface RangeDates {
    startDate?: Date | null
    endDate?: Date | null
}

export interface RenderMonthProps extends MonthNDay {
    showNotThisMonthDays?: boolean
    wrapperClassName?: string
    selectedDate: Date | null | undefined
    range?: boolean
    currentDatePosition: Date
    onDateSelect?: (date: Date) => void
    changeMonthIfDateOutside?: boolean
    onPositionChanged?: (position: Date) => void
    onDateRangeChange?: (range: RangeDates) => void
    dateRange: RangeDates,
    setDateRange: (range: RangeDates) => void
}
