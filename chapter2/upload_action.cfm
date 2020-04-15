<cfset CurrentDir=GetDirectoryFromPath(ExpandPath("*.*"))>
<cfoutput>#currentdir#</cfoutput>
<!--
	FILE FROM WWW.CFTUTORIALS.COM - 
	YOUR USE OF THIS FILE SIGNIFIES YOUR AGREEMENT TO BE BOUND BY THE TERMS AND CONDITIONS:
	http://www.cftutorials.com/index.cfm?mode=contentpage&element=terms_and_conditions
-->


	
<CFFILE ACTION="UPLOAD" 
		DESTINATION="#CurrentDir#"
		FILEFIELD="File1"
		NAMECONFLICT="OVERWRITE">
	


<CFOUTPUT>

The file "#FILE.ClientFile#" from "#FILE.ClientDirectory#" has been successfully uploaded.<BR><BR>

<CFIF FILE.FILEEXISTED>
	A file with the same name was already present in the server directory.<BR>
	<CFIF FILEWASOVERWRITTEN>
		<I>The original file was overwritten.</I><BR>
	<CFELSEIF FILEWASRENAMED>
		<I>The file was renamed to avoid a name conflict.</I><BR>
	<CFELSE>
		<I>ColdFusion didn't take action.</I><BR>
	</CFIF>
	<BR>
<CFELSE>
	The file was uploaded for the first time.<BR><BR>
</CFIF> 
 
Size of the uploaded file: #Numberformat(Evaluate(File.FileSize/1024))# KB.

</CFOUTPUT>	

