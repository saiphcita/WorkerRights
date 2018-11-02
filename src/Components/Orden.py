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
    if line["DESC_PP_EJECUCION"] == "":
        line["DESC_PP_EJECUCION"] = "vacio"
    
    if line["MONTO_TOTAL"] != "0.0":
        monto = line["MONTO_TOTAL"]
    elif line["MONTO_COMPROMETIDO"] != "0.0":
        monto = line["MONTO_COMPROMETIDO"]

    line["MONTO_TOTAL"] = int(float(monto))

jsonList = []

for idx, line in enumerate(data):
    newline = {
        "type": line["DESC_PP_EJECUCION"],
        "name": line["DESC_CONTRATO"],
        "size": line["MONTO_TOTAL"],
        "sub": line["AUTORIZADOR_COMPROMISO"],
        "index": idx+1
        }
    jsonList.append(newline)


FILEJSON = {
    "name": "flare",
    "children": []
}

# categories
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
            name["children"].append({"name":line["name"] ,"size": line["size"], "index": str(line["index"]), "sub": line["sub"] })




for name in jsonDicts:

    # listando las subcategorias
    childrensName = []
    childrens = name["children"]
    for (line) in childrens:
        childrensName.append(line["name"])
    childrensName = list(set(childrensName))

    # poniendo childrens a las subcategorias
    subCats = []
    for (line) in childrensName:
        subCats.append({"name": line, "children": []})

    # agrengando los datos de las sub-subcategorias
    for (line) in name["children"]:
        for subName in subCats:
            if subName["name"] == line["name"]:
                subName["children"].append({"name":("Gasto "+line["index"]),"size":line["size"],"subtitle": "Autorizador: "+line["sub"]})

    name["children"] = subCats

FILEJSON["children"] = jsonDicts
            
json_data = json.dumps(FILEJSON, indent=4)

with open('file.json', 'w') as outfile:
   outfile.write(json_data)