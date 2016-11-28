sudo apt-get install mongo

echo 'install mongo finish.'

sudo apt-get update

sudo apt-get install nodejs
sudo apt-get install npm

echo 'install nodejs finish.'

sudo apt-get update

echo 'start app---------------'
nohup nodejs ./app.js &
echo 'start app finish---------------'
