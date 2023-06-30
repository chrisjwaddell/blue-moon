!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).BlueMoon=t()}(this,(function(){"use strict";function e(e){return"[object Object]"===Object.prototype.toString.call(e)&&"{}"===JSON.stringify(e)}const t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];const r=864e5;function o(e){return e%4==0&&e%100!=0||e%400==0}function a(e,t){return[31,28+(o(t)?1:0),31,30,31,30,31,31,30,31,30,31][e-1]}function n(e,t){let r;r="[object Object]"!==Object.prototype.toString.call(e)?{day:e.getDate(),month:e.getMonth()+1,year:e.getFullYear()}:e;let o=new Date(Date.UTC(r.year,r.month-1,r.day,12,0,0,0)),a=new Date(o.valueOf()+t);return{year:a.getUTCFullYear(),month:a.getUTCMonth()+1,day:a.getUTCDate()}}function s(e,t,r=!1){let o,n=Math.floor(Math.abs(t)/12),s=Math.abs(t%12),y={};if(t>=0?(Number(e.month)+s>12?(n+=1,o=Number(e.month)+s-12):o=Number(e.month)+s,y={year:Number(e.year)+n,month:o,day:Number(e.day)}):(Number(e.month)-s>0?o=Number(e.month)-s:(n+=1,o=12+Number(e.month)-s),y={year:Number(e.year)-n,month:o,day:Number(e.day)}),r){let t=a(Number(y.month),Number(y.year));return Number(e.day)<=t||(y.day=Number(e.day)-t,y.month+=1),y}return y}function y(e,t){if(e.day>28&&2===e.month){if(o(e.year)!==o(e.year+t))return{day:1,month:3,year:e.year+t}}return{day:e.day,month:e.month,year:e.year+t}}function f(e){return/^[+|-]\d+$/.test(e)}function u(e,t,r){t<3&&(r--,t+=12);const o=r%100,a=Math.floor(r/100),n=(e+Math.floor(2.6*(t+1))+o+Math.floor(o/4)+Math.floor(a/4)+5*a)%7;return 0===n?6:n-1}function i(e,t){return t?t+"\n"+e:e}
/** @license
     *  ----------------------------------------------------------------------------
     *  Blue Moon Date API - <https://github.com/chrisjwaddell/blue-moon>
     *  Licensed under MIT
     *  Copyright Chris Waddell
     *  ----------------------------------------------------------------------------
     */return function(o,h){let m=h||{};m.pivotDate=m.pivotDate??{},m.resultAsDateObject=m.resultAsDateObject??!0,m.startOfWeek=m.startOfWeek??1;let d=new Date,l=m.pivotDate;e(l)&&(l=P(d));const p=()=>new Date(""),b=(e,t)=>console.log("%c"+(t?"ERROR":"WARNING")+` - ${e}`,"color: "+(t?"red":"blue")+"; font-size: 16px");let c={},N=j(o,!0);if(""!==N.TypeErrors)return b(N.TypeErrors,!0),p();if(""!==N.errors)return b(N.errors,!0),p();let w=j(l,!1);if(""!==w.TypeErrors)return b(w.TypeErrors,!0),p();if(""!==w.errors)return b(w.errors,!0),p();""!==N.warnings&&b(N.warnings,!1),""!==w.warnings&&b(w.warnings,!1);let v=k(w.D,{},w.M,w.Y,P(d),{});if(Object.prototype.hasOwnProperty.call(m,"loop"))return function(){let e=N.D.type,t="d",a=[];switch(e){case"current":case"relative":t="d";break;case"dayofweek":t=o.week?"y":"w";break;case"absolute":case"dayofweek weeknum":t=o.month?"y":"m"}a.push(v);let f=v;for(let e=0;e<Math.abs(m.loop)-1;e+=1){switch(t){case"d":f=f.day<28&&m.loop>0?{day:f.day+1,month:f.month,year:f.year}:f.day>1&&m.loop<0?{day:f.day-1,month:f.month,year:f.year}:m.loop>0?n(f,864e5):n(f,-864e5);break;case"w":f=m.loop>0?n(f,7*r):n(f,-7*r);break;case"m":f=f.month<12&&m.loop>0?{day:f.day,month:f.month+1,year:f.year}:f.month>1&&m.loop<0?{day:f.day,month:f.month-1,year:f.year}:m.loop>0?s(f,1,!0):s(f,-1,!0);break;case"y":f=m.loop>0?y(f,1):y(f,-1)}a.push(f)}let u=[];u=m.resultAsDateObject?a.map((e=>k(N.D,N.W,N.M,N.Y,e,m))):a.map((e=>D(k(N.D,N.W,N.M,N.Y,e,m))));return u}();{let e=k(N.D,N.W,N.M,N.Y,v,m);return m.resultAsDateObject?e:D(e)}function g(e,r){let o=String(e).trim();if(/^\d+$/.test(o))return{type:"absolute",offset:Number(o)};if(f(o))return{type:"relative",offset:o};if("current"===o)return{type:"current",offset:o};if("monthend"!==o||"d"!==r&&"pd-d"!==r){if("d"===r){let e="",r="",s=o.indexOf(" ");if(-1===s?e=o:(e=o.slice(0,s),r=o.slice(s+1)),3===e.length){let o=(n=e,t.findIndex((e=>e.slice(0,3).toLowerCase()===n.toLowerCase())));return-1!==o?-1===s?{type:"dayofweek",offset:o}:{type:"dayofweek weeknum",offset:{0:o,1:r}}:{type:"error",offset:e}}{let o=(a=e,t.findIndex((e=>e.toLowerCase()===a.toLowerCase())));return-1!==o?-1===s?{type:"dayofweek",offset:o}:{type:"dayofweek weeknum",offset:{0:o,1:r}}:{type:"error",offset:e}}}return{type:"error",offset:"error"}}return{type:"absolute",offset:o};var a,n}function k(t,o,a,y,f,i){if("absolute"===t.type||"current"===t.type)return function(){let r,n,u=(o&&!e(o)?"Y":"N")+(a&&!e(a)?"Y":"N")+(y&&!e(y)?"Y":"N"),i={},h={};switch(u){case"NYY":if("absolute"===a.type||"current"===a.type)return n=O(a,"m",f),"absolute"===y.type||"current"===y.type?r=O(y,"y",f):"relative"===y.type&&(r=f.year+Number(y.offset)),i={year:r,month:n,day:Y({type:"absolute",offset:O(t,"d",f)},n,r)},i;if("absolute"===y.type||"current"===y.type)return r=O(y,"y",f),n=f.month,i={year:r,month:n,day:Y(t,n,r)},"relative"===a.type?(h=s(i,Number(a.offset),!1),{year:h.year,month:h.month,day:Y({type:"absolute",offset:O(t,"d",f)},h.month,h.year)}):{};if("relative"===a.type&&"relative"===y.type)return r=f.year+Number(y.offset),n=f.month,i={year:r,month:n,day:Y(t,n,r)},h=s(i,Number(a.offset),!1),{year:h.year,month:h.month,day:Y({type:"absolute",offset:O(t,"d",f)},h.month,h.year)};break;case"NNY":return"absolute"===y.type||"current"===y.type?r=O(y,"y",f):"relative"===y.type&&(r=f.year+Number(y.offset)),n=f.month,i={year:r,month:n,day:Y({type:"absolute",offset:O(t,"d",f)},n,r)},i;case"NNN":return r=f.year,n=f.month,i={year:f.year,month:f.month,day:Y({type:"absolute",offset:O(t,"d",f)},n,r)},i;case"NYN":if(r=f.year,"absolute"===a.type||"current"===a.type)return n=O(a,"m",f),i={year:r,month:O(a,"m",f),day:Y({type:"absolute",offset:O(t,"d",f)},n,r)},i;if("relative"===a.type)return r=f.year,n=f.month,i={year:r,month:n,day:Y({type:"absolute",offset:O(t,"d",f)},n,r)},h=s(i,Number(a.offset),!1),{year:h.year,month:h.month,day:Y({type:"absolute",offset:O(t,"d",f)},h.month,h.year)}}}();if("relative"===t.type)return c=n({year:f.year,month:f.month,day:f.day},r*Number(t.offset)),c;if("dayofweek"===t.type)return c=function(){let s;switch((o&&!e(o)?"Y":"N")+(a&&!e(a)?"Y":"N")+(y&&!e(y)?"Y":"N")){case"NNN":s=f;break;case"NNY":"absolute"===y.type?s={year:Number(y.offset),month:f.month,day:f.day}:"current"===y.type?s=f:"relative"===y.type&&(s={year:f.year+Number(y.offset),month:f.month,day:f.day});break;case"YNN":if("absolute"===o.type){s=n({day:1,month:1,year:f.year},r*Number(o.offset)*7)}else if("current"===o.type)s=f;else if("relative"===o.type){s=n(f,r*Number(o.offset)*7)}break;case"YNY":if("absolute"===o.type)if("absolute"===y.type){s=n({day:1,month:1,year:Number(y.offset)},r*Number(o.offset)*7)}else if("current"===y.type){s=n({day:1,month:1,year:f.year},r*Number(o.offset)*7)}else"relative"===y.type&&(s=n({day:1,month:1,year:f.year+Number(y.offset)},r*Number(o.offset)*7));else"current"===o.type?"absolute"===y.type?s={day:f.day,month:f.month,year:Number(y.offset)}:"current"===y.type?s=f:"relative"===y.type&&(s={day:f.day,month:f.month,year:f.year+Number(y.offset)}):"relative"===o.type&&("absolute"===y.type?s=n({day:f.day,month:f.month,year:Number(y.offset)},r*Number(o.offset)*7):"current"===y.type?s=n(f,r*Number(o.offset)*7):"relative"===y.type&&(s=n({day:f.day,month:f.month,year:f.year+Number(y.offset)},r*Number(o.offset)*7)))}let h=function(e,t,r=1){return e===t?0:e>=r&&t>=r?t-e:(t<r?t+7:t)-(e<r?e+7:e)}(u(s.day,s.month,s.year),Number(t.offset),i.startOfWeek);return n(s,r*h)}(),c;if("dayofweek weeknum"===t.type)return c=function(){let r,n,s=(o&&!e(o)?"Y":"N")+(a&&!e(a)?"Y":"N")+(y&&!e(y)?"Y":"N"),u=t.offset[1].includes("*");switch(s){case"NNN":return M(t.offset[0],Number.parseInt(t.offset[1].replace("*","")),f.month,f.year,u,i.startOfWeek);case"NNY":return"absolute"===y.type?r=Number(y.offset):"current"===y.type?r=f.year:"relative"===y.type&&(r=f.year+Number(y.offset)),M(t.offset[0],Number.parseInt(t.offset[1].replace("*","")),f.month,r,u,i.startOfWeek);case"NYN":return"absolute"===a.type?n=Number(a.offset):"current"===a.type?n=f.month:"relative"===a.type&&(n=f.month+Number(a.offset)),M(t.offset[0],Number.parseInt(t.offset[1].replace("*","")),n,f.year,u,i.startOfWeek);case"NYY":return"absolute"===y.type?r=Number(y.offset):"current"===y.type?r=f.year:"relative"===y.type&&(r=f.year+Number(y.offset)),"absolute"===a.type?n=Number(a.offset):"current"===a.type?n=f.month:"relative"===a.type&&(n=f.month+Number(a.offset)),M(t.offset[0],Number.parseInt(t.offset[1].replace("*","")),n,r,u,i.startOfWeek)}}(),c}function Y(e,t,r){return"monthend"===e.offset?a(t,r):Number(e.offset)}function O(e,t,r){switch(t){case"d":return"current"===e.type?r.day:e.offset;case"m":return"current"===e.type?r.month:Number(e.offset);case"y":return"current"===e.type?r.year:Number(e.offset)}}function D(e){return new Date(e.year,e.month-1,e.day,0,0,0,0)}function P(e){return{year:e.getFullYear(),month:e.getMonth()+1,day:e.getDate()}}function T(e,t,r=1){return e===t?0:r>e&&r>t||e>r&&t>r?t-e:r===e?r>t?7-t-1:t-e:r===t?r>e?t-e-7:t-e:r>e&&t>r?t-e-7:e>r&&r>t?7-(e-t):void 0}function M(e,t,r,o,n=!1,s=1){let y=u(1,r,o),f=T(y,e,s),i=0;if(n){let t=T(y,s,s);t=0===t?0:7+T(y,s,s),i=t+T(s,e,s)}else i=f<0?f+7:f;let h=i+7*(t-1)+1;return h>a(r,o)?p():{day:h,month:r,year:o}}function j(t,r){const o=["day","week","month","year"];let a={},n={},s={},y={};const u={warnings:"",errors:"",TypeErrors:""};if(null==(h=t)||"[object Object]"!==Object.prototype.toString.call(h))return u.TypeErrors=i((r?"":"Pivot date - ")+"Argument 1 is not an object. See documentation for information.",u.TypeErrors),u;var h;for(let e of Object.keys(t))o.includes(e)||(u.errors=i((r?"":"Pivot date - ")+`${e} is a property that must be one of these property names - ${o.toString()}`,u.errors));return t.day?(a=g(t.day,"d"),u.D=a,"error"===a.type?u.errors=i((r?"":"Pivot date - ")+"'day' is invalid.",u.errors):"absolute"===a.type?Number(a.offset)<1||Number(a.offset)>31?u.errors=i((r?"":"Pivot date - ")+"'day' is outside the range of less than 1 or greater than 31. You can't have 'day' outside of this range. It shouldn't be higher than 28. Use 'monthend' to get the end of the month whether it's 30th or 31st, it will be the end of the month.",u.errors):Number(a.offset)>28&&(u.warnings=i((r?"":"Pivot date - ")+"'day' is higher than 28. It shouldn't be higher than 28. Use 'monthend' to get the end of the month whether it's 30th or 31st, it will be the end of the month.",u.warnings)):"relative"===a.type&&f(a.offset)&&Number(a.offset)>365&&(u.warnings=i((r?"":"Pivot date - ")+"'day' is a high number. Why don't you use years and/or months instead.",u.warnings))):u.errors=i((r?"":"Pivot date - ")+"'day' property is empty. It must have a value such as 1 (1st of the month), +4 (4 days ahead), 'Monday'.",u.errors),t.week&&(n=g(t.week,"w"),u.W=n,"error"===n.type?u.errors=i((r?"":"Pivot date - ")+"'week' is invalid.",u.errors):"absolute"===n.type?(Number(n.offset)<1||Number(n.offset)>53)&&(u.errors=i((r?"":"Pivot date - ")+"'week' is less than 1 or greater than 53. You can't have 'week' outside of this range.",u.errors)):"relative"===n.type&&f(n.offset)&&Number(n.offset)>53&&(u.warnings=i((r?"":"Pivot date - ")+"'week' is a high number. Why don't you use years and/or months instead.",u.warnings))),t.month&&(s=g(t.month,"m"),u.M=s,"error"===s.type?u.errors=i((r?"":"Pivot date - ")+"'month' is invalid.",u.errors):"absolute"===s.type?(Number(s.offset)<1||Number(s.offset)>12)&&(u.errors=i((r?"":"Pivot date - ")+"'month' is less than 1 or greater than 12. You can't have 'month' outside of this range.",u.errors)):"relative"===s.type&&f(s.offset)&&Number(s.offset)>48&&(u.warnings=i((r?"":"Pivot date - ")+"'month' is a high number. Why don't you use years and/or months instead.",u.warnings))),t.year&&(y=g(t.year,"y"),u.Y=y,"error"===y.type?u.errors=i((r?"":"Pivot date - ")+"'year' is invalid. 'year' isn't a number.",u.errors):"absolute"===y.type?function(e,t,r){let o=/^\d{4}$/,a=Number(e);return!(0===a||""!==a&&!o.test(a)||4!==String(a).length||t&&r&&(a<t||a>r)&&(console.log(`Year should be in range ${t} to ${r}`),1))}(y.offset,1600,2300)||(u.errors=i((r?"":"Pivot date - ")+"'year' is invalid. 'year' is less than 1600 or greater than 2300. You can't have 'year' outside of this range.",u.errors)):"relative"===y.type&&f(y.offset)&&Number(y.offset)>500&&(u.warnings=i((r?"":"Pivot date - ")+`'year' is a high number - ${y.offset}. Are you sure this is correct?.`,u.warnings))),"absolute"!==a.type&&"current"!==a.type||e(n)||(u.errors=i((r?"":"Pivot date - ")+"Day number and week number can't go together.",u.errors)),"relative"===a.type&&(e(n)&&e(s)&&e(y)||(u.errors=i((r?"":"Pivot date - ")+"'day' is relative. You can't have any other date properties, no week, month or year properties.  Eg if it's tomorrow (day: -1), you can't set week, month or year.",u.errors))),"dayofweek"===a.type&&(e(s)||(u.errors=i((r?"":"Pivot date - ")+"'day' is a day of the week. You can't have a month properties set. Eg { day: \"Tuesday\", month: 5 } doesn't make sense. You can have { day: \"Tuesday 2\", month: 5} which would return the 2nd Tuesday of May for the current year.",u.errors))),"dayofweek weeknum"===a.type&&(e(n)||(u.errors=i((r?"":"Pivot date - ")+'\'day\' is a day of the week with an occurrence. You can\'t have a week properties set. Eg { day: "Tuesday 2", week: 5 } doesn\'t make sense. You can have { day: "Tuesday 2"} or { day: "Tuesday 2", month: 5}.',u.errors))),"absolute"!==n.type&&"current"!==n.type||e(s)||"error"===s.type||(u.errors=i((r?"":"Pivot date - ")+"Week of year with month can't go together.",u.errors)),u}}}));
