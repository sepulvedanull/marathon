import pandas as pd
import requests
import glob
# import json
# import html5lib


def parse_2017_results():

    # marathon_tables = pd.read_html('http://www.besttimescct.com/results/marathon-results-by-place-2017.HTML', header=0)
    half_marathon_tables = pd.read_html('http://www.besttimescct.com/results/half-marathon-results-by-place-2017.HTML', header=0)
    # tenk_run_tables = pd.read_html('http://www.besttimescct.com/results/10K-results-by-place-2017.HTML', header=0)
    # fivek_run_tables = pd.read_html('http://www.besttimescct.com/results/5K-results-by-place-2017.HTML', header=0)

    # marathon_data = pd.concat(marathon_tables[0:len(marathon_tables)])
    half_marathon_data = pd.concat(half_marathon_tables[0:len(half_marathon_tables)])
    # tenk_data = pd.concat(tenk_run_tables[0:len(tenk_run_tables)])
    # fivek_data = pd.concat(fivek_run_tables[0:len(fivek_run_tables)])

    # with open('./data/2017/marathon.json', 'w') as outfile:
      #  outfile.write(marathon_data.to_json(orient='records'))

    with open('./data/2017/half-marathon.json', 'w') as outfile:
         outfile.write(half_marathon_data.to_json(orient='records'))
    #
    # with open('./data/2017/10k-run.json', 'w') as outfile:
    #     outfile.write(tenk_data.to_json(orient='records'))
    #
    # with open('./data/2017/5k-run.json', 'w') as outfile:
    #     outfile.write(fivek_data.to_json(orient='records'))

    return

def parse_txt_results():
    # loadFile = 'https://www.stjude.org/content/dam/en_US/shared/www/fundraising-programs/memphis-marathon-weekend/results/2014/marathon-results-by-place-2014.txt'
    # loadFile = './data/marathon-results-by-place-2014.txt'

    years = [2014,2012,2011,2010,2009,2008,2007,2006,2005,2004,2003]
    colNames = ["Place", "First Name", "Last Name", "Age", "Sex/plc", "Sex", "Time", "Pace", "City", "St", "Bib No"]
    colNames2008 = ["Place", "First Name", "Last Name", "Age", "Sex/plc", "Sex", "Time", "Pace", "City", "St"]
    # data = pd.read_fwf(loadFile, error_bad_lines=False)

    for x in years:
        files = glob.glob("./clean/" + str(x) + "/*.txt")
        if x > 2008:
            useCols = colNames
        else:
            useCols = colNames2008

        for name in files:
            if "half-marathon" in name:
                outfileName = "half_marathon"
            elif "5k" in name:
                outfileName = "5k"
            else:
                outfileName = "marathon"

            data = pd.read_fwf(name, error_bad_lines=False, names=useCols, header=None)
            json = data.to_json(orient='records')

            with open("./data/" + str(x) + "/" + str(outfileName) + ".json", 'w') as outfile:
                 outfile.write(json)

        # print(useCols)



    # print(data)
    # json = data.to_json(orient='records')
    # print(json)
    # data = pd.concat(tables[0:len(tables)])
    #
    # with open('./data/2014/marathon.json', 'w') as outfile:
    #      outfile.write(data.to_json(orient='records'))

    return


# parse_2017_results()
parse_txt_results()
