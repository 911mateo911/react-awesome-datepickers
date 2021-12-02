# React-awesome-datepickers

A simple, lightweight datepicker library for your awesome react app.

## Usage:

```
npm install react-awesome-datepickers
```

- ### Basic
 ```
import { useState } from 'react';
import { MaterialPicker } from 'react-awesome-datepickers';

const Picker = () => {
    const [date, setDate] = useState<Date>(initialSelectedDate => can be undefined, null, or an actual date);
    
    return <MaterialPicker onDateSelect={setDate} />
}
```

- ### RangePicker
```
import { useState } from 'react';
import { MaterialPicker, RangeDates } from 'react-awesome-datepickers';

// RangeDates => {
    startDate: null | Date | undefined
    endDate: null | Date | undefined 
}

const Picker = () => {
    const [range, setRange] = useState<RangeDates>({});
    
    return <MaterialPicker range onDateRangeChange={setRange} dateRange={range} />
}
```

## API
`nextButton?: ReactElement => element to provide instead of the default provided svg`

----
`prevButton?: ReactElement => element to provide instead of the default provided svg`

----
`range?: boolean => picker is of type range`

----
`hideNavigationButtons?: boolean`

----
`nextButtonWrapperClassName?: string => buttons are wrapped on a div wrapper with a onClick callback`

----
`prevButtonWrapperClassName?: string => buttons are wrapped on a div wrapper with a onClick callback`

----
`initialSelectedDate?: Date | null => initial selected date`

----
`initialMonthPosition?: Date => initial month position on the datepicker`

----
`dateRange?: RangeDates => if picker type range => pass this from state to keep the picker updated`

----
`dayClassName?: string => base day className`

----
`selectedClassName?: string => className to provide on the selected date, with the base class`

----
`disabledClassName?: string => className to provide on the disabled date, with the base class`

----
`notThisMonthClassName?: string => className to provide on the dates present on the month, but of the prev/next month, with the base class`

----
`inRangeClassName?: string => className to provide on the dates in between the startDate and endDate when picker typeof `range`, with the base class`

----
`inRangeHoverClassName?: string => className to provide on the dates in between the startDate and endDate when picker typeof `range`, when the endDate is not selected with the base class`

----
`lastInRangeClassName?: string => className to provide on the selected endDate, on input type range date, with the base class`

----
`firstInRangeClassName?: string => className to provide on the selected startDate, on input type range date, with the base class`

----
`wrapperClassName?: string => className to provide on the wrapper element, with the base class`

----
`startFrom?: Date => if passed the dates before this date will be disabled`

----
`endFrom?: Date => if passed the dates after this date will be disabled`

----
`showNotThisMonthDays?: boolean => show dates which are not of this month`

----
`selectedDate: Date | null | undefined`

----
`range?: boolean`

----
`onDateSelect?: (date: Date) => void => callback to update the state of the parent component`

----
`changeMonthIfDateOutside?: boolean => if you click on the dates from the next month, present in the current month shown, should it move to the next date`

----
`onPositionChanged?: (position: Date) => void => used if you want to keep track of the current position shown on the screen`

----
`onDateRangeChange?: (range: RangeDates) => void => called when picker typeof range and endDate or startDate is selected`

----
`dateRange: RangeDates => passed from parent to update the internal state when picker typeof range`

## TODO
- add pickers from other design systems
- performance improvements
