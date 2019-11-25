#!/bin/bash

DATE_FORMAT=`date +"%m/%d/%Y %H:%M"`
OP_SYS=`uname -s`

echo Welcome to the setup script $USERNAME!
echo It is currently ${DATE_FORMAT}
echo -n "We are currently running on "
uname -s -r
echo This script checks required programs and dependencies and installs all missing tools for you.
echo These tools are: 
echo brew
echo git
echo NodeJS
echo Installation started!
if [ $OP_SYS = Linux ]
then
	echo yeeeeedaaawg it linux
fi

if [ $OP_SYS = Darwin ]
then
	echo yeet mac
fi

echo Installation complete!
echo It is currently ${DATE_FORMAT}

