import pandas as pd
import numpy as np
import os
import joblib
import matplotlib.pyplot as plotObject
from sklearn.model_selection import train_test_split
from sklearn import datasets, metrics
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import accuracy_score


TitanicSurvivalData = pd.read_csv("TitanicTrain.csv")
# print(TitanicSurvivalData.head())

DeleteCols = ["Name", "Ticket", "Cabin", "PassengerId"]
TitanicSurvivalData = TitanicSurvivalData.drop(DeleteCols, axis=1)

columnsForAnalysis = [
    "Survived",
    "Pclass",
    "Sex",
    "Age",
    "SibSp",
    "Parch",
    "Fare",
    "Embarked",
]


# # ----------------
# # Plotting scatter plot for every variable vs every other variable
# pd.plotting.scatter_matrix(TitanicSurvivalData[columnsForAnalysis], figsize=(15,10), marker='.')

# # Saving the plot in the current working directory
# plotObject.savefig('TitanicSurvivalDataScatterplot.png')
# print(f'The plot has been saved at dir: {os.getcwd()}')
# # ----------------


# # Checking missing values for each column
# print(TitanicSurvivalData.isnull().sum())

TitanicSurvivalData = TitanicSurvivalData.dropna(axis=0, how="all")
TitanicSurvivalData = TitanicSurvivalData.dropna(axis=1, how="all")

# print(TitanicSurvivalData.isnull().sum())

# # Interpolating the missing values of age using all the present values
TitanicSurvivalData["Age"] = TitanicSurvivalData["Age"].interpolate()
# print(TitanicSurvivalData.isnull().sum())

# # Creating one hot encoding for categorical columns

TitanicSurvivalData = pd.get_dummies(TitanicSurvivalData)
TitanicSurvivalData.head()

# # Split training and testing datasets

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
TargetColumn = "Survived"

x = TitanicSurvivalData[PredictorColumns].values
y = TitanicSurvivalData[TargetColumn].values

X_train, X_test, Y_train, Y_test = train_test_split(
    x, y, test_size=0.3, random_state=10
)


# # KNN
clf = KNeighborsClassifier(n_neighbors=5)
print(clf)

KNN = clf.fit(X_train, Y_train)
prediction = KNN.predict(X_test)

print(metrics.classification_report(Y_test, prediction))
print(metrics.confusion_matrix(Y_test, prediction))

print(f"{accuracy_score(Y_test, prediction)*100}%")

# # Exporting the model using joblib
joblib.dump(KNN, "TitanicKNNmodel.pkl")


### Prediction with provided data

# # Enter your own values for prediction
# new_passenger = {
#     'Pclass': 3,
#     'Sex': 'female',
#     'Age': 30,
#     'SibSp': 0,
#     'Parch': 0,
#     'Fare': 10000,
#     'Embarked_C': 0,
#     'Embarked_Q': 0,
#     'Embarked_S': 1
# }

# # Create a DataFrame for the new passenger using the input values
# new_passenger_df = pd.DataFrame([new_passenger])
# # Perform one-hot encoding on the new passenger DataFrame
# new_passenger_encoded = pd.get_dummies(new_passenger_df)
# # Ensure that the new passenger DataFrame has the same columns as the training data
# new_passenger_encoded = new_passenger_encoded.reindex(columns=PredictorColumns, fill_value=0)
# # Make the prediction for the new passenger
# prediction = KNN.predict(new_passenger_encoded)

# # Display the prediction
# if prediction[0] == 0:
#     print("The passenger is predicted not to survive.")
# else:
#     print("The passenger is predicted to survive.")
