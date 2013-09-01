#!/bin/bash
up=$(uptime)

if [[ "$up" == *day*  ]]
then
	#uptime=$(uptime | awk -F " " '{print $3 " " $4 " " $5}')
	up=$(echo $up | awk -F " " '{print $3 " " $4 " " $5}')
elif [[ "$up" == *min* ]]
then
	#uptime=$(uptime | awk -F " " '{print $3 " " $4 " " $5 " " $6}')
	up=$(echo $up | awk -F " " '{print $3 " " $4 " " $5 " " $6}')
else
	#uptime=$(uptime | awk -F " " '{print £3 " " $4}')
	up=$(echo $up | awk -F " " '{print $3 " " $4}')
fi

echo ${up%?}


