import React from 'react';
import { Meta, Story } from '@storybook/react';
import { RangeDates } from '../../core';
import { sub } from 'date-fns';
import { useState } from 'react';
import { MaterialPicker } from './materialPicker';
import { MaterialPickerProps } from './materialPicker.interface';

export default {
    title: 'MaterialPicker',
    component: MaterialPicker,
} as Meta;

export const Default: Story<MaterialPickerProps> = args => {
    const [, setSelectedDate] = useState(args.initialSelectedDate);
    const [, setSelectedRange] = useState<RangeDates>();

    return <MaterialPicker {...args} onDateSelect={setSelectedDate} onDateRangeChange={setSelectedRange} />
};

export const DontShowOtherMonthsDays = Default.bind({});
DontShowOtherMonthsDays.args = {
    showNotThisMonthDays: false
}

export const ChangeMonthIfDateOutside = Default.bind({});
ChangeMonthIfDateOutside.args = {
    changeMonthIfDateOutside: true
}

export const WithNoNavigationButtons = Default.bind({});
WithNoNavigationButtons.args = {
    hideNavigationButtons: true
}

export const CustomInitialMonthPosition = Default.bind({});
CustomInitialMonthPosition.args = {
    initialMonthPosition: new Date(1970, 7, 27),
    initialSelectedDate: new Date(1970, 7, 27)
}

export const CustomDateConstraintRanges = Default.bind({});
CustomDateConstraintRanges.args = {
    startFrom: new Date(2000, 6, 27),
    endFrom: new Date(2000, 6, 30),
    initialMonthPosition: new Date(2000, 6, 26),
    initialSelectedDate: new Date(2000, 6, 25)
}

export const RangePicker = Default.bind({});
RangePicker.args = {
    range: true
}

export const ConstrainedRangePicker = Default.bind({});
ConstrainedRangePicker.args = {
    range: true,
    endFrom: new Date(),
    startFrom: sub(new Date(), { weeks: 1 })
}

export const WithSelectedStartDateRangePicker = Default.bind({});
WithSelectedStartDateRangePicker.args = {
    range: true,
    endFrom: new Date(),
    startDate: sub(new Date(), { weeks: 1 })
}

export const WithCustomNavButtons = Default.bind({});
WithCustomNavButtons.args = {
    prevButton: <p>Prev</p>,
    nextButton: <h1>Next</h1>
}
