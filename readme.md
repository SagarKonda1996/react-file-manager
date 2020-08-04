Configuration

Step 1:
Create a service account and get credentials.json and replace the contents credentials.json file in folder Backend/config/credentials.json

refer following video

https://drive.google.com/file/d/14y9wnESgYxN-C7CZnyYg-ary77NtLoj1/view?usp=sharing


Step 2: 
Create Cloud Bucket and with Permissions 

refer following video

https://drive.google.com/file/d/1owlm-0KwoNOdhnbp4v3BQB_B3BAOcSRR/view?usp=sharing

Step 3: 
update the following field values in File Backend/config/config.json

bucket -> bucket name you created in previous step
mongourl-> url of your mongodb
collection->collection name in mongodb

step 4:
create virtual environment in Folder Backend using command
python -m venv env

step 5:
open command prompt and navigate to Backend Folder
execute following commands to install dependencies on Command prompt
1. env\Script\activate
2. pip install -r requirements.txt

step 6:
Open Command prompt and navigate to UI Folder
execute Following Command to install dependencies
1. npm install

Starting Project
Step 1:
Start Front End

open Command Prompt and navigate to UI folder
execute following command
1. npm start

Step 2:
Start Backend

Open Command Prompt and navigate to Backend Folder
excecute following commands
1. env\Scripts\activate
2. python api.py

