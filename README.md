# relative-date

This library allows you to enter date formats to return one specific date that matches your criteria. It can be in the past or future.
It can be relative to the current or pivot date or an absolute date.

Relative date references would be eg D-5 is 5 days ago. D1M+5, the 1st day of 5 months from now.
An absolute date reference is D20M10 - the next occurence of 20th of October. D1M7P - The previous 1st of July.

You can go back or forwards in dates.



## Day of week
Day of week with Week number combines with Month, even if Month isn't specified.
{ day: "Monday", week: 2 } means every month, Monday of the 2nd week of each month

You can optionally set week as the week number of the year. You could do:
{ day: "Monday", week: 15 }, options: { weekasYear: true } }



