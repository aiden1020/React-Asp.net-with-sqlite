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

ps 58879;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 58879 > /dev/null;
done;

for child in $(list_child_processes 58887);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/aiden/github/auction_web/auction_web/bin/Debug/net7.0/4b2e13b9412042e691e0856b72fd351d.sh;
