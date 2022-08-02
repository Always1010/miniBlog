if [ $# == 0]
then
path=$(pwd)
else
path=$0
fi
for((n=1;n<=20;n++))
    do
    if [ $n -le 9 ]
    then 
    mkdir $path"/""user"0$n
    chmod 775 $path"/""user"0$n
    elif [ $n -gt 9 ]
    then
    mkdir $path"/""user"$n
    chmod 775 $path"/""user"$n
    fi
     
    done
    
