#!/bin/bash
# get today's date
OUTPUT="$(date)"
UPTIME="$(uptime)"
HDD1SPACE="$(du -sh /var/www/html/movieHDD)"
HDD2SPACE="$(du -sh /var/www/html/tvshowHDD)"
HDD1PERCENT="$(df -h | grep /dev/sdb1 | awk '{ print $5 }')"
HDD2PERCENT="$(df -h | grep /dev/sda1 | awk '{ print $5 }')"
# You must add following two lines before
# outputting data to the web browser from shell
# script
 echo "<div class='statssection'>"

 echo "Time: $OUTPUT <br>"
 echo "Total uptime: $UPTIME <br>"
 echo "Shell Script name is $0"


 echo "<h1>System info for host: $(hostname -s)</h1>"
# echo "<div class='statssection'>"

 echo ""
 echo "<h1>Memory Info:</h1>"
 echo "<pre> $(free -m) </pre>"
 echo "<h1>Disk Info:</h1>"
 echo "<pre> $(df -h) </pre>"
 echo "<h1>Logged in users:</h1>"
 echo "<pre> $(w) </pre>"

 echo "</div>"

 echo "<h1 class='statssection1'>Mounted HDD stats:</h1>"
 echo "<div class='statssection1'>"
 echo "<div class='piecontainer'><div class='chart' data-percent='$HDD1PERCENT'>$HDD1PERCENT</div>"
 echo "<div class='pietext'>$HDD1SPACE</div></div>"
 echo "<div class='piecontainer'><div class='chart' data-percent='$HDD2PERCENT'>$HDD2PERCENT</div>"
 echo "<div class='pietext'>$HDD2SPACE</div></div>"
 echo "</echo>"
