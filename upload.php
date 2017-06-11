<?php
ini_set('display_errors', 1);
/**References: W3Schools: https://www.w3schools.com/php/php_file_upload.asp
               PHP Manual: http://php.net/manual/en/features.file-upload.post-method.php
*/

/*Uncommet to see who owns the apache process*/
//echo exec('whoami');

/*Specify relative upload dir and filename extension*/
$uploaddir = 'uploads/';
$extension = '.txt';

/**Do not accept user's filename, rename the file with a safe, unique name
   The second parameter specifies the filename prefix
*/
$tempfilepath = tempnam($uploaddir, 'txt-');
unlink($tempfilepath);

/*Ready the path to save the file*/
$pathtofile = $tempfilepath . $extension;
$uploadstatus = 0;
$fileType = pathinfo($_FILES['userfile']['name'],PATHINFO_EXTENSION);

/*Check if user uploaded anything*/
if ($_FILES['userfile']['size'] == 0) {
    echo "You must upload a file! ";
}

/*Allow only .txt formats*/
else if ($fileType != "txt") {
    echo "Sorry, only text files are allowed. ";
}

/*Make sure file is not over 8MB in size*/
else if ($_FILES['userfile']['size'] > 8000000) {
    echo "Maximum file size exceeded. ";
}

else {
    $uploadstatus = 1;
}

/*Before uploading, verify error checks passed.*/
if ($uploadstatus == 0) {
    echo "Sorry, your file was not uploaded. ";

/*Attempt file upload*/
} else {
    if (move_uploaded_file($_FILES['userfile']['tmp_name'], $pathtofile)) {
        echo 'The file was uploaded as ' . $pathtofile . '<br/>';

	/*File uploaded, now run nltk script*/
	$command = escapeshellcmd('./python-parser.py ' . $pathtofile);
	$result = shell_exec($command);
        echo $result . '<br/>';
	//var_dump($result);
        
	/*Want to return nltk results as a JSON format to javscript*/

    } else {
        echo 'Sorry, there was an error uploading your file.';
    }
}
?>
