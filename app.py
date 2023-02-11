from flask import Flask, render_template
import pandas as pd

app = Flask(__name__, template_folder='templates')

df = pd.read_excel("up_gdsc_iobm.xlsx")
df.set_index("std_id", inplace=True)

@app.route("/")
def index():
    
    

    return render_template("index.html")

@app.route("/jsondata/<id>", methods=["GET", "POST"])
def getData(id):
    try:
        print("Home page")
        # print("data df:", df)
        print("id: " + id)
        print('type of data', type(id))
        # int_id = int(id)
        # print("Int_id", int_id)
        # print("type int id : " , type(int_id))
        print("kucch to ho1")
        std_data = df.loc[id]
        print("kucch to ho")
        print("data std: " , std_data)
    except:
        std_data = pd.Series({ "Error" : f"ID: {id} not found"})
    return std_data.to_json()

if __name__ == '__main__':
    app.run(debug=True)