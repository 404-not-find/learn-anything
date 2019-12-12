import edgedb
import json
from tqdm import tqdm


def main():
    # Retrieve the database password
    with open(".env", "r") as f:
        content = f.readlines()
        content = [x.strip().split("=")[1] for x in content]
        pw = content[0]

    # Establish a connection to an existing database
    # named "la" as an "edgedb" user.
    conn = edgedb.connect("edgedb://edgedb@localhost/la", password=pw)

    # Grab the API schema
    with open("schema.esdl", "r") as f:
        schema = f.read()
    with conn.transaction():
        try:
            conn.execute(schema)
            conn.fetchall("COMMIT MIGRATION topics;")
        except Exception as e:
            raise (e)

    # Grab topics from JSON file
    with open("topics.json", "r") as f:
        topics = json.load(f)

    # Add topics to API
    print("Inserting topic data into API ...")
    for _ in tqdm(range(len(topics))):
        topic = topics[_]

        with conn.transaction():
            conn.execute(
                "INSERT Topic {\n"
                + '\ttitle := "'
                + topic["title"]
                + '",\n'
                + '\tkey := "'
                + topic["key"]
                + '",\n'
                + "\tmapID := {\n"
                + str(topic["mapID"])
                + "\t},\n"
                + "}"
            )
    print("Done! Inserted data for", len(topics), "topics into the API.")

    # Close the connection.
    conn.close()


if __name__ == "__main__":
    main()
