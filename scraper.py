import pandas as pd
import html5lib
import requests
import json

# use Pandas + requests to fetch our HTML table
tables = pd.read_html(requests.get('http://www.besttimescct.com/results/marathon-results-by-place-2017.HTML').text, header=0)

# write the first HTML table out to a json file
with open('runners.json', 'w') as outfile:
    outfile.write(tables[0].to_json(orient='records'))
