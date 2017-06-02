#!/usr/bin/python3

import nltk
from sys import argv

#Store the filename provided by the php script
filename_str = argv[1]

#Load file for reading. Equivalent to a try-finally block
with open(filename_str, 'rU') as infile:
    rawtext = infile.read()

tokens = nltk.word_tokenize(rawtext)
print (tokens)

# frequency distribution of words
# remove punctuation and articles (numeric, symbols)
# word count
# output data to json format, (maybe csv?) for d3 to read
