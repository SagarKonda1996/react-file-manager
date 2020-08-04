# pylint: disable=W0611
import datetime
import uuid
import json
from google.cloud import storage
import os.path
config = {}
with open('config/config.json') as f:
    config = json.loads(f.read())
mybucket = config['bucket']
collection = config['collection_name']
CLIENT = storage.Client.from_service_account_json('config/credentials.json')
bucket = CLIENT.bucket(mybucket)
headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '3600',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json'
    }
def BlobUrlGenerator(request,db):
    if(request.method=='PUT'):
        return generate(request)
    if(request.method=='GET'):
        return generate(request)
    return json.dumps({'status':'method not found'}),400,headers
    
def generate(request):
    try:
        timestamp=request.args.get("request_time")
        request_time=datetime.datetime.strptime(timestamp, '%Y-%m-%dT%H:%M:%S.%fZ')
        filename=request.args.get("file_name")
        if(request.method=='PUT'):
            fileprefix=os.path.splitext(filename)[0]
            try:
                fileext=os.path.splitext(filename)[1]
                filename=fileprefix+'_'+str(uuid.uuid4().hex)+fileext
            except:
                filename=fileprefix+'_'+str(uuid.uuid4().hex)
        expiration=request_time+datetime.timedelta(minutes=59)
        blob = bucket.blob(filename) # name of file to be saved/uploaded to storage
        file_url = blob.generate_signed_url(
        version='v4',
        expiration=expiration,
        method=request.method
        )
        return json.dumps({'url':file_url,'file_id':filename}),200,headers
    except:
        return 'Unauthorized Request'
