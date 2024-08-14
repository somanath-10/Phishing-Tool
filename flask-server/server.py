from flask import Flask, jsonify, request, render_template
import numpy as np
import pandas as pd
from sklearn import metrics 
import warnings
import pickle
import json
from flask_cors import CORS, cross_origin
warnings.filterwarnings('ignore')

from utils.features import FeatureExtraction

file = open("phishing/model.pkl","rb")
gbc = pickle.load(file)
file.close()


app = Flask(__name__)

CORS(app, support_credentials=True)

@app.route("/testurl", methods=["POST"])
@cross_origin(supports_credentials=True)
def testUrl():
    url = request.get_json().get('url')
    print(url)
    obj = FeatureExtraction(url)
    x = np.array(obj.getFeaturesList()).reshape(1,30) 

    y_pred = gbc.predict(x)[0]
    print(y_pred)
    y_pro_phishing = gbc.predict_proba(x)[0,0]
    y_pro_non_phishing = gbc.predict_proba(x)[0,1]
    # if(y_pred):
    #     message = "It is {0:.2f} % safe to go ".format(y_pro_phishing*100)  
    # else
    #     message = "It is {0:.2f} % Unsafe to go ".format(y_pro_non_phishing*100)  
  
      
    return {
        "safe_per": y_pro_phishing,
        "unsafe_per": round(y_pro_non_phishing,2),
        "url": url
    }








@app.route("/stats")
def stats():
    file = open("phishing/result.pkl","rb")
    stats = pickle.load(file)
    file.close()

    print(stats.get('ML Model'))
    
    return {
        "headers": (stats.columns.values).tolist(),
        "rows": json.loads(stats.to_json(orient='records'))
        }

def index():
    if request.method == "POST":

        url = request.form["url"]
        #1 is safe       
        #-1 is unsafe
        # if(y_pred ==1):
        pred = "It is {0:.2f} % safe to go ".format(y_pro_phishing*100)
        return render_template('index.html',xx =round(y_pro_non_phishing,2),url=url)
    return render_template("index.html", xx =-1)


if __name__ == "__main__":
    app.run(debug=True)