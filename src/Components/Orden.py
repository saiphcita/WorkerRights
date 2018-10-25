import pandas as pd
import csv
import json


# convertir de XLSX a CSV
# df = pd.read_excel('first100.xlsx', sheet_name='Hoja1')  # sheetname is optional
# df.to_csv('output', index=False)  # index=False prevents pandas to write row index


# Pansadolo a JSON
data = []
with open('output', encoding="utf8") as f:
    for row in csv.DictReader(f):
        data.append(row)

for (line) in data:
    if line["DESC_TIPO_PROCED_EJECUCION"] == "":
        line["DESC_TIPO_PROCED_EJECUCION"] = "vacio"
    
    if line["MONTO_TOTAL"] != "0.0":
        monto = line["MONTO_TOTAL"]
    elif line["MONTO_COMPROMETIDO"] != "0.0":
        monto = line["MONTO_COMPROMETIDO"]
    elif line["MONTO_DEVENGADO"] != "0.0":
        monto = line["MONTO_DEVENGADO"]
    elif line["MONTO_EJERCIDO"] != "0.0":
        monto = line["MONTO_EJERCIDO"]
    elif line["MONTO_PAGADO"] != "0.0":
        monto = line["MONTO_PAGADO"]

    line["MONTO_TOTAL"] = int(float(monto))

jsonList = []

for (line) in data:
    newline = {
        "type": line["DESC_TIPO_PROCED_EJECUCION"],
        "name": line["DESC_CONTRATO"],
        "size": line["MONTO_TOTAL"]
    }
    jsonList.append(newline)


FILEJSON = {
    "name": "flare",
    "children": []
}

jsonChildrens = []

for (line) in jsonList:
    jsonChildrens.append(line["type"])

jsonChildrens = list(set(jsonChildrens))

jsonDicts = []

for (line) in jsonChildrens:
    if line != 'vacio' and line != 'No aplica':
        jsonDicts.append({"name": line, "children": []})

for (line) in jsonList:
    for name in jsonDicts:
        if name["name"] == line["type"]:
            name["children"].append({"name":line["name"] ,"size":line["size"]})

FILEJSON["children"] = jsonDicts
            
json_data = json.dumps(FILEJSON, indent=4)

with open('file.json', 'w') as outfile:
   outfile.write(json_data)