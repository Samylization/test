import csv, json
import pandas as pd
from geojson import Feature, FeatureCollection, Point, MultiPoint
import sys
import time,os

features = []

def convertGeoJson(fileName):
    vessel = pd.read_csv("./csv/"+fileName)
    points = []
    for _,val in vessel.iterrows():
        latitude, longitude = map(float, (val['latitude'], val['longitude']))
        points.append((latitude,longitude))
    features.append(
        Feature(
            geometry = MultiPoint(points),
            properties = {
                'id': vessel['id'][0],
                'name': vessel['vessel_name'][0]
            }
        )
    )
    collection = FeatureCollection(features)
    with open(os.path.join("json",str(time.time())+fileName.replace('csv','json')), "w") as f:
        f.write(str(collection))



fileName = sys.argv[1]
print("in python")
sys.stdout.flush()
convertGeoJson(fileName)