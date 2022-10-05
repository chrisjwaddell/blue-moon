# relative-date

This library allows you to enter simple date settings to return one specific date that matches your criteria. It can be in the past or future.

``
relative-Date({ day: "Sunday L1" })
``

Means the last Sunday of each month. It would return the next one, after that occurs, it would return the next one, the next months last Sunday of the month.

Relative-date can be useful for setting dates for reports or generally finding specific dates that can be tricky to code. It can be hard finding the last Wednesday of the month or Mothers day the second Sunday of May each year.

relative-date is very verbose for getting specific dates for things like reports.

It can be relative to the current or pivot date or an absolute date.

## Settings
There are four main date settings: *day*, *week*, *month* and *year*.
Each setting can be specific, relative or *current*.
## Day
There are two main modes to *day*. It can be a specific day of the month such as the 3rd, or it can be a day such as Wednesday.
The *day* property is mandatory.

### Day of the month
``
{ day: 5 }
``
Refers to the 5th of each month.

``{ day: 25, month: 3 }``
Means 25th of March every year.
### Day of week
Day of week with Week number combines with Month, even if Month isn't specified.
``
{ day: "Monday", week: 2 }
``
means Monday of the 2nd week of each month.

### Relative day of the week
``
{ day: "Monday", week: "+2" }
``
means Monday in two weeks. It will always give the Monday two weeks ahead of the current week.

You can optionally set week as the week number of the year. You could do:
{ day: "Monday", week: 15 }, options: { weekasYear: true } }

*Note *- You must use quotes for relative values.

### Relative day
For relative days, you cannot have any *week*, *month* or *year* settings.

``
{ day: "-90" }
``
90 days ago.

``
{ day: "-1" }
``
Yesterday

*Note *- You must use quotes for relative values.

### Relative day of the month
``
{ day: "Sunday 3" }
``
The third Sunday of each month.

``
{ day: "Wednesday L2", month: 10 }
``
The second last Wednesday of the month.

## Week
Week works in combination with *day* and can also work with *month*. Working with weeks it can be relative or the *current* week.
``{ day: "Tuesday", week: "+2" }``
Tuesday in two weeks from now.

``{ day: "Monday", week: "current" }``
Monday of this week.



## Month
Week works with day and can work with month.
``{ day: "Tuesday", month: 2 }``
Tuesday in the second week of February. This specific case may be the first Tuesday in February depending on when the first week of February starts.

``{ day: "Tuesday 2", month: 2 }``
This is the second Tuesday in February.

``{ day: 15, month: 6, year: 2023 }``
The 15th of June, 2023.


## Year
Year must be either a four digit number, a relative number or *current*.

### Specific year
``
{ day: 1, year: 2023 }
``

### Relative year
``
{ day: 1, year: "+1" }
``

*Note *- You must use quotes for relative values.

### Current
``
{ day: 1, year: 2023 }
``
*current* is like a relative year, like *+0*.


*day*, *week*, *month* or *year* can be set as *current*.



## Pivot date
This is the date you want to start from. You could find the first Sunday in March starting from 2000.
You could set the pivot date as:
``
{ day: "Sunday 1", month: 3, pivotdate: { day: 1, month: 1, year: 2000 } }
``




## Occur
Occur lets you look ahead of backwards.
``
{ occur: "-1" }
``
Means the last one that occurred.
*"+1"* is the defualt.

// Default is 'occur: "+1"'
let nextMothersDay = { day: "Sunday", month: 5 }
let lastMothersDay = { day: "Sunday", month: 5, occur: "-1" }






