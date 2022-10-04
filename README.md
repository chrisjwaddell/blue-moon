# relative-date

This library allows you to enter date formats to return one specific date that matches your criteria. It can be in the past or future.
It can be relative to the current or pivot date or an absolute date.

Relative date references would be eg D-5 is 5 days ago. D1M+5, the 1st day of 5 months from now.
An absolute date reference is D20M10 - the next occurence of 20th of October. D1M7P - The previous 1st of July.

You can go back or forwards in dates.




##Day
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



