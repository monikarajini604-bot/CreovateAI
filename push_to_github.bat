@echo off
set "PATH=C:\Users\lavan_7fd3br1\AppData\Local\GitHubDesktop\app-3.6.6\resources\app\git\cmd;C:\Users\lavan_7fd3br1\AppData\Local\GitHubDesktop\app-3.6.6\resources\app\git\mingw64\bin;%PATH%"
cd /d "c:\Users\lavan_7fd3br1\Desktop\creovate ai"
echo ===================================================
echo Pushing Creovate AI to GitHub:
echo https://github.com/monikarajini604-bot/CreovateAI
echo ===================================================
git push -u origin main
if %ERRORLEVEL% equ 0 (
    echo.
    echo ===================================================
    echo SUCCESS! Creovate AI has been pushed to GitHub!
    echo ===================================================
) else (
    echo.
    echo ===================================================
    echo Push paused for GitHub login. Please complete authorization.
    echo ===================================================
)
pause
