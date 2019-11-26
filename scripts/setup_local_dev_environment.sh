#!/bin/bash


execute_script()
{
    #we define the whole script as a function to be able to pipe its output into tee 
    DATE_FORMAT=`date +"%m/%d/%Y %H:%M"`
    OP_SYS=`uname -s`
    #initialize environment variables


    echo Welcome to the setup script $USER!
    echo It is currently ${DATE_FORMAT}
    echo "We are currently running on $OP_SYS"
    echo This script checks required programs and dependencies and installs all missing tools for you.
    echo These tools are: 
    echo brew
    echo git
    echo NodeJS
    echo Installation started!
    #Print various messages


    if [ $OP_SYS = Linux ]
    then
	    #If we are running Linux, install dependecies with get-apt
	    sudo apt-get install git
	    sudo apt-get install nodejs
	    sudo apt-get install npm

    fi

    if [ $OP_SYS = Darwin ]
    then
        #IF we are running MacOS, check if brew is already installed.
 
        if test ! $(which brew);
        then
            #IF brew is not installed, then install.
	    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
        fi

        if test ! $(which git);
        then
            #If git is not installed, then install.
            brew install git
        fi
        
        if test ! $(which node);
        then
            #If node is not installed, then install.
            brew install node
        fi
    fi
   
    echo Installation complete!
   
    #Print version
    echo The following versions are installed:
    git --version
    echo -n "npm "
    npm --version
    
    #check nodejs version since MacOS and Linux use different names
    if [ $OP_SYS = Darwin ]
    then
	brew --version
        echo -n "nodejs "
        node --version
    else
        echo -n "nodejs "
        nodejs --version
    fi

    echo It is currently ${DATE_FORMAT}
    #Confirm installation and print date
}

execute_script | tee output.log
#Execute function and pipe output to file and stdout


