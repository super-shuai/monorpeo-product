#!/bin/bash -e

# -o ：online
# -m ：git commit message
# -t ：git tags message

time=`date '+%Y-%m-%dT%H.%M.%S'`
message="dist commit.$time"
tags=release-testonly.$time
text="auto tags"
online=:staging

while getopts om:t: ARGS  
do  
case $ARGS in   
    o)  
        online=
        tags=release-online.v.$time
        ;;  
    m)  
        message=$OPTARG
        ;;  
    t)  
        text=$OPTARG
        ;;  
    *)  
        echo "err：$ARGS"
        ;;
esac
done


# npm run build$online

# git add -f dist/

# git commit -m "$message"

# git push

git tag -a $tags -m "$text"

git push origin $tags

echo ======================
echo 🚀 deno
echo ⭐ tag = $tags
echo 🌈 message = $message
echo ✨ commit = $text
echo 🌔 `date '+%Y-%m-%d %H:%M:%S'`
echo ======================
