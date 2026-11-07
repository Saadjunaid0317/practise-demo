class Student:
    def __init__(self, name, marks):
        self.name = name      
        self.marks = marks    

def top_scorer(students):
    best = students[0]                 
    for student in students:           
        if student.marks > best.marks:
            best = student            
    return best                        

students = [
    Student("muhammad", 72),
    Student("saad", 45),
    Student("junaid", 88),
]


print("Passed students:")
for student in students:
    if student.marks > 50:            
        print(f"  {student.name}: {student.marks}")

best = top_scorer(students)
print(f"\nTop scorer: {best.name} with {best.marks} marks")


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
print(df.head())
df.shape()