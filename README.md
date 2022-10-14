# Blue Moon Date API

Blue Moon allows you to find dates based on week, day name, month and other simple date settings to return one specific date that matches your criteria. It can be in the past or future.

``
BlueMoon({ day: "Sunday -1" })
`` \
This returns the last Sunday of each month.

## Uses
Blue Moon can be useful for setting dates for reports or generally finding specific dates that can be tricky to code. Finding public holidays are another use. It can be hard finding the last Wednesday of the month, Monday last week or Mothers day the second Sunday of May each year.

BlueMoon is very verbose for getting specific dates for things like reports.

It can be relative to the current or pivot date or an absolute date.



## Getting Started

Include it in your HTML file:

``
<script src="https://raw.githubusercontent.com/chrisjwaddell/blue-moon/main/dist/blue-moon-min.js"></script>
``

Or download the file and include it in your project.

Start declaring dates with it like this:
``let melbourneCup = BlueMoon( {day: "Tuesday 1", month: 11``


## Date Settings
There are four main date settings: *day*, *week*, *month* and *year*.
Each setting can be specific, relative or *current*.

## Day
Day can be a number such as "15", meaning the 15th of the month, it can be "+5", meaning 5 days in the future, it can be a specific dayname such as "Wednesday", it can be a dayname and week such as "Wednesday 1" or it can be "current". It can be a specific day of the month such as "Monday 2" meaning the second Monday of each month.

The *day* property is mandatory.

### Day of the month
``
{ day: 5 }
`` \
Refers to the 5th of each month.

``{ day: 25, month: 3 }`` \
Means 25th of March every year.

``
{ day: "monthend", month: 2 }
`` \
This calculates the end of month, whether it's 29th of February or 28th in this case, or 30th or 31st for other months.

``
{ day: "current", month: "+1" }
``
One month from now no matter how many days in the current month. If it's the 18th of February today, the result will be the 18th of March.


### Day of week
Day of week can combinate with a Week number and/or a Month.

``
{ day: "Mon" }
`` \
means Monday of the current week. *week* is default *current* so it's equivalent to ``{ day: "Mon", week: "current" }``.

``
{ day: "Monday", week: 2 }
`` \
means Monday of the 2nd week of each month.

### Relative day of the week
``
{ day: "Monday", week: "+2" }
`` \
means Monday in two weeks. It will always give the Monday two weeks ahead of the current week.

You can optionally set week as the week number of the year. You could do:
``{ day: "Monday", week: 15 }, options: { weekasYear: true } }``

*Note* - You must use quotes for relative values.

``
{ day: "current" }
`` \
Today is set like this.

*"current"* can be put on *week*, *month* or *year*. *current* is a relative date type, it's like *"+1"* except that it really means *"+0"*.
If that date is June 30, 2022 and you have `` { day: "current", month: 7 }``. This would return `` { year: 2022, month: 7, day: 30 }`` but when the date is 1st July, 2022, it would return ``{ day: 1, month: 6, year: 2022 } ``


### Relative day
For relative days, you cannot have any *week*, *month* or *year* settings.

``
{ day: "-90" }
`` \
90 days ago.

``
{ day: "+1" }
`` \
Tomorrow.

*Note* - You must use quotes for relative values.

### Relative day of the month
There are some handy options if you are specific about full week or part week.

``
{ day: "Sunday 3" }
`` \
The third Sunday of the current month.

``
{ day: "Wednesday -2", month: 10 }
`` \
The second last Wednesday of October each year.

``
{ day: "Wedesday *1" }
`` \
The first Wedesday of each month that falls on a full week inside of that month. If the first Wedesday starts on the 1st or 2nd, Monday is in the previous month and so this is not considered to be a full week so _Wednesday *1_ would be the week after.

## Week
Week works in combination with *day* and can also work with *month*. *week* can be absolute, relative or the *current* week. *week* puts you in a seven day range.
*week: 1* is considered to be a week where any day in that week is the first of that month.

``{ day: "Tuesday", week: "+2" }`` \
Tuesday in two weeks from now.

``{ day: "Monday", week: "current" }`` \
Monday of this week.

``
{ day: "sun", week: 2 }
`` \
Sunday on week 2 of this month.



## Month
If month is omitted, it assumed current month if other settings are specific values.

*day* and *week* work together and *day* and can work with *month*.
``{ day: "Tuesday", week: 2, month: 6 }`` \
Tuesday in the second week of June. This specific case may be the first Tuesday in June depending on when the first week of June starts.

``{ day: "Tuesday 2", month: 6 }`` \
This is the second Tuesday in June.

``{ day: 15, month: 6, year: 2023 }`` \
The 15th of June, 2023.

So we have four main options: \
\<dayname\> \<occurrence number\> - Picks the day from the month. It counts the first day occurrence regardless of whether or not the first week overlapped into the previous week. eg ``{day: "Fri 2"`` \
\<dayname\> -\<occurrence number\> - Picks the day that occurred in the month, the **last** being -1.  eg ``{day: "Sat -1"``\
\<dayname\> *\<occurrence number\> - Picks the day from only **full weeks**. eg ``{day: "Fri *2"`` \
\<dayname\> *-\<occurrence number\> - **Full week**, from the **last** week of the month. eg ``{day: "Sun *-2"``

*Note*
There is also: \
\<dayname\> \<week\>
The difference with this is that if you enter
``{ day: "Monday", week: 1 }
``
Week 1 is the first of that month, and the start of the week probably is in the previous month. In this case, Monday would be the date of the previous month, something like 29th of the previous month. Using the *month* setting, you only get days in that month.

![Calendar](calendar.jpg)
The picture above shows that `` {day: "Wed", week: 1, month: 6 }`` specifies Wednesday in week 1 of July. Week 1 being the week that the 1st is in. The result is Wesnesday in the previous month. ``Wednesday 1`` makes sure it's in July. ``Wed *1`` with the __*__ specifies full week but ``Wed 1`` and ``Wed *1`` give the same result. We can see that for Sunday, they are different. ``Sun *1`` is the first Sunday of a full week, which is the 9th of July.


## Year
Year must be either a four digit specific year eg *2024*, a relative number *"+1" or *current*.

### Specific year
``
{ day: 1, year: "2023" }
`` \
This returns the first of the current month in 2023 every time it's run.

### Relative year
``
{ day: 1, year: "+1" }
`` \
This returns the first of the current month of next year every time it's run.
*Note* - You must use quotes for relative values.

### Current
*current* is like a relative year, like *+0*. *day*, *week*, *month* or *year* can be set as *current*.

``
{ day: "current", month: 1 }
`` \
If the date is 15th of March, 2024, this would return ``{ day: 15, month: 3, year: 2024 }


If you leave out *month* or *year*, it defaults to *current*.
``
{ day: 1 }
`` \
is the same as \
``
{ day: 1, month: "current", year: "current" }
``
This returns the first of the current month you are in, every time you run it, it will return the first of that month of the current year you are in.

``
{ day: "Monday" }
`` \
This returns Monday of the current week. Day of the week is used in conjuction with *week*, if *week* is missing, it assumes ``week: current``


For *day*, if you set it as relative eg
``
{ day: "+14" }
``
You cannot have any *week*, *month* or *year* settings. This wouldn't make sense. Relative day is a particular number of days ahead or behind today.
You can however set *day* as *current*.

You can mix and match if day is not relative, such as
``
{ day: "current", month: "+1", year: "current"}
{ day: "Monday", week: 2, month: 6, year: "current"}
{ day: 15, month: "+1", year: "current"}
``



## Pivot date
This is the date you want to start from. Like a reference point. You could find the first Sunday in March starting from 2000.
Pivot date is the second argument.
The default is today if pivot date is empty.
You could set the pivot date as: \
``
{ day: "Sunday 1", month: 3 }, { day: 1, month: 1, year: 2000 }
`` \
This finds the first Sunday in March 2000. Without pivot date, and with *year* omitted, it assumed ``year: "current"`` to return the first Sunday in March for this year.
``
{ day: "Sunday 1", month: 3 }
`` \
This finds the first Sunday in March this year.




## Options
There are some extra options.

#### startofweek
To specify when the start of the week is. The default is 1 - Monday. Sunday is 0.

``
BlueMoon({ day: "Mon 1"}, {}, {startofweek: 0 })
`` \
Returns the first Monday of the month. The first week is the week that starts at Sunday.


#### returnDate
The default is to return a Javascript Date object, you can opt to return a Blue Moon date object which is year, month, date.

``
BlueMoon({ day: "Mon 1"}, {}, { returnDate: false })
`` \
This returns a Blue Moon date object like this:
``
Object { year: 2022, month: 10, day: 10 }
``




## Get a series of dates - datesBefore and datesAfter
Blue Moon can move backwards and forwards and get previous or past dates. Use the *datesBefore* and *datesAfter* settings to go forwards or backwards. BlueMoon will return an array of dates if you use any of these settings.

``
BlueMoon({ day: "Mon 1"}, {day: 1, month: 1, year: 2021}, {datesAfter: 12})
`` \
The first Monday of each month in 2021. Blue Moon returns an array of 12 dates.


``
let next5MothersDays = BlueMoon({ day: "Sunday 2", month: 5}, {}, {datesAfter: 5}) `` \
Returns an array of dates of Mothers days for the next five years.


The way it works is, it works out when the date would change. A date setting like this would change monthly: \
``
{ day: 5, year: "current" }
``

A date setting like this would change yearly: \
``
{ day: 5, month: 6 }
``

A date setting like this would change weekly: \
``
{ day: "thu" }
``







