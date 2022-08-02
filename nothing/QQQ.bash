read -p "请输入要添加的目录个数" ww
www=$USER
path=$(pwd)
for((i=1;i<=$ww;i++))
do
if [ -d "$path"/"$www$i" ]
then
rm -r  $path"/"$www$i
mkdir  $path"/"$www$i
echo "成功建立$path"/"$www$i"
else
mkdir  $path"/"$www$i
echo "成功建立$path"/"$www$i"
fi
done