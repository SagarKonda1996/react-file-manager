import BlobUrl
import FileExplorer
import Search
from pymongo import MongoClient
import Cron
import json
with open('config/config.json') as f:
    config = json.loads(f.read())
headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '3600',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods':'*'
    }
mongourl = config['mongourl']

client = MongoClient(mongourl)
db = client.file_manager


def FileAPI(request):
    if(request.method == 'OPTIONS'):
        return '', 204, headers
    return FileExplorer.FileExplorer(request, db)


def BlobAPI(request):
    if(request.method == 'OPTIONS'):
        return '', 204, headers
    return BlobUrl.BlobUrlGenerator(request, db)


def SearchAPI(request):
    if(request.method == 'OPTIONS'):
        return '', 204, headers
    return Search.Search(request, db)


def CronJobAPI(request):
    if(request.method == 'OPTIONS'):
        return '', 204, headers
    return Cron.cron(request, db)


def API(request):
    if(request.method == 'OPTIONS'):
        return '', 204, headers
    routepaths = {
        "/file": FileExplorer.FileExplorer,
        "/blob": BlobUrl.BlobUrlGenerator,
        '/search': Search.Search,
        '/cron': Cron.cron
    }
    route = routepaths.get(request.path, None)
    if(route != None):
        return route(request, db)
    else:
        return ('You Hit an Invalid URL', 404, headers)
