import csv
import requests

with open('./data/sanef_toll.csv', 'rb') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    for row in spamreader:
        toll_id, name = row
        r = requests.get('http://geoproxy.svc.pp.par-4.h.blbl.cr/geoproxy/location/lang/fr_FR/region/FR/address/peage {}'.format(name))
        try:
            data = r.json()
        except ValueError:
            print ','.join([toll_id, name, "NONE", "NONE"])
            continue
        if not data['results']:
            print ','.join([toll_id, name, "NONE", "NONE"])
        else:
            latlong = data['results'][0]["geometry"]['location']
            print ','.join([toll_id, name, str(latlong['lat']), str(latlong['lng'])])
