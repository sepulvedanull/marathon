import pandas as pd
import requests
# import json
# import html5lib


def parse_2017_results():

    marathon_tables = pd.read_html('http://www.besttimescct.com/results/marathon-results-by-place-2017.HTML', header=0)
    half_marathon_tables = pd.read_html('http://www.besttimescct.com/results/half-marathon-results-by-place-2017.HTML', header=0)
    tenk_run_tables = pd.read_html('http://www.besttimescct.com/results/10K-results-by-place-2017.HTML', header=0)
    fivek_run_tables = pd.read_html('http://www.besttimescct.com/results/5K-results-by-place-2017.HTML', header=0)

    marathon_data = pd.concat(marathon_tables[0:len(marathon_tables)])
    half_marathon_data = pd.concat(half_marathon_tables[0:len(half_marathon_tables)])
    tenk_data = pd.concat(tenk_run_tables[0:len(tenk_run_tables)])
    fivek_data = pd.concat(fivek_run_tables[0:len(fivek_run_tables)])

    with open('./data/2017/marathon.json', 'w') as outfile:
        outfile.write(marathon_data.to_json(orient='records'))

    with open('./data/2017/half-marathon.json', 'w') as outfile:
        outfile.write(half_marathon_data.to_json(orient='records'))

    with open('./data/2017/10k-run.json', 'w') as outfile:
        outfile.write(tenk_data.to_json(orient='records'))

    with open('./data/2017/5k-run.json', 'w') as outfile:
        outfile.write(fivek_data.to_json(orient='records'))

    return


parse_2017_results()
