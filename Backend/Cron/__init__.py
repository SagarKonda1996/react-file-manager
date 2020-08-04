import json
import Operations
from google.cloud import storage
config = {}
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
CLIENT = storage.Client.from_service_account_json('config/credentials.json')
bucket = CLIENT.bucket(mybucket)


def cron(request, db):
    blob_data = [blob.name for blob in bucket.list_blobs()]
    data = Operations.findall(db, collection, {'type': 'file'})
    dbfiles = [d['file_id'] for d in data]
    delete_files = list(set(blob_data)-set(dbfiles))
    dbdata = []
    blob_delete = []
    for d in data:
        if(d['file_id'].lower().endswith('.txt') ):
            dbdata.append(d['_id'])
            blob_delete.append(d['file_id'])
    delete_files = delete_files+blob_delete
    db_delete_status = True
    blob_delete_status = True
    try:
        for blob in bucket.list_blobs():
            if blob.name in delete_files:
                blob.delete()
    except:
        blob_delete_status = False

    try:
        db_delete_status = Operations.deleteMany(
            db, collection, {'_id': {'$in': dbdata}})
    except:
        db_delete_status = False
    return json.dumps({'dbstatus': db_delete_status, 'blob_status': blob_delete_status}, default=str), 200, headers
