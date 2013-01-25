import os.path
import re

f = open(os.path.join(os.path.expanduser('~'),'Documents/dhcpd.log'), 'r').read()
pattern =  r'(DHCPREQUEST.*)([0-9a-f]{2}:){5}[0-9a-f]{2}'
print re.findall(pattern, f, re.IGNORECASE)
