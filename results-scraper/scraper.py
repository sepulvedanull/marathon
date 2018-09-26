import pandas as pd
import html5lib
import requests
import json

marathon2017URL = 'http://www.besttimescct.com/results/marathon-results-by-place-2017.HTML'


def parse_results():
    # use Pandas + requests to fetch our HTML table
    tables = pd.read_html(requests.get(marathon2017URL).text, header=0)

    # write the first HTML table out to a json file
    with open('./static/data/runners.json', 'w') as outfile:
        outfile.write(tables[0].to_json(orient='records'))

    return tables[0].to_json(orient='records')


parse_results()
