import pandas as pd
import pandas as pd

# Load the messy dataset
df = pd.read_csv("students_messy.csv")

print ("missing values in each column")
print(df.isnull().sum())  

print ("Count total duplicate rows")
print(df.duplicated().sum())  

print("Check unique values/spellings in the 'city' column[cite: 22]")
print(df["city"].unique())  

print(df.dtypes)

df = df.drop_duplicates()
df = df.dropna(subset=["name"])
df["score"] = df["score"].fillna(df["score"].median())
df["city"] = df["city"].str.strip().str.title()
df["age"] = pd.to_numeric(df["age"], errors="coerce")
print(df.shape, df["city"].unique().tolist())
# Change print(df.head()) to this:
print(df.head().to_string())
df.shape