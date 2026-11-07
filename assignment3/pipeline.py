"""Simple data processing pipeline: load -> clean -> add_features -> save."""

from pathlib import Path

import pandas as pd

HERE = Path(__file__).parent
INPUT_FILE = HERE / "students_messy.csv"
OUTPUT_FILE = HERE / "students_clean.csv"

# Ages written as words in the raw data
WORD_TO_NUMBER = {
    "eighteen": 18,
    "nineteen": 19,
    "twenty": 20,
    "twenty one": 21,
    "twenty two": 22,
    "twenty three": 23,
    "twenty four": 24,
    "twenty five": 25,
}


def load(path=INPUT_FILE):
    """Load the raw student data from a CSV file."""
    return pd.read_csv(path)


def clean(df):
    """Return a cleaned copy of the student data."""
    df = df.copy()

    # 1. Trim extra spaces from text columns
    for col in ["name", "city"]:
        df[col] = df[col].str.strip()

    # 2. Same spelling for every city (karachi / KARACHI -> Karachi)
    df["city"] = df["city"].str.title()

    # 3. Turn ages written as words into numbers ("twenty" -> 20)
    df["age"] = df["age"].astype(str).str.strip().str.lower().replace(WORD_TO_NUMBER)
    df["age"] = pd.to_numeric(df["age"], errors="coerce")

    # 4. Drop rows that have no name
    df = df.dropna(subset=["name"])
    df = df[df["name"] != ""]

    # 5. Remove duplicate rows
    df = df.drop_duplicates()

    # 6. Fill missing scores with the median score
    df["score"] = df["score"].fillna(df["score"].median())

    df["age"] = df["age"].astype(int)
    return df.reset_index(drop=True)


def grade(score):
    """Turn a score into a letter grade."""
    if score >= 85:
        return "A"
    if score >= 70:
        return "B"
    if score >= 50:
        return "C"
    return "F"


def add_features(df):
    """Add new columns: passed (score >= 50) and grade (A/B/C/F)."""
    df = df.copy()
    df["passed"] = df["score"] >= 50
    df["grade"] = df["score"].apply(grade)
    return df


def run_pipeline(input_path=INPUT_FILE, output_path=OUTPUT_FILE):
    raw = load(input_path)
    print(f"Loaded {len(raw)} rows from {Path(input_path).name}")
    print(raw.to_string(), "\n")

    cleaned = clean(raw)
    print(f"After clean(): {len(cleaned)} rows")

    final = add_features(cleaned)
    final.to_csv(output_path, index=False)
    print(final.to_string(), "\n")
    print(f"Saved {len(final)} rows to {Path(output_path).name}")
    return final


if __name__ == "__main__":
    run_pipeline()
