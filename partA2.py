import os

import pandas as pd


def read_input_file(path) :
    if path.endswith('.csv') :
        df = pd.read_csv(path)
    elif path.endswith('.parquet') :
        df = pd.read_parquet(path, engine='fastparquet')
    return df


def cleaning_data(df) :
    """ ניקוי הDataFrame """
    # print(df.head())
    # print(df.describe())
    # print(df.info())
    df.drop_duplicates(inplace=True)
    df['timestamp'] = pd.to_datetime(df['timestamp'], errors="coerce", dayfirst=False)
    df['value'] = pd.to_numeric(df['value'], errors='coerce').astype(float)
    df.dropna(inplace=True)
    return df


def time_avg(df) :
    """

    :param df: DataFrame
    :return: a resample of df according hour with  mean of value
    """
    df_resampled = df.resample('h', on='timestamp').value.mean().reset_index()
    return df_resampled


def split_to_files(df) :
    all_files_path = []
    df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce', dayfirst=False)
    for t, group in df.groupby([pd.Grouper(key='timestamp', freq='d')]) :
        file_path = os.path.join(os.getcwd(), "/date_{}.csv".format(str(t[0]).split(" ")[0]))
        all_files_path.append(file_path)
        group.to_csv(file_path, index=False)
    return all_files_path


def process_all_files(files_path) :
    combined_df = pd.DataFrame()
    for csv_file in files_path :
        clean_df = cleaning_data(csv_file)
        df_avg = time_avg(clean_df)
        combined_df = pd.concat([combined_df, df_avg])
    combined_df.to_csv(os.path.join(os.getcwd(), '/time_series_avg.csv'), index=False)


if __name__ == "__main__" :
    PATH1 = "C:/Users/USER/Downloads/time_series.csv"
    PATH ="C:/Users/USER/Downloads/time_series.parquet"
    my_df = read_input_file(PATH)
    print(my_df)
    result = cleaning_data(my_df)
    print(result)
    res_df = time_avg(result)
    print(res_df)


    #my_files_path = split_to_files(my_df)
    #process_all_files(my_files_path)
