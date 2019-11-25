DATE_FORMAT=`date +"%m/%d/%Y %H:%M"`

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
if uname -s == "Linux"
echo yeeeeedaaawg it linux
endif

if (uname -s == "Darwin")
	{
		echo yeet mac
	}



echo Installation complete!
echo It is currently ${DATE_FORMAT}

