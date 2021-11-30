import { ReactElement } from "react";
import { RenderMonthProps } from "../../core";

type ToExclude = 'selectedDate' | 'currentDatePosition' | 'dateRange' | 'setDateRange'

export interface MaterialPickerProps extends Omit<RenderMonthProps, ToExclude> {
    nextButton?: ReactElement
    prevButton?: ReactElement
    hideNavigationButtons?: boolean
    nextButtonWrapperClassName?: string
    prevButtonWrapperClassName?: string
    initialSelectedDate?: Date | null
    initialMonthPosition?: Date
    startDate?: Date
    endDate?: Date
}
