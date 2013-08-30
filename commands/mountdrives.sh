#!/bin/bash
if [ "$1" == "mount" ]
then
  sudo mount $2 $3 
elif [ "$1" == "umount" ]
then
  sudo umount $2
else
  echo "work"
fi


