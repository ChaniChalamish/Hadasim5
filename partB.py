import pandas as pd

people_df = pd.DataFrame([
    {"Person_Id" : 1, "Personal_Name" : "Avraham", "Family_Name" : "Levi", "Gender" : "Male", "Father_Id" : None,"Mother_Id" : None, "Spouse_Id" : 2},
    {"Person_Id" : 2, "Personal_Name" : "Sara", "Family_Name" : "Levi", "Gender" : "Female", "Father_Id" : None,
     "Mother_Id" : None, "Spouse_Id" : None},
    {"Person_Id" : 3, "Personal_Name" : "Chaim", "Family_Name" : "Levi", "Gender" : "Male", "Father_Id" : 1,
     "Mother_Id" : 2, "Spouse_Id" : None},
    {"Person_Id" : 4, "Personal_Name" : "Lea", "Family_Name" : "Levi", "Gender" : "Female", "Father_Id" : 1,
     "Mother_Id" : 2, "Spouse_Id" : None},
    {"Person_Id" : 5, "Personal_Name" : "Yossef", "Family_Name" : "Chen", "Gender" : "Male", "Father_Id" : None,
     "Mother_Id" : None, "Spouse_Id" : 4},
])


def family_tree(people):
    relatives = []
    for _, person in people.iterrows():
        person_id = person["Person_Id"]
        kids_connection="Daughter" if person["Gender"] == "Female" else "Son"
        # קשר עם אבא
        if pd.notna(person["Father_Id"]):
            father_id = int(person["Father_Id"])
            relatives.extend([
                {"Person_Id": person_id, "Relative_Id": father_id, "Connection_Type": "Father"},
                {"Person_Id": father_id, "Relative_Id": person_id, "Connection_Type":kids_connection }
            ])

        # קשר עם אמא
        if pd.notna(person["Mother_Id"]):
            mother_id = int(person["Mother_Id"])
            relatives.extend([
                {"Person_Id": person_id, "Relative_Id": mother_id, "Connection_Type": "Mother"},
                {"Person_Id": mother_id, "Relative_Id": person_id, "Connection_Type": kids_connection}
            ])

        # קשר זוגיות
        if pd.notna(person["Spouse_Id"]):
            spouse_id = int(person["Spouse_Id"])
            relatives.extend([
                {"Person_Id": person_id, "Relative_Id": spouse_id, "Connection_Type": "בת זוג" if person["Gender"] == "Female" else "בן זוג"},
                {"Person_Id": spouse_id, "Relative_Id": person_id, "Connection_Type": "בן זוג" if person["Gender"] == "Female" else "בת זוג"}
            ])

    # קשרי אחים
    with_parents = people.dropna(subset=["Father_Id", "Mother_Id"])
    siblings = with_parents.merge(
        with_parents,
        on=["Father_Id", "Mother_Id"],
        suffixes=("_1", "_2")
    )

    # בדיקה שזה לא אותו אחד בעצמו
    siblings = siblings[siblings["Person_Id_1"] != siblings["Person_Id_2"]]
    # הוספת קשרי אחים
    for _, row in siblings.iterrows():
        connection = "אח" if row["Gender_2"] == "זכר" else "אחות"
        relatives.append({
            "Person_Id": row["Person_Id_1"],
            "Relative_Id": row["Person_Id_2"],
            "Connection_Type": connection
        })

    relatives_df = pd.DataFrame(relatives)
    relatives_df = relatives_df[["Person_Id", "Relative_Id", "Connection_Type"]]
    return relatives_df

def spouse_completion(people,relations):
    # שלב 1 – טבלת השלמות
    spouse_links = relations[relations["Connection_Type"].isin(["בן זוג", "בת זוג"])][["Person_Id", "Relative_Id"]]
    # שלב 3 – מיזוג עם הטבלה המקורית
    people_completed = pd.merge(people, spouse_links, on="Person_Id", how="left")
    # שלב 4 – אם אין לבנאדם בן זוג, נשתמש בזה שמופיע בהשלמה
    people_completed["Spouse_Id"] = people_completed["Spouse_Id"].combine_first(people_completed["Relative_Id"])
    people_completed.drop(labels="Relative_Id",axis=1,inplace=True)


relative=family_tree(people_df)
print(relative)
spouse_completion(people_df,relative)
