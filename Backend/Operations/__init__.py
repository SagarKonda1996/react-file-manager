from bson.objectid import ObjectId

def findall(dbname, collection, data={}):
    collection_name = dbname[collection]
    status = collection_name.find(data)
    return [d for d in status]


def insert(dbname, collection, data={}):
    collection_name = dbname[collection]
    try:
        id = collection_name.insert_one(data).inserted_id
        return True
    except :
        return False
def findandUpdate(dbname,collection,find_id,data={}):
    collection_name=dbname[collection]
    try:
        collection_name.update_one({"_id":ObjectId(find_id)},{'$set':data})
        return True
    except:
        return False

def deleteOne(dbname,collection,find_id):
    collection_name=dbname[collection]
    try:
        collection_name.delete_one({"_id":ObjectId(find_id)})
        collection_name.delete_many({"parent":find_id})
        collection_name.delete_many({"path.path":find_id})
        return True
    except:
        return False

def deleteMany(dbname,collection,data):
    collection_name=dbname[collection]
    try:
        collection_name.delete_many(data)
        return True
    except:
        return False


