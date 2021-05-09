import argparse
import os
import requests


parser = argparse.ArgumentParser(description="Add guidelines to project")

parser.add_argument(
    "--guidelines",
    type=str,
    help="Guidelines with the project",
    default="None",
)
parser.add_argument(
    "--username",
    type=str,
    help="Username to which this data will be assigned for annotation",
    default="admin",
)
parser.add_argument("--host", type=str, help="Host of service", default="localhost")
parser.add_argument("--port", type=int, help="Port to make request to", default=80)

args = parser.parse_args()

api_key = os.getenv("API_KEY", None)
headers = {"Authorization": api_key}

values = {
    "username": args.username,
    "guidelines": args.guidelines,
}

print("Adding Guidelines", values)
response = requests.post(
    f"http://{args.host}:{args.port}/api/guidelines",
    data=values,
    headers=headers,
)

if response.status_code == 201:
    response_json = response.json()
    print(f"Message: {response_json['message']}")
else:
    print(f"Error Code: {response.status_code}")
    print(f"Message: {response.text}")
