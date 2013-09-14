CPU=$(sar -u 1 1 | grep "Average" | awk -F " " '{ print 100 - $8 }')
TEMP=$(/opt/vc/bin/vcgencmd measure_temp | cut -c "6-7")
FREEMEM=$(free -mh | grep + | awk '{print ($3/438)*100 }')

echo "$CPU:$TEMP:$FREEMEM"
