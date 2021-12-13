import { ReactElement } from "react";
import { RenderMonthProps } from "../../core";
import { RangeDates } from '../../core'

type ToExclude = 'selectedDate' | 'currentDatePosition' | 'setDateRange' | 'dateRange'

export interface MaterialPickerProps extends Omit<RenderMonthProps, ToExclude> {
    nextButton?: ReactElement
    prevButton?: ReactElement
    hideNavigationButtons?: boolean
    nextButtonWrapperClassName?: string
    prevButtonWrapperClassName?: string
    initialSelectedDate?: Date | null
    initialMonthPosition?: Date
    dateRange?: RangeDates
    darkMode?: boolean
    locale?: Locale
    weekDaysFormat?: string
    weekDaysLength?: number
    selectedDateFormat?: string
    datePositionFormat?: string
    withYearDropDown?: boolean
    dropdownWrapperClassName?: string
    dropdownYearClassName?: string
}

export interface MaterialYearDropdownProps {
    onYearClick: (date: Date) => void;
    open: boolean;
    onClose: () => void;
    selectedDate: Date | null | undefined
    wrapperClassName?: string
    yearClassName?: string
    darkMode?: boolean
}
