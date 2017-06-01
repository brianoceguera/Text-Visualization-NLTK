<?php
ini_set('display_errors', 1);

/**References: W3Schools: https://www.w3schools.com/php/php_file_upload.asp
               PHP Manual: http://php.net/manual/en/features.file-upload.post-method.php
*/

/*Uncommet to see who owns the apache process*/
//echo exec('whoami');

$uploaddir = 'uploads/';
$uploadfile = $uploaddir . basename($_FILES["userfile"]["name"]);
$uploadstatus = 0;
$fileType = pathinfo($uploadfile,PATHINFO_EXTENSION);

/*Check if user uploaded anything*/
if ($_FILES['userfile']['size'] == 0) {
    echo "You must upload a file! ";
}

/*Check if file already exists. Should the program reupload?*/
else if (file_exists($uploadfile)) {
    echo "Sorry, file already exists. ";
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
    if (move_uploaded_file($_FILES["userfile"]["tmp_name"], $uploadfile)) {
        echo "The file ". basename( $_FILES["userfile"]["name"]). " has been uploaded.";
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>
