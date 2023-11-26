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

ps 32568;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 32568 > /dev/null;
done;

for child in $(list_child_processes 32573);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/aiden/github/auction_web/auction_web/bin/Debug/net7.0/4ac79722a06e43c49389c355441a3ba2.sh;
