#!/bin/bash

uptime=$(awk '{print $1}' /proc/uptime)
uptime=${uptime%%.*}

seconds=$(( $uptime%60 ))
minutes=$(( $uptime%3600/60 ))
hours=$(( $uptime/3600%24 ))
days=$(( $uptime/3600/24 ))

#echo $days days\, `printf "%02d" $hours`:`printf "%02d" $minutes`
echo {\"uptime\":{\"days\":\"$days\"\, \"hours\":\"$hours\"\, \"minutes\":\"$minutes\"\, \"seconds\":\"$seconds\"}}