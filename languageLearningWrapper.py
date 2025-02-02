from openai import OpenAI
from rich.console import Console
from rich.markdown import Markdown

console = Console()
client = OpenAI()

def language_learning_bot(prompt):
    
    
    system_prompt = """
    You are an expert French language tutor. You will:
    1. Always respond in a friendly and encouraging tone.
    2. Provide both the French response and its English translation.
    3. Correct the user's mistakes with a brief explanation of the grammar rule.
    4. Use examples to clarify concepts when possible.
    5. Keep your responses concise and easy to understand.
    6. Use Markdown to highlight key words or phrases.
    """

    
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content



console.print("[bold blue]Welcome to the Language Learning Bot![/bold blue]")
while True:
    user_input = input("You: ")
    if user_input.lower() in ["exit", "quit"]:
        console.print("[bold green]Goodbye![/bold green]")
        break
    reply = language_learning_bot(user_input)
    console.print(Markdown(reply))
