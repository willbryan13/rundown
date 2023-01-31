import boto3
import json
import pg8000
import os

ENDPOINT = os.environ["DB_ENDPOINT"]
DBNAME = "postgres"
PORT = "5432"
USR = "rundown_v1"


def lambda_handler(event, context, *args, **kwargs):
    client = boto3.client("lambda")

    input_text = event["input"]
    complexity = event["complexity"]
    condense = event["condense"]
    summary = event["summary"]

    # process the input text
    processed_text = process_text(input_text, complexity, condense, summary)
    conn = pg8000.connect(
        host=ENDPOINT,
        port=PORT,
        database=DBNAME,
        user=USR,
        password=os.environ["DB_PASSWORD"],
    )
    cur = conn.cursor()
    insert = "INSERT INTO analytics_input_text (processed_text) VALUES (%s)"

    cur.execute(insert, (processed_text,))

    # Return processed text
    return {"statusCode": 200, "body": json.dumps({"processedText": processed_text})}


def process_text(input_text, complexity, condense, summary, *args, **kwargs):

    processed_text = input_text

    if summary:
        for i in processed_text:
            if i == "a":
                i = "b"
    if condense:
        processed_text = processed_text[5:]

    return processed_text
