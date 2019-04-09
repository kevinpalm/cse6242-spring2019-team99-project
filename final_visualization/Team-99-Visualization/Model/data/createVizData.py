import pandas as pd
import numpy as np

# def ftime(ts):
#     result = str(ts.year) + "-" + str(ts.month) + "-" + str(ts.day) + " " + str(ts.hour) + ":" + str(ts.min) + ":" + str(ts.sec)

# Citation: https://stackoverflow.com/questions/43297853/modifying-timestamps-in-pandas-to-make-index-unique
def deduplicate(index):
    values = index.duplicated(keep=False).astype(float)
    values[values==0] = np.NaN

    missings = np.isnan(values)
    cumsum = np.cumsum(~missings)
    diff = np.diff(np.concatenate(([0.], cumsum[missings])))
    values[missings] = -diff

    # print result
    result = index + np.cumsum(values).astype('timedelta64[ns]')
    return result

# End Citation

data = pd.read_csv("../../../../model_development/final_dominant_topic_text_df.txt", sep="\t")
data = data.dropna()

# for total aggregates
dates = pd.to_datetime(data["sent_at"])
data.index = dates
data = data.sort_index()
data.index = data.index.rename("id")
index = deduplicate(data.index)
data.index = pd.to_datetime(index)

start = data.index[0]
end = data.index[-1]
start = start.replace(day = start.day - 1)
end = end.replace(day = end.day + 1)

def getIndex(i):
    return data.index.astype(str)[i].split("+")[0].split(".")[0]

def getRow(i):
    # Indexing by timestamp shouldn't be so difficult....
    return data[getIndex(i)]


# split data into topics and index them by timestamp
topics = data.Chat_Topic.unique()
df_dict = {topic: pd.DataFrame() for topic in topics}

first_row = getRow(0)

for key in df_dict.keys():
    df_dict[key] = data[:][data.Chat_Topic == key]
    # for the love of god this was difficult to figure out...
    # the numbers are going to be off by one on some figures
    # because in order to get the dates to line up for resampling
    # I had to insert the start date of the earliest message in the dataset
    # to the beginning of each topic dataframe
    # Some of the topics didn't get their first message until much later
    # which caused the alignment of the dfs to stagger upon downsampling
    # I'm sure somebody with more pandas experience would've sorted this out
    # more quickly...
    if getIndex(0) not in df_dict[key]:
        df_dict[key] = first_row.append(df_dict[key])
    index = pd.to_datetime(df_dict[key]["sent_at"]).rename("id")
    df_dict[key].index = index
    df_dict[key].sort_index()


dfs_ts = [] # all timestep dataframes
dfs_cm = [] # all cumulative dataframes

# Resample, aggregate, rename columns, concatenate dataframes and finally write to file
def aggregate_and_write(resample_size, title):
    dataframes_ts = []
    dataframes_cm = []
    global start
    global end
    sum = 0
    for key in df_dict.keys():
        message_user_counts = df_dict[key].resample(resample_size).agg({"from_userid": "nunique", "sent_at": "count"})
        message_user_counts = message_user_counts.rename(index=str, columns={"from_userid": "users_" + str(int(key)),
                                                                             "sent_at": "messages_" + str(int(key))})
        temp = df_dict[key]
        temp["not_dup"] = 1 - temp["from_userid"].duplicated()
        temp = temp.resample(resample_size).sum().cumsum()
        users_cm = temp["not_dup"]
        message_user_counts_cm = message_user_counts.agg({"messages_" + str(int(key)): "cumsum"})
        message_user_counts_cm["users_" + str(int(key))] = users_cm
        message_user_counts_cm = message_user_counts_cm.rename(index=str, columns={"users_" + str(int(key)):"users_" + str(int(key)) + "_cm",
                                                                                   "messages_" + str(int(key)): "messages_" + str(int(key)) + "_cm"})
        message_user_counts_cm = message_user_counts_cm[["users_" + str(int(key)) + "_cm", "messages_" + str(int(key)) + "_cm"]]
        dataframes_ts.append(message_user_counts)
        dataframes_cm.append(message_user_counts_cm)

    dfs_ts.append(dataframes_ts)
    dfs_cm.append(dataframes_cm)
    total_counts = data.resample(resample_size).agg({"from_userid": "nunique", "sent_at": "count"})
    total_counts = total_counts.rename(index=str, columns={"from_userid": "users_total", "sent_at": "messages_total"})

    result = total_counts

    for i in range(len(dataframes_ts)):
        result = pd.concat([result, dataframes_ts[i]], axis=1, sort=False)
        result = pd.concat([result, dataframes_cm[i]], axis=1, sort=False)

    result.to_csv(title + ".txt", sep="\t")


aggregate_and_write("W", "week")
aggregate_and_write("2W", "fortnight")
aggregate_and_write("M", "month")
aggregate_and_write("3M", "quarter")

# Compute boundary statistics to help with sizing on the visualization

cumulative_messages = data["from_userid"].count()
cumulative_users = data["from_userid"].nunique()


def compute_max(dfs):
    max_users = 0
    max_messages = 0
    for df in dfs:
        columns = df.columns
        max_u = df[columns[0]].max()
        max_m = df[columns[1]].max()
        if max_u > max_users:
            max_users = max_u
        if max_m > max_messages:
            max_messages = max_m
    return max_users, max_messages


max_u_week, max_m_week = compute_max(dfs_ts[0])
max_u_fortnight, max_m_fortnight = compute_max(dfs_ts[1])
max_u_month, max_m_month = compute_max(dfs_ts[2])
max_u_quarter, max_m_quarter = compute_max(dfs_ts[3])

max_u_week_cm, max_m_week_cm = compute_max(dfs_cm[0])
max_u_fortnight_cm, max_m_fortnight_cm = compute_max(dfs_cm[1])
max_u_month_cm, max_m_month_cm = compute_max(dfs_cm[2])
max_u_quarter_cm, max_m_quarter_cm = compute_max(dfs_cm[3])

stat_df = pd.DataFrame({"cumulative_users": [cumulative_users],
                        "cumulative_messages": [cumulative_messages],
                        "max_u_week": [max_u_week],
                        "max_m_week": [max_m_week],
                        "max_u_fortnight": [max_u_fortnight],
                        "max_m_fortnight": [max_m_fortnight],
                        "max_u_month": [max_u_month],
                        "max_m_month": [max_m_month],
                        "max_u_quarter": [max_u_quarter],
                        "max_m_quarter": [max_m_quarter],
                        "max_u_week_cm": [max_u_week_cm],
                        "max_m_week_cm": [max_m_week_cm],
                        "max_u_fortnight_cm": [max_u_fortnight_cm],
                        "max_m_fortnight_cm": [max_m_fortnight_cm],
                        "max_u_month_cm": [max_u_month_cm],
                        "max_m_month_cm": [max_m_month_cm],
                        "max_u_quarter_cm": [max_u_quarter_cm],
                        "max_m_quarter_cm": [max_m_quarter_cm]
                        })

stat_df.to_csv("stats.txt", "\t")



