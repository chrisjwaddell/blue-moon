# relative-date

This library allows you to enter simple date settings to return one specific date that matches your criteria. It can be in the past or future.

Relative-date can be useful for setting dates for reports or generally finding specific dates. It can be hard finding the last Wednesday of the month or Mothers day the second Sunday of May each year.

It can be relative to the current or pivot date or an absolute date.


## Day
Refers to the day of the month, it can also refer to the day of the week.

### Day of the month
``
{ day: 5 }
``
Refers to the 5th of each month.

``{day: 25, month: 3}``
Means 25th of March every year.
### Day of week
Day of week with Week number combines with Month, even if Month isn't specified.
``
{ day: "Monday", week: 2 }
``
means Monday of the 2nd week of each month.

You can optionally set week as the week number of the year. You could do:
{ day: "Monday", week: 15 }, options: { weekasYear: true } }

### Relative day
For relative days, you cannot have any *week*, *month* or *year* settings.
``
{ day: -90 }
``
90 days ago.
``
{ day: -1 }
``
Yesterday



