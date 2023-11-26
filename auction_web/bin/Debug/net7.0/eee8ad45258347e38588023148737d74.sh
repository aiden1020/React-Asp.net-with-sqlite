function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 15758;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 15758 > /dev/null;
done;

for child in $(list_child_processes 15762);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/aiden/github/auction_web/auction_web/bin/Debug/net7.0/eee8ad45258347e38588023148737d74.sh;
