#!/bin/bash
#CPU
CPU=$(top -bn 2 -d 1 | grep '^%Cpu' | tail -n 1 | awk '{print $2+$4+$6}')
FREQ=$(cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq)
CURFREQ=`expr $FREQ / 1000`mhz
TEMP=$(cat /sys/class/thermal/thermal_zone0/temp | cut -c1-2)

#RAM
MEM=$(free -mh | grep + | awk '{ print ($3/485)*100 }')
RAMUSED=$( free -mh | grep + | awk '{ gsub("M","",$3); print  $3}' )
RAMFREE=$( free -mh | grep + | awk '{ gsub("M","",$4); print  $4}' )

#NET
R1=`cat /sys/class/net/eth0/statistics/rx_bytes`
T1=`cat /sys/class/net/eth0/statistics/tx_bytes`
sleep 1
R2=`cat /sys/class/net/eth0/statistics/rx_bytes`
T2=`cat /sys/class/net/eth0/statistics/tx_bytes`
TBPS=`expr $T2 - $T1`
RBPS=`expr $R2 - $R1`
TKBPS=`expr $TBPS / 1024`
RKBPS=`expr $RBPS / 1024`


#echo "$CPU:$TEMP:$MEM:$TKBPS:$RKBPS:$CURFREQ:$RAMUSED:$RAMFREE" >cpu_ram_net.data
echo "$CPU:$TEMP:$MEM:$TKBPS:$RKBPS:$CURFREQ:$RAMUSED:$RAMFREE"