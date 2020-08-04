import Operations
import json
import re
with open('config/config.json') as f:
    config = json.loads(f.read())
mybucket = config['bucket']
headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '3600',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json'
    }

collection = config['collection_name']

def read(request,db):
    try:
        search_data = request.args.get('document_name')
        search_data=search_data
        search_string='^'+search_data+'$'
        data=Operations.findall(db,collection,{'name':{'$regex': search_data,'$options':'i'}})
        return json.dumps({'doc_data':data}, default=str), 200, headers
    except:
        return json.dumps({'status':'error'}, default=str), 400, headers

def Search(request, db):
    actions = {
        'GET': read
    }
    try:
        function= actions[request.method]
        return function(request,db)
    except:
        return "error"
