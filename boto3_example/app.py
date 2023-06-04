from flask import Flask
import json 
import requests
import boto3
from dotenv import dotenv_values
from botocore.exceptions import ClientError

app = Flask(__name__)
config = dotenv_values(".env")
config

client = boto3.client('s3', aws_access_key_id=config['AWS_ACCESS_KEY_ID'], aws_secret_access_key=config['AWS_SECRET_ACCESS_KEY'],
                      region_name=config['REGION_NAME'])

# Definimos el nombre del bucket
bucket_name = 'testbucketitc'

file_name = "data_file.csv"
file_path = f"data/{file_name}"

object_key = "data_file.csv"

# Create y Update
@app.route('/create', methods = ["GET", "POST"])
def create():
    data = ""
    try: 
        with open(file_path, 'rb') as file:
            try:
                client.put_object(
                    # ACL='public-read',
                    Body=file,
                    Bucket=bucket_name,
                    Key=file_name
                )
                data = "Se creo el objeto con exito!"
            except ClientError as e:
                errorCode = e.response['Error']['Code']
                errorMessage = e.response['Error']['Message']
                data = "Ocurrio el error: " + errorCode + ", " + errorMessage
   
    except Exception as e:
        data = "Ocurrio el error: " + str(e)
    return json.dumps(data)

# Delete
@app.route('/delete')
def delete():
    object_key = "data_file.csv"
    data = ""
    try:
        client.delete_object(Bucket  = bucket_name, Key = object_key)
        data = "Se borro el objeto del bucket con exito!"
    except ClientError as e:
        errorCode = e.response['Error']['Code']
        errorMessage = e.response['Error']['Message']
        data = "Ocurrio el error: " + errorCode + ", " + errorMessage
    except Exception as e:
        data = "Ocurrio el error: " + str(e)
    
    return json.dumps(data)

# Delete
@app.route('/read')
def read():
    data = ""
    try:
        client.download_file(bucket_name, object_key, file_path)
        data = "Se trajo el objeto del bucket con exito"
    except ClientError as e:
        errorCode = e.response['Error']['Code']
        errorMessage = e.response['Error']['Message']
        data = "Ocurrio el error: " + errorCode + ", " + errorMessage
    except Exception as e:
        data = "Ocurrio el error: " + str(e)
    
    return json.dumps(data)

@app.route('/')
def index():
    return 'Hello World!'


@app.route("/get_data")
def getdata():
    data = {
        'key1' : 'value 1',
        'key2' : 'value 2'
    }
    return json.dumps(data)

@app.route("/rick")
def rick():
    resp = requests.get('https://rickandmortyapi.com/api/character')

    return resp.json()


app.run(host='0.0.0.0', port=3000)