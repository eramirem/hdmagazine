open(ENV['HOME']+'/Documents/dhcpd.log') do |f| 
  f.grep(/DHCPREQUEST.*([0-9a-f]{2}:){5}[0-9a-f]{2}/) do |line|
    puts line
  end
end
