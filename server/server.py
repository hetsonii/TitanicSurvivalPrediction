import joblib
import pandas as pd
from flask import Flask, jsonify, request, abort
import json

app = Flask(__name__)


class TitanicPrediction:

    def __init__(self):
        self.Pclass = None
        self.Sex = None
        self.Age = None
        self.SibSp = None
        self.Parch = None
        self.Fare = None
        self.Embarked_C = None
        self.Embarked_Q = None
        self.Embarked_S = None

    def post(self):
        data = request.get_json()
        self.Pclass = data["Pclass"]
        self.Sex = data["Sex"]
        self.Age = data["Age"]
        self.SibSp = data["SibSp"]
        self.Parch = data["Parch"]
        self.Fare = data["Fare"]
        self.Embarked_C = data["Embarked_C"]
        self.Embarked_Q = data["Embarked_Q"]
        self.Embarked_S = data["Embarked_S"]

        KNN = joblib.load("TitanicSurvivalPrediction/TitanicKNNmodel.pkl")
        
        PredictorColumns = [
            "Pclass",
            "Age",
            "SibSp",
            "Parch",
            "Fare",
            "Sex_female",
            "Sex_male",
            "Embarked_C",
            "Embarked_Q",
            "Embarked_S",
        ]

        new_passenger = {
            "Pclass": self.Pclass,
            "Sex": self.Sex,
            "Age": self.Age,
            "SibSp": self.SibSp,
            "Parch": self.Parch,
            "Fare": self.Fare,
            "Embarked_C": self.Embarked_C,
            "Embarked_Q": self.Embarked_Q,
            "Embarked_S": self.Embarked_S,
        }
        print(new_passenger)

        # Create a DataFrame for the new passenger using the input values
        new_passenger_df = pd.DataFrame([new_passenger])

        # Perform one-hot encoding on the new passenger DataFrame
        new_passenger_encoded = pd.get_dummies(new_passenger_df)

        # Ensure that the new passenger DataFrame has the same columns as the training data
        new_passenger_encoded = new_passenger_encoded.reindex(
            columns=PredictorColumns, fill_value=0
        )
        print(new_passenger_encoded)

        # Make the prediction for the new passenger
        prediction = KNN.predict(new_passenger_encoded)

        return str(prediction[0])


@app.route("/TitanicPredictionKNN", methods=["POST"])
def TitanicPredictionFunc():
    TitanicPredict = TitanicPrediction()  # Create an instance of TitanicPrediction
    return TitanicPredict.post()

if __name__ == "__main__":
    app.run(debug=True)