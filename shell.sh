/usr/bin/sh
clear
echo "Hello $USER"
echo "Today is \c ";date
echo "Number of user login : \c" ; who | wc -l
echo "Calendar"
cal
echo "Grep example"
output=`grep -io "DHCPREQUEST.*\([0-9a-f]\{2\}:\)\{5\}[0-9a-f]\{2\}" ~/Documents/dhcpd.log`
echo $output
exit 0
