from itertools import islice
import pandas as pd

PATH=f"C:/Users/USER/Downloads/logs.txt"
def read_batches(file_path, batch_size=50000) :
    with open(file_path, 'r', encoding='utf-8') as file :
        batch = []
        for line in file :
            batch.append(line.strip())
            if len(batch) == batch_size :
                yield batch
                batch = []
        if batch :
            yield batch


def check_all_common(batch) :
    dict_common = {}
    for line in batch :
        line = line.replace('"', '')
        x = line.split(",")
        if len(x) > 1 :
            y = x[1].split(":")[1]
            if y not in dict_common :
                dict_common[y] = 1
            else :
                dict_common[y] += 1
    return dict_common

def connect_all(arr_dict):
    df=pd.DataFrame.from_dict(arr_dict)
    sum_df=df.sum().sort_values(ascending=False)
    print(sum_df)
    return sum_df




def check_N_common(path,N):
    arr_dict = []
    for batch in read_batches(path) :
        arr_dict.append(check_all_common(batch))
    sum_common_err=connect_all(arr_dict)
    return sum_common_err.head(N)


print(check_N_common(PATH,3))

#O(M) סיבוכיות זמן
#סיבוכיות מקום O(N)