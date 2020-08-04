import Operations
import json
from bson.objectid import ObjectId
import datetime
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

def createqueryarray(data,field):
    result=[]
    for d in data:
        result.append({field:{'$elemMatch':d}})
    return result
def get_modified_documents(data,update_path):
    updated_data=[]
    for d in data:
        temp_path=d['path']
        d['path']=update_path+temp_path[len(update_path):]
        updated_data.append(d)
    return updated_data
def read(request, db):
    request_data = {
        'parent': ''
    }
    try:
        search_data = request.args.get('folder')
        if(search_data != None):
            request_data['parent'] = search_data
    except:
        ""
    data = Operations.findall(db, collection, request_data)
    current_folder_path = [{'path': '', 'name': 'root'}]
    if(request_data['parent'] != ''):
        metadata = Operations.findall(
            db, collection, {"_id": ObjectId(request_data['parent'])})
        pathdata = metadata[0]['path']
        current_folder_path = pathdata
        current_folder_path.append(
            {'name': metadata[0]['name'], 'path': request_data['parent']})
    return json.dumps({'doc_data': data, 'metadata': current_folder_path}, default=str), 200, headers


def create(request, db):
    try:
        request_json = request.get_json()
        request_json['last_modified']=datetime.datetime.now().isoformat()
        status = Operations.insert(db, collection, request_json)
        return json.dumps({'status': status}, default=str), 200, headers
    except:
        return "Invalid JSON"


def update(request, db):
    try:
        request_json = request.get_json()
        id = request_json['_id']
        source_path=request_json['source_path']
        updated_path=request_json['path']
        # parent=request_json['parent']
        
        del request_json['_id']
        del request_json['source_path']
        request_json['last_modified']=datetime.datetime.now().isoformat()
        
        query_array=createqueryarray(source_path,'path')
        result=Operations.findall(db,collection,{'$and':query_array})
        documents_modification_required=[d for d in result if len(d['path'])>len(source_path)]
        modified_documents=get_modified_documents(documents_modification_required,updated_path)
        sub_documents_update_status=True
        for data in modified_documents:
            try:
                Operations.findandUpdate(db,collection,data['_id'],{'path':data['path']})
            except:
                sub_documents_update_status=False
        try:
            root_document_update_status=Operations.findandUpdate(db, collection, id, request_json)
        except:
            root_document_update_status=False
        # data=Operations.findall(db,collection,{"path":{"$elemMatch":{"path":id}}})
        # for doc in data:
        #     new_path=request_path
        #     doc_path=doc['path']
        #     new_path=new_path+doc_path[len(request_path):]
        #     doc['path']=new_path
        #     Operations.findandUpdate(db,collection,doc['_id'],doc)
        status = sub_documents_update_status and root_document_update_status
        return json.dumps({'status': status}, default=str), 200, headers
    except:
        return "Invalid JSON"


def delete(request, db):
    try:
        document_id = request.args.get('docid')
        status = Operations.deleteOne(db, collection, document_id)
        return json.dumps({'status': status}, default=str), 200, headers
    except:
        return "Invalid JSON"


def FileExplorer(request, db):
    actions = {
        'GET': read,
        'POST': create,
        'PUT': update,
        'DELETE': delete
    }
    try:
        function = actions[request.method]
        return function(request, db)
    except:
        return "error"
