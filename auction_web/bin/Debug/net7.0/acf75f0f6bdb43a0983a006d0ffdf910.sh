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

ps 89238;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 89238 > /dev/null;
done;

for child in $(list_child_processes 89244);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/aiden/github/auction_web/auction_web/bin/Debug/net7.0/acf75f0f6bdb43a0983a006d0ffdf910.sh;
