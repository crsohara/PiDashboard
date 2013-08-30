uptime=$(uptime | awk -F " " '{print $3 " " $4 " " $5}')
echo ${uptime%?}
