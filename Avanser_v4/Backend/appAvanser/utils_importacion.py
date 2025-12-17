import csv
import io

def leer_csv(file):
    """
    Lee CSV y retorna lista de dicts.
    Acepta utf-8 y latin-1.
    """
    try:
        content = file.read().decode("utf-8-sig")
    except UnicodeDecodeError:
        content = file.read().decode("latin-1")

    reader = csv.DictReader(io.StringIO(content))
    return list(reader), reader.fieldnames or []
