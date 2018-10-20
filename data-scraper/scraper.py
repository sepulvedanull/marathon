import pandas as pd
import requests
# import json
# import html5lib


def parse_2017_results():
    marathon2017Events = [
        'http://www.besttimescct.com/results/marathon-results-by-place-2017.HTML',
        'http://www.besttimescct.com/results/half-marathon-results-by-place-2017.HTML',
        'http://www.besttimescct.com/results/10K-results-by-place-2017.HTML',
        'http://www.besttimescct.com/results/5K-results-by-place-2017.HTML'
    ]

    fivek_tables = pd.read_html(marathon2017Events[3], header=0)
    fivek_table = pd.concat(fivek_tables[0:83])

    with open('./data/fivek.json', 'w') as outfile:
        outfile.write(fivek_table.to_json(orient='records'))

    return


parse_2017_results()
