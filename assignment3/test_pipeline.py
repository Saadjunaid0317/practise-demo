import pandas as pd

from pipeline import clean


def test_clean():
    messy = pd.DataFrame(
        {
            "name": ["Ali", "Omar", "Omar", None, "Sara"],
            "city": ["Karachi", "KARACHI ", "KARACHI ", "Lahore", " lahore"],
            "age": ["21", "twenty", "twenty", "23", "22"],
            "score": [80.0, None, None, 66.0, 60.0],
        }
    )

    result = clean(messy)

    # Duplicate Omar row and the row with no name are removed
    assert result["name"].tolist() == ["Ali", "Omar", "Sara"]
    # City names are trimmed and use the same capitals
    assert result["city"].tolist() == ["Karachi", "Karachi", "Lahore"]
    # Word ages become numbers
    assert result["age"].tolist() == [21, 20, 22]
    # Missing score is filled with the median (of 80 and 60)
    assert result["score"].isna().sum() == 0
    assert result.loc[1, "score"] == 70.0
