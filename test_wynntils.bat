@Echo Off 
:GetInput
Set "dotmcdir="
Set /P "dotmcdir=Please enter the location of your .minecraft directory (must be in format 'C:/.../.minecraft'): "
CD /D "%dotmcdir%/wynntils/cache/"
powershell -Command "(gc ./dataStaticUrls.json) -replace 'https://raw.githubusercontent.com/Wynntils/Static-Storage/main/Data-Storage/urls.json', 'https://raw.githubusercontent.com/byBackfish/Static-Storage/main/Data-Storage/urls.json' | Out-File -encoding ASCII ./dataStaticUrls.json"