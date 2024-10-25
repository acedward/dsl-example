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
    # Generate a poem with numbers
    numbers = [random.randint(1, 100) for _ in range(10)]  # Generate 10 random numbers
    poem = " ".join(map(str, numbers))  # Create a poem-like string using the numbers

    # Print the generated poem
    print("Generated Poem of Numbers:")
    print(poem)

    # Check which numbers are magical
    magical_results = []
    for number in numbers:
        result = isMagical(number)
        magical_results.append({
            'number': number,
            'isMagical': result['isMagical'],
            'message': result['message']
        })

    # Print the magical results
    print("\nMagical Numbers:")
    for entry in magical_results:
        print(f"Number: {entry['number']}, Is Magical: {entry['isMagical']}, Message: {entry['message']}")

if __name__ == "__main__":
    main()
