@echo off
:: ��ȡ��ǰ���ڲ���ʽ��Ϊ YYYY-MM-DD ��ʽ
for /f "tokens=2 delims==" %%i in ('"wmic os get localdatetime /value | findstr LocalDateTime"') do set datetime=%%i
set date=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%

:: Git ����
echo ����������и��ĵ��ݴ���...
git add .

echo �����ύ���ģ��ύ��ϢΪ "Daily update: %date%"...
git commit -m "Daily update: %date%"

echo �������͸��ĵ�Զ�ֿ̲� (main ��֧)...
git push origin main

echo ��ɣ�
pause