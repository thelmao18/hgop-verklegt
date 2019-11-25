#!/bin/bash


execute_script()
{

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
	    sudo apt-get install git
	    sudo apt-get install nodejs
	    sudo apt-get install npm
	    echo -n "nodejs "
	    nodejs --version

    fi

    if [ $OP_SYS = Darwin ]
    then
	    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	    brew install git
	    brew install node
	    brew --version
	    echo -n "nodejs "
	    node --version
    fi

    git --version
    echo -n "npm "
    npm --version


    echo Installation complete!
    echo It is currently ${DATE_FORMAT}
}

execute_script | tee output.log


