# React-awesome-datepickers

A simple, lightweight datepicker library for your awesome react app.

## Usage:

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
