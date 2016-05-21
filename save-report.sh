DESTINATION=~/pulse-pa11y-results/

foldername=$(date +%Y%m%d%H%M%S)
path=$DESTINATION/$foldername
mkdir -p $path

mv app/results $path
