import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score


def train_models(X_train, X_test, y_train, y_test):

    print("\nEntrenando modelos...")

    modelos = {
        "LogisticRegression": LogisticRegression(max_iter=2000),
        "DecisionTree": DecisionTreeClassifier(),
        "RandomForest": RandomForestClassifier()
    }

    #  BLINDAJE: asegurar solo datos numéricos
    X_train = X_train.apply(pd.to_numeric, errors="coerce")
    X_test = X_test.apply(pd.to_numeric, errors="coerce")

    X_train = X_train.fillna(0)
    X_test = X_test.fillna(0)

    resultados = {}

    for nombre, modelo in modelos.items():
        print(f"→ Entrenando {nombre}...")
        modelo.fit(X_train, y_train)

        pred = modelo.predict(X_test)
        acc = accuracy_score(y_test, pred)
        resultados[nombre] = acc

        print(f"✔ {nombre} completado. Accuracy: {acc:.4f}")

    print("\n=== RESULTADOS DE LOS MODELOS ===")
    for nombre, acc in resultados.items():
        print(f"{nombre}: {acc:.4f}")

    return modelos, resultados
