# cse6242-spring2019-team99-project


## Task Leaders
| Lead                                   | Midterm Deliverables                                                                                                                                                                             | Final Deliverables                                                                                                                            |
|----------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| Abhishek - model development           | V1 topic model output (can be a subset the final dataset) for other team members to use as template                                                                                              | Build incremental learning pipelineWord vectorizationLDA training                                                                             |
| Ian - model validation                 | Reusable framework for topic model evaluation                                                                                                                                                    | Research, select, and learn about a topic model benchmarking toolApprove and provide write up about selection methodology of best topic model |
| Travis - visualization logistics / EDA | Script for formatting the model output and raw dataset for use in the final visualizationExploratory Data Analysis findings - recommendations for the final D3 visualization and/or bug checking | Pinch hitterFinal poster lead                                                                                                                 |
| Shae - final visualization             | Visualization fully conceptualizedStart D3 visualization with dummy data                                                                                                                         | The big visualization!                                                                                                                        |
| Kevin - final paper                    | Pinch hitterOutlined final paper, literature review completely done                                                                                                                              | Pinch hitterFinal paper lead (editing / LaTex / formatting)                                                                                   

## database/chatdb tables

### chats
* **chat_id**: (ADDED BY KEVIN) Unique integer autoincrement for each row, because message_id doesn't seem to be actually unique across rooms... I also added a sqlite index on this
* **room_id**: Unique Room ID of the room
* **room_uri**: Room URI of the room
* **sent_at**: The timestamp of message sent at
* **from_userid**: Unique gitter ID of the user
* **from_username**: Unique username of the user
* **message_id**: Unique message id of the message
* **text**: The raw text of the message

### lemmas
* **chat_id**: unique index
* **lemma**: lemmatized text with stop words removed

### words
* **word_id**: unique index
* **word**: the word text
* **freq**: the frequency that the word appears in our dataset

### topic_keywords
* **topic_id**: unique index
* **word**: the word text
* **prob**: the probability that the word appears the topic

### topic_labels
* **chat_id**: the chat unique index
* **topic_id**: the highest probability topic_id
* **prob**: the probability that the string is in the topic

## Acknowledgements

[This tutorial](https://www.machinelearningplus.com/nlp/topic-modeling-gensim-python/) was heavily influential on our preprocessing pipeline and LDA modeling work.