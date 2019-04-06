import pandas as pd

data = pd.read_csv("../../../../model_development/final_dominant_topic_text_df.txt", sep="\t")
data = data.dropna()

# split data into topics and index them by timestamp
topics = data.Chat_Topic.unique()
df_dict = {topic: pd.DataFrame() for topic in topics}
for key in df_dict.keys():
    df_dict[key] = data[:][data.Chat_Topic == key]
    df_dict[key].index = pd.to_datetime(df_dict[key]["sent_at"]).rename("id")
    df_dict[key].sort_index()

# for total metrics
dates = pd.to_datetime(data["sent_at"])
data.index = dates
data = data.sort_index()
data.index = data.index.rename("id")

dfs_ts = []
dfs_cm = []

# Resample, aggregate, rename columns, concatenate dataframes and finally write to file
def aggregate_and_write(resample_size, title):
    dataframes_ts = []
    dataframes_cm = []
    dfs_ts_current = []     # per timestep
    dfs_cm_current = []    # cumulative
    for key in df_dict.keys():
        message_user_counts = df_dict[key].resample(resample_size).agg({"from_userid": "nunique", "sent_at": "count"})
        message_user_counts = message_user_counts.rename(index=str, columns={"from_userid": "users_" + str(int(key)),
                                                                             "sent_at": "messages_" + str(int(key))})
        message_user_counts_cm = message_user_counts.agg({"users_" + str(int(key)): "cumsum",
                                                          "messages_" + str(int(key)): "cumsum"})
        dataframes_ts.append(message_user_counts)
        dataframes_cm.append(message_user_counts_cm)
        dfs_ts_current.append(message_user_counts)
        dfs_cm_current.append(message_user_counts_cm)

    dfs_ts.append(dfs_ts_current)
    dfs_cm.append(dfs_cm_current)
    total_counts = data.resample(resample_size).agg({"from_userid": "nunique", "sent_at": "count"})
    total_counts = total_counts.rename(index=str, columns={"from_userid": "users_total", "sent_at": "messages_total"})

    result_ts = total_counts
    result_cm = total_counts

    for df in dataframes_ts:
        result_ts = pd.concat([result_ts, df], axis=1, sort=False)

    for df in dataframes_cm:
        result_cm = pd.concat([result_cm, df], axis=1, sort=False)

    result_cm.to_csv(title + "_cm.txt", sep="\t")
    result_ts.to_csv(title + ".txt", sep="\t")


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



