echo "Enter .minecraft directory in the format '/.../.minecraft'"
read dotmcdir
cd "${dotmcdir}/wynntils/cache/"

sed -i 's=https:\/\/raw.githubusercontent.com\/Wynntils\/Static-Storage\/main\/Data-Storage\/urls.json=https:\/\/raw.githubusercontent.com\/byBackfish\/Static-Storage\/main\/Data-Storage\/urls.json=g' dataStaticUrls
