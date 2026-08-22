"""
Personal Agent - v2 (running on Google's free Gemini API)
A command-line AI agent that can chat AND take real actions.
Right now it can save notes for you. More tools can be added later.
"""

from dotenv import load_dotenv
from google import genai
from google.genai import types
from datetime import datetime
import os

load_dotenv()
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])


# ---- The actual Python function behind the "save_note" tool ----
def save_note(note: str) -> str:
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    with open("notes.txt", "a", encoding="utf-8") as f:
        f.write(f"[{timestamp}] {note}\n")
    return f"Saved note: '{note}'"


# ---- Describe the tool so Gemini knows it exists and when to use it ----
save_note_tool = {
    "name": "save_note",
    "description": "Save a short note or reminder to a local notes file for the user.",
    "parameters": {
        "type": "object",
        "properties": {
            "note": {
                "type": "string",
                "description": "The text of the note to save."
            }
        },
        "required": ["note"]
    }
}

tools = types.Tool(function_declarations=[save_note_tool])
config = types.GenerateContentConfig(tools=[tools])

# ---- Keep track of the conversation so the agent has memory during this session ----
conversation = []

print("Your personal agent is ready (running on Gemini). Type 'quit' to exit.\n")

while True:
    user_input = input("You: ")
    if user_input.lower() in ["quit", "exit"]:
        print("Agent: Goodbye!")
        break

    conversation.append(types.Content(role="user", parts=[types.Part(text=user_input)]))

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=conversation,
        config=config
    )

    candidate = response.candidates[0]
    final_text = ""

    for part in candidate.content.parts:
        if part.function_call:
            fn = part.function_call
            if fn.name == "save_note":
                result = save_note(fn.args["note"])
            else:
                result = "Unknown tool."

            # Add the model's function call to the conversation
            conversation.append(candidate.content)

            # Send the tool's result back so Gemini can respond naturally
            conversation.append(
                types.Content(
                    role="user",
                    parts=[types.Part(
                        function_response=types.FunctionResponse(
                            name=fn.name,
                            response={"result": result}
                        )
                    )]
                )
            )

            follow_up = client.models.generate_content(
                model="gemini-3.6-flash",
                contents=conversation,
                config=config
            )
            final_text = follow_up.candidates[0].content.parts[0].text
            conversation.append(follow_up.candidates[0].content)

        elif part.text:
            final_text += part.text

    if not any(part.function_call for part in candidate.content.parts):
        conversation.append(candidate.content)

    print(f"Agent: {final_text}\n")