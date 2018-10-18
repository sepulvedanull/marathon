import pandas as pd
import html5lib
import requests
import json


def parse_2017_results():
    marathon2017Events = [
        'http://www.besttimescct.com/results/marathon-results-by-place-2017.HTML',
        'http://www.besttimescct.com/results/half-marathon-results-by-place-2017.HTML',
        'http://www.besttimescct.com/results/10K-results-by-place-2017.HTML',
        'http://www.besttimescct.com/results/5K-results-by-place-2017.HTML'
    ]

    marathon_table = pd.read_html(requests.get(marathon2017Events[0]).text, header=0)
    halfmarathon_table = pd.read_html(requests.get(marathon2017Events[1]).text, header=0)
    tenk_table = pd.read_html(requests.get(marathon2017Events[2]).text, header=0)
    fivek_table = pd.read_html(requests.get(marathon2017Events[3]).text, header=0)

    print(marathon_table)

    

    # write the first HTML table out to a json file
    # with open('./marathon2017.json', 'w') as outfile:
    #     outfile.write(marathon_table[0].to_json(orient='records'))


parse_2017_results()
