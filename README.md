# relative-date

Relative-date allows you to enter simple date settings to return one specific date that matches your criteria. It can be in the past or future.

``
relative-Date({ day: "Sunday -1" })
``

This returns the last Sunday of each month. After that occurs, it would return the next months last Sunday of the month.

## Uses
Relative-date can be useful for setting dates for reports or generally finding specific dates that can be tricky to code. Finding public holidays are another use. It can be hard finding the last Wednesday of the month or Mothers day the second Sunday of May each year.

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

``
{ day: "monthend", month: 2 }
``
This calculates the end of month, whether it's 29th of February or 28th in this case, or 30th or 31st for other months.




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

*Note* - You must use quotes for relative values.

``
{ day: "current" }
``
Today is set like this. \
*"current"* can be put on *week*, *month* or *year*. *current* is a relative date type, it's like *"+1"* except that it really means *"+0"*.
If that date is June 30, 2022 and you have `` { day: "current", month: 7 }`` This would return `` { year: 2022, month: 7, day: 30 }`` but when the date is 1st July, 2022, it would return ``{ day: 1, month: 6, year: 2022 } ``


### Relative day
For relative days, you cannot have any *week*, *month* or *year* settings.

``
{ day: "-90" }
``
90 days ago.

``
{ day: "+1" }
``
Tomorrow.

*Note* - You must use quotes for relative values.

### Relative day of the month
There are some handy options if you are specific about full week or part week.

``
{ day: "Sunday 3" }
``
The third Sunday of each month.

``
{ day: "Wednesday -2", month: 10 }
``
The second last Wednesday of the month.

``
{ day: "Wedesday *1" }
``
The first Wedesday of each month that falls on a full week inside of that month. If the first Wedesday starts on the 2nd or 3rd, Monday is inside the previous month and so this is not considered to be a full week so _Wednesday *1_ would be the week after.

## Week
Week works in combination with *day* and can also work with *month*. *week* can be absolute, relative or the *current* week.
*week: 1* is considered to be a week where any day in that week is the first of that month.
``{ day: "Tuesday", week: "+2" }``
Tuesday in two weeks from now.

``{ day: "Monday", week: "current" }``
Monday of this week.

``
{ day: "sun", week: 2}
``
Sunday on week 2 of this month.




## Month
If month is omitted, it assumed current month if other settings are specific values.

*day* and *week* work together and *day* and can work with *month*.
``{ day: "Tuesday", week: 2, month: 6 }``
Tuesday in the second week of June. This specific case may be the first Tuesday in June depending on when the first week of June starts.

``{ day: "Tuesday 2", month: 6 }``
This is the second Tuesday in June.

``{ day: 15, month: 6, year: 2023 }``
The 15th of June, 2023.

So we have four main options: \
\<dayname\> \<occurrence number\> - Picks the day from the month. It counts the first day occurrence regardless of whether or not the first week overlapped into the previous week. \
\<dayname\> -\<occurrence number\> - Picks the day that occurred in the month, the **last** being -1. \
\<dayname\> *\<occurrence number\> - Picks the day from only **full weeks**. \
\<dayname\> *-\<occurrence number\> - **Full week**, from the **last** week of the month.

*Note*
There is also: \
\<dayname\> \<week\>
The difference with this is that if you enter
``{ day: "Monday", week: 1 }
``
Week 1 is the first of that month, and the start of the week probably is in the previous month. In this case, Monday would be the date of the previous month, something like 29th of the previous month. Using the *month* setting, you only get days in that month.

## Year
Year must be either a four digit specific year eg *2024*, a relative number *"+1" or *current*.

### Specific year
``
{ day: 1, year: 2023 }
``

### Relative year
``
{ day: 1, year: "+1" }
``

*Note* - You must use quotes for relative values.

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
Occur lets you return a previous dates or dates in the future. \
``
{ occur: "-1" }
``
Means the last one that occurred.

The default is ``occur: "+1"``

``
let nextMothersDay = { day: "Sunday", month: 5 }
let lastMothersDay = { day: "Sunday", month: 5, occur: "-1" }
``



