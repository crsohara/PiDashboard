#!/bin/bash
LOCCODE=`head -1 /var/www/html/pidashboard/commands/loccode`
echo $(curl -s "http://rss.accuweather.com/rss/liveweather_rss.asp?metric=1&locCode=$LOCCODE" | sed -n '/Currently:/ s/.*: \(.*\): \([0-9]*\)\([CF]\).*/\2°\3, \1/p')
#'echo "$weather"
