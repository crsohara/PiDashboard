#!/bin/bash

if [ $1 == 'minmax' ]; then
	MAX=$(cat /sys/devices/system/cpu/cpu0/cpufreq/cpuinfo_max_freq)
	MAX=`expr $MAX / 1000`mhz
	MIN=$(cat /sys/devices/system/cpu/cpu0/cpufreq/cpuinfo_min_freq)
	MIN=`expr $MIN / 1000`mhz

	echo Max: $MAX Min: $MIN
	
elif [ $1 == 'cur' ]
then
	FREQ=$( cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq | awk '{ print ($1 / 1000) }' )
	echo $FREQ
	
elif [ $1 == 'guv' ]
then
	GUV=$(cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor)
	echo $GUV
	
elif [ $1 == 'ramused' ]
then
	MEM=$( free -mh | grep + | awk '{ gsub("M","",$3); print  $3}' )
	echo $MEM

elif [ $1 == 'ramfree' ]
then
	MEM=$( free -mh | grep + | awk '{ gsub("M","",$4); print  $4}' )
	echo $MEM

fi