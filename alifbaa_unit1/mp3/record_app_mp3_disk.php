<html>
<head>
<?php 
$USERDIR="Test";
$VoiceServerFolder = "/../voicefiles/";
?>
<title>Mp3 Recording Applet SDK</title>

<SCRIPT language="JavaScript">
	var optionNo = 0
	var UserServerFolder = "<?php echo $USERDIR?>"
	
	function vision()	
	{
		STOP_RP();
		document.getElementById("loading").style.visibility="hidden";
		document.getElementById("loaded").style.visibility="visible";
	}
	
	function fileLoaded()
	{
		alert("file loaded!");
	}

	function report_RP(s,num)
	{
		alert(s);
	}

	function setRecordLevel(num){}

	function setStatus_RP(str,num)	
	{
		document.Gui_RP.Status.value = str;
		if(num==7) fileLoaded();
	}

	function setTimer_RP(s)	{
		document.Gui_RP.Timer.value = s;
	}

	function confirmRecord(s, num)	{
		if(confirm(s))
			RECORD_RP();
		else
			STOP_RP();
	}

        function confirmOpen(s, num)	
	{
		if(confirm(s))	OPEN_RP();
		else STOP_RP();
	}

	function addName(s)	{
		var newOpt  = new Option(String(s),String(s));
		var VILength = document.Gui_RP.VoiceItems.length;
		document.Gui_RP.VoiceItems.options[VILength] = newOpt;
		document.Gui_RP.FileName.value = "*.mp3";
	}

	function RECORD_RP()	{
		document.RPApplet.RECORD();
		}

<!-- ************* EXAMPLE **************************************************************** -->
	function setparameter()	{
		document.RPApplet.SETPARAMETER(String("bla"),String("BLABLA"));
		}
<!-- ************* EXAMPLE **************************************************************** -->



	function PLAYBACK_RP()	{
		document.RPApplet.PLAYBACK();
	}

	function PAUSE_RP()	{
		document.RPApplet.PAUSE();
	}

	function STOP_RP()	{
		document.RPApplet.STOP_RP();
	}

	function UPLOAD_RP()	{
	//saving to local filesystem before upload to the server
		document.RPApplet.SAVE(null,String(document.Gui_RP.FileName.value));
	//uploading to the server
		document.RPApplet.UPLOAD(String(document.Gui_RP.FileName.value));

	}

	function WEBPLAY_RP()	{
	document.RPApplet.WEBPLAY(UserServerFolder + "/" + document.Gui_RP.VoiceItems.value);
	}
	
	function SAVE_RP()	
	{
		//example of audio file saving in the specified folder 
    		//document.RPApplet.SAVE("C:\\Documents and Settings\\folder1\\folder2",document.Gui_RP.FileNameOpen.value);

		//example of saving in the User Dir( "C:\\Documents and Settings\\UserName )
    		document.RPApplet.SAVE(".\\miha",document.Gui_RP.FileNameOpen.value);
	}
		
	function OPEN_RP()	
	{	
            //example of audio file opening from the specified folder 
    		//document.RPApplet.OPEN("C:\\Documents and Settings\\folder1\folder2",document.Gui_RP.FileNameOpen.value);

		//example of audio file opening from from User Dir directory
    		document.RPApplet.OPEN(".\\miha",document.Gui_RP.FileNameOpen.value);
	}

	function DELETE_RP()	
	{
    		document.RPApplet.DELETESESSIONFILES(".\\miha");
	}
	function getStatus()
	{
		var snum=document.RPApplet.GET_CURRENT_STATUS_NUM();
		var sstr=document.RPApplet.GET_CURRENT_STATUS_STR();
		alert(snum+" "+sstr);
	}
	
</script>

</head>

<body onLoad="vision()">

<SPAN ID="loading" style="visibility:visible">
	<TABLE border="0">
		<TR>
			<TD ALIGN=CENTER VALIGN=MIDDLE>Loading Java applet...</TD>
		</TR>
	</TABLE>
</SPAN>

<SPAN ID="loaded" style="visibility:hidden">
	<FORM name="Gui_RP" onSubmit="event.returnValue=false;return false;">
		<TABLE CELLSPACING=1 style="color:#000000;font-family:Tahoma;font-size:10pt" border="0">
			<TR>
						<TD> Recorder</TD>
						<TD><input TYPE=button VALUE="Record" STYLE="width:70;font-family:Tahoma;font-size:10pt" onClick="RECORD_RP();"></TD>
						<TD width="70"><input TYPE=button VALUE="Play" STYLE="width:70;font-family:Tahoma;font-size:10pt" onClick="PLAYBACK_RP();"></TD>
						<TD width="70"><input TYPE=button VALUE="Pause" STYLE="width:70;font-family:Tahoma;font-size:10pt" onClick="PAUSE_RP();"></TD>
						<TD><input TYPE=button VALUE="Stop" STYLE="width:70;font-family:Tahoma;font-size:10pt" onClick="STOP_RP();"></TD>
                                                
			</TR>
					<TR>
						<TD COLSPAN=2>Please enter file name</TD>
						<TD ALIGN=right COLSPAN=2><input TYPE=text NAME="FileName" VALUE="*.mp3" SIZE=20 MAXLENGTH=16 style="width:150;font-family:Tahoma;font-size:10pt"></TD>
						<TD><input TYPE=button VALUE="Send" STYLE="width:70" onClick="UPLOAD_RP();"></TD>

