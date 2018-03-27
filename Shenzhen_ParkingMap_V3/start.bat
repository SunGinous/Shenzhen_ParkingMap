@echo off

C:
cd\"Program Files (x86)"
cd\Google
cd\Chrome
cd\Application
chrome.exe -kiosk --allow-file-access-from-files "%~dp0\shenzhen_line_bmap_effect.html"