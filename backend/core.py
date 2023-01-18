import openai

openai.api_key = "<add API key>"


def generate_summary(text: str):
    prompt = f"Explain the following text in simple language: {text}"
    response = openai.Completion.create(engine="text-davinci-002", prompt=prompt)
    return response["choices"][0]["text"]