<!-- ************* EXAMPLE **************************************************************** -->

<!-- ************* EXAMPLE **************************************************************** -->

					</TD></TR>
					<TR>
						<TD COLSPAN=2>Listen from Web-server</TD>
						<TD ALIGN=right COLSPAN=2>
							<SELECT ID="VoiceItems" SIZE=1 style="width:150;font-family:Tahoma;font-size:10pt">


						<?php
						$dir = $VoiceServerFolder.$USERDIR;
			
						// Open a known directory, and proceed to read its contents
						if (is_dir($dir)) {
						    if ($dh = opendir($dir)) {
		        				while (($file = readdir($dh)) !== false) {
							    if ($file != "." && $file != "..") 
								{
									list($name,$ext)=explode(".",$file);
									if($ext=="mp3") echo "<OPTION VALUE = $file >$file</OPTION>";
							    }
					 	    }
						    closedir($dh);
						    }
						}
			        	
						?>

							</SELECT>
						</TD>
						<TD><input TYPE=button VALUE="Listen" STYLE="width:70" onClick="WEBPLAY_RP();"></TD>
                                                
					</TR>
					<TR>
						<TD>Status</TD>
						<TD COLSPAN=3><input TYPE=text NAME="Status" VALUE="" SIZE=34 MAXLENGTH=60 style="width:240;font-family:Tahoma;font-size:10pt"></TD>
						<TD COLSPAN=2><input TYPE=text NAME="Timer" SIZE=6 ></TD>
					</TR>
		                        <TR>
<TD></TD>
                                        <TD><input type="button" name="open" value="Open" STYLE="width:70;font-family:Tahoma;font-size:10pt" onClick="OPEN_RP()"></TD>   
                                        <TD><input type="button" name="save" value="Save" STYLE="width:70;font-family:Tahoma;font-size:10pt" onClick="SAVE_RP()"></TD>
                                        
                                        <TD><input type="button" name="delete" value="Delete" STYLE="width:70;font-family:Tahoma;font-size:10pt" onClick="DELETE_RP()"></TD>
                                        <TD><input TYPE=text NAME="FileNameOpen" VALUE="*.mp3" SIZE=6 ></TD>
</TR> 
		</TABLE>
			
</SPAN>
			<APPLET	CODE="RPApplet.class"
				ARCHIVE="RPAppletMp3.jar"
				CODEBASE="."
				ALIGN="MIDDLE" WIDTH=380 HEIGHT=24
				NAME="RPApplet" 
				MAYSCRIPT>
				<PARAM NAME = cabbase	                VALUE = RPAppletMp3.cab>
				<PARAM NAME = "Registration"	        VALUE = "demo">
				<PARAM NAME = "ServerScript"	        VALUE = "http://169.237.245.74/aww/recorder/retrive.php">
				<PARAM NAME = "VoiceServerFolder"	VALUE = "<?php echo $VoiceServerFolder?>">
				<PARAM NAME = "TimeLimit"	        VALUE = "1800">
				<PARAM NAME = "BlockSize"	        VALUE = "10240">
				<PARAM NAME = "InterfaceType"		VALUE = "JS">
				<PARAM NAME = "UserServerFolder"	VALUE = "<?php echo $USERDIR?>">
				<PARAM NAME = "UserPostVariables"	VALUE = "name,country">
				<PARAM NAME = "name"			VALUE = "miha">
				<PARAM NAME = "country"			VALUE = "Ukraine">
				<PARAM NAME = "Sampling_frequency"	VALUE = "22050">
				<PARAM NAME = "Bitrate"			VALUE = "56">

                                <PARAM NAME = "backgroudColor"          value = "c0c0c0">
                                <PARAM NAME = "indicatorLevel1"         value = "4664f0">
                                <PARAM NAME = "indicatorLevel2"         value = "28c814">
                                <PARAM NAME = "indicatorLevel3"         value = "f03250">
                                <PARAM NAME = "indicatorWidth"          value = "380"> 


				
			</APPLET>
</td>
</tr>
</table>
</body>
</html>
