####Imports
from flask import Flask, request
from flask import jsonify
from flask_restful import Api, Resource, reqparse
import json
from flask_cors import CORS
from datetime import datetime
import FileExplorer
import BlobUrl
import Search
import Cron
from pymongo import MongoClient
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
mongourl = config['mongourl']
client = MongoClient(mongourl)
db = client.file_manager
##Flask API Initialize
app = Flask(__name__)
CORS(app)
api = Api(app)
##Get Cluster Count


class FileAPI(Resource):
    def get(self):
        [data, status, headers] = FileExplorer.read(request, db)
        return json.loads(data), status, headers

    def put(self):
        [data, status, headers] = FileExplorer.update(request, db)
        return json.loads(data), status, headers

    def post(self):
        [data, status, headers] = FileExplorer.create(request, db)
        return json.loads(data), status, headers

    def delete(self):
        [data, status, headers] = FileExplorer.delete(request, db)
        return json.loads(data), status, headers


class BlobAPI(Resource):
    def get(self):
        [data, status, headers] = BlobUrl.BlobUrlGenerator(request, db)
        return json.loads(data), status, headers

    def put(self):
        [data, status, headers] = BlobUrl.BlobUrlGenerator(request, db)
        return json.loads(data), status, headers


class SearchAPI(Resource):
    def get(self):
        [data, status, headers] = Search.Search(request, db)
        return json.loads(data), status, headers


class CronJobAPI(Resource):
    def get(self):
        [data, status, headers] = Cron.cron(request, db)
        return json.loads(data), status, headers


api.add_resource(FileAPI, "/file")
api.add_resource(BlobAPI, "/blob")
api.add_resource(SearchAPI, "/search")
api.add_resource(CronJobAPI, '/cron')

if __name__ == '__main__':
    app.run(debug=True)
