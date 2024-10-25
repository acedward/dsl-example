import requests


"""
Calls the OpenAI API to generate a response based on the provided prompt.
:param content: (optional, default: 'write a haiku about ai')
:return message: 
"""
def agent(content):
    url = 'http://localhost:3000/agent'
    data = {
        "content": content,
    }
    response = requests.post(url, json=data)
    return response.json()



"""
Determines whether a given number is Magical.
:param number: (required)
:return number: 
    :return isMagical: 
    :return message: 
"""
def isMagical(number):
    url = 'http://localhost:3000/isMagical'
    data = {
        "number": number,
    }
    response = requests.post(url, json=data)
    return response.json()




import random

def main():
    # Generate a poem with numbers only
    numbers = [random.randint(0, 100) for _ in range(10)]  # 10 random numbers
    poem = ' '.join(map(str, numbers))  # Create a poem by joining numbers as strings

    print("Generated Poem (numbers only):")
    print(poem)

    # Check for magical numbers
    magical_numbers = []
    for number in numbers:
        result = isMagical(number)
        if result.get('isMagical'):
            magical_numbers.append(number)

    print("Magical Numbers:")
    print(magical_numbers)

if __name__ == "__main__":
    main()
