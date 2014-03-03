#!/bin/bash

if [ $1 == 'cpu_details' ]; then
	MAX=$(cat /sys/devices/system/cpu/cpu0/cpufreq/cpuinfo_max_freq)
	MAX=`expr $MAX / 1000`
	MIN=$(cat /sys/devices/system/cpu/cpu0/cpufreq/cpuinfo_min_freq)
	MIN=`expr $MIN / 1000`
	FREQ=$(cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq)
	CURFREQ=`expr $FREQ / 1000`
	GUV=$(cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor)
	LAN_IP4=$(ip addr show eth0 | grep inet | awk {'print $2'})
	WAN_IP4=$(curl ident.me)
	HOSTNAME=$(hostname)
	echo {\"cpu\":{\"freq\":{\"max_frequency\":\"$MAX\"\,\"min_frequency\":\"$MIN\"\,\"current_frequency\":\"$CURFREQ\"}\,\"governor\":\"$GUV\"}\,\"net\":{\"hostname\":\"$HOSTNAME\"\,\"ipv4_lan\":\"$LAN_IP4\"\,\"ipv4_wan\":\"$WAN_IP4\"}}

elif [ $1 == 'totalRam' ]
then
	echo $(cat /proc/meminfo | grep MemTotal | awk {'print $2'})
fi