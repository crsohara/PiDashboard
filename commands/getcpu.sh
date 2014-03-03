#!/bin/bash
#CPU
CPU=$(top -bn 2 -d 1 | grep '^%Cpu' | tail -n 1 | awk '{print $2+$4+$6}')
FREQ=$(cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq)
CURFREQ=`expr $FREQ / 1000`
TEMP=$(cat /sys/class/thermal/thermal_zone0/temp | cut -c1-2)

#RAM
RAMUSED=$( free -mh | grep + | awk '{ gsub("M","",$3); print  $3}' )
RAMFREE=$( free -mh | grep + | awk '{ gsub("M","",$4); print  $4}' )
RAMTOTAL=$(cat /proc/meminfo | grep MemTotal | awk {'print $2'})
# ramtotal returns kbytes

#NET
R1=`cat /sys/class/net/eth0/statistics/rx_bytes`
T1=`cat /sys/class/net/eth0/statistics/tx_bytes`
sleep 1
R2=`cat /sys/class/net/eth0/statistics/rx_bytes`
T2=`cat /sys/class/net/eth0/statistics/tx_bytes`
TBPS=`expr $T2 - $T1`
RBPS=`expr $R2 - $R1`

#echo "$CPU:$TEMP:$MEM:$TBPS:$RBPS:$CURFREQ:$RAMUSED:$RAMFREE" >cpu_ram_net.data
#echo "$CPU:$TEMP:$RAMTOTAL:$TBPS:$RBPS:$CURFREQ:$RAMUSED:$RAMFREE"

echo {\"cpu\": {\"percent_used\":\"$CPU\"\,\"current_frequency\":\"$CURFREQ\"\,\"temperature\":\"$TEMP\"}\,\"ram\": {\"used\":\"$RAMUSED\"\,\"free\":\"$RAMFREE\"\,\"total\":\"$RAMTOTAL\"}\,\"net\":{\"upload\":\"$TBPS\"\,\"download\":\"$RBPS\"}} > /run/shm/pidash.dat

