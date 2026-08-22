from dotenv import load_dotenv
from anthropic import Anthropic

load_dotenv()  # reads your .env file

client = Anthropic()  # automatically picks up ANTHROPIC_API_KEY

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=200,
    messages=[
        {"role": "user", "content": "Say hello and tell me one fun fact about AI."}
    ]
)

print(response.content[0].text)