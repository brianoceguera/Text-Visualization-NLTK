# Text-Visualization-NLTK

## About
A web application that allows clients to upload a .txt file, and then visualizes the most frequent words using the Natural Language Tool Kit library and D3.js library. A word cloud is drawn on the web page without the need to refresh/reload.

## How does it work?
When a user uploads a .txt file, the Javascript program sends this information to the server by making a POST request to a PHP script. The PHP script then validates this file before storing it in the Uploads directory. After the file is stored, the PHP script executes a Python program which reads in the uploaded text file and returns the top 100 most frequently used words encoded as a JSON string. When Javascript receives this JSON string, the D3 library is used to make a word cloud. Larger words in the cloud were used more frequently in the text.

The order of execution is:
1. User uploads file
2. Javascript calls PHP script
3. PHP stores file and calls Python script
4. Python analyzes file and returns JSON string to PHP
5. PHP passes JSON string to Javascript
6. D3 is called to visualize the information
7. User sees a pretty picture

## FAQ
1. You may need to edit the variable `upload_max_filesize` in your php.ini file to allow larger filesize uploads.
2. Make sure the apache process can run the python script. ```chmod +x python-script.py```
3. Don't have access to a server? You can still run the python code without server access. All you need to do is specify the path to the text file in the call to the script. The script will return the 100 most frequently used words in the text, along with their counts. You can then visualize this information with a Python library like matplotlib.

## Future Directions
* Allow uploading multiple files.
* Make the word cloud more mobile friendly.
* Use machine learning (maybe scikit-learn in Python) to try and predict the genre or theme of a text.

## Final Project Details
This application was made as a final project for a computing course. The following is a write-up comparing the languages used in this application to C++.

### What are some differences between C++ and these languages?
* While C++ is not garbage collected, the languages (Javascript, Python, PHP) used in this application all implement some form of garbarge collection.
* Whereas C++ is an imperative language, Python is a declarative language. Python code tends to be more human readable, since lower-level details of code execution are not emphasized. For example, iterators and counter variables do not appear in a Python `for` loop.
* In C++, variables have an explicit type. For example, an integer variable can only integers. However in Javascript, PHP, and Python, variables are containers that can change type as new objects are assigned to them.
  * In PHP, variables are prefixed with the dollar sign (`$`).
  * In Javascript, variables are prefixed with the keyword `var`
  * In Python, variables are not prefixed with anything. One only needs to provide the variable name.
* C++ allows the use of pointers, raw or otherwise. Javascript, PHP, Python do not support pointer usage.
* Python does not use semicolons (`;`) or curly braces (`{ }`) to indicate the end of a line/block of execution. Instead, the syntax relies heavily on indentation.
* These languages are high level languages, unlike C++.
    

### What are some similarities between C++ and these languages?
* Transitioning to Javascript and PHP from C++ is smooth since these languages have a very similar syntax to C++.
* PHP supports passing objects by reference.
* All support user defined functions.
* These languages are all object oriented in some way.

### Bringing it all together
The Javascript file `index.js` makes use of:
* Lambda/Anonymous functions
* Asynchronous computing (AJAX)
* Try/catch
* Event Handling
* Global/local variables

The Python file `nltk-parser.py` makes use of:
* For loops
* Associative arrays (dictionaries)
* Argument vector or command line arguments
* Function definitions 

The PHP file `upload.php` makes use of:
* Form handling
* Associative arrays
* Running another program synchronously (the python script)
