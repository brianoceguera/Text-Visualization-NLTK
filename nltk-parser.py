#!/usr/bin/python3

import json
from sys import argv
from collections import OrderedDict
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize
from nltk.probability import FreqDist

#Store the filename provided by the php script
filename_str = argv[1]

stop_words = stopwords.words('english')
boring_words = ["said", "would", "one", "could", "like", "went", "got"]
num_samples = 20

#Load file for reading. Equivalent to a try-finally block
#Input: file | Output: string
def read_file(filename):
    with open(filename, 'rU', encoding='utf-8') as infile:
        rawtext = infile.read()
    return rawtext

#Tokenize text by sentences and then by words
#Input: string | Output: list
def tokenize_txt(text):
    tokens_list = [word.lower() for sent in sent_tokenize(text) for word in word_tokenize(sent)]
    filtered_tokens = []
    for token in tokens_list:
        #Only keep alphanumeric characters that are not in NLTK's English stop words
        if token.isalnum() and token not in stop_words and token not in boring_words:
            filtered_tokens.append(token)
    return filtered_tokens

rawtxt = read_file(filename_str)
tokens = tokenize_txt(rawtxt)

#Uncomment to see all tokens
#print(tokens)

#frequency distribution of words
fdist = FreqDist(tokens)
most_common = fdist.most_common(num_samples)

#num of all tokens
token_count = ["tokens_count",len(tokens)]
most_common.append(token_count)

# output data to json format
json_string = json.dumps(OrderedDict(most_common))
print(json_string)
