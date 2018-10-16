import csv
import requests

with open('./data/sanef_toll.csv', 'rb') as csvfile:
    spamreader = csv.reader(csvfile, delimiter=',')
    unique_tolls = []
    unique_tolls_price = []
    binary_tolls = []
    binary_tolls_price = []
    for row in spamreader:
        toll_id, name = row
        r = requests.get('https://www.sanef.com/sanef/bo/cms/peages/tarifs_peage?gare_sortie={}&gare_entree={}'.format(toll_id, toll_id))
        data = r.json()
        if data:
            unique_tolls.append(toll_id)
            price = data[0]["TARIF_TTC"]
            unique_tolls_price.append((toll_id, price))
            print (toll_id, price)
        else:
            binary_tolls.append(toll_id)
    n = len(binary_tolls)
    for i in range(0, n-1):
        for j in range(i+1, n):
            toll_1 = binary_tolls[i]
            toll_2 = binary_tolls[j]
            r = requests.get('https://www.sanef.com/sanef/bo/cms/peages/tarifs_peage?gare_sortie={}&gare_entree={}'.format(toll_1, toll_2))
            data = r.json()
            if data:
                price = data[0]["TARIF_TTC"]
                binary_tolls_price.append((toll_1, toll_2, price))
                print (toll_1, toll_2, price)
            # else:
            #     print "NONE", toll_1, toll_2
