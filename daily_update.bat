@echo off
:: 获取当前日期并格式化为 YYYY-MM-DD 格式
for /f "tokens=2 delims==" %%i in ('"wmic os get localdatetime /value | findstr LocalDateTime"') do set datetime=%%i
set date=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%

:: Git 操作
echo 正在添加所有更改到暂存区...
git add .

echo 正在提交更改，提交信息为 "Daily update: %date%"...
git commit -m "Daily update: %date%"

echo 正在推送更改到远程仓库 (main 分支)...
git push origin main

echo 完成！
pause