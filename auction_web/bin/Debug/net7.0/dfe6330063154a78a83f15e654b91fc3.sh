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

ps 23114;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 23114 > /dev/null;
done;

for child in $(list_child_processes 23118);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/aiden/github/auction_web/auction_web/bin/Debug/net7.0/dfe6330063154a78a83f15e654b91fc3.sh;
