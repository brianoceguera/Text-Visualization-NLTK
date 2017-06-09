#!/usr/bin/python3

from sys import argv
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize

#Store the filename provided by the php script
filename_str = argv[1]

stop_words = stopwords.words('english')

#Load file for reading. Equivalent to a try-finally block
#Input: file | Output: string
def read_file(filename):
    with open(filename, 'rU') as infile:
        rawtext = infile.read()
    return rawtext

#Tokenize text by sentences and then by words
#Input: string | Output: list
def tokenize_txt(text):
    tokens_list = [word.lower() for sent in sent_tokenize(text) for word in word_tokenize(sent)]
    filtered_tokens = []
    for token in tokens_list:
        #Only keep alphanumeric characters that are not in NLTK's English stop words
        if token.isalnum() and token not in stop_words:
            filtered_tokens.append(token)
    return filtered_tokens

rawtxt = read_file(filename_str)
print(tokenize_txt(rawtxt))

# frequency distribution of words
# remove punctuation and articles (numeric, symbols)
# word count
# output data to json format, (maybe csv?) for d3 to read
