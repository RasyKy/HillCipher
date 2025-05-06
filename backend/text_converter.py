# text_converter.py

def get_alphabet(option):
    if option == "A0_26":
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    elif option == "A1_26":
        return "ZABCDEFGHIJKLMNOPQRSTUVWXY"
    elif option == "A0_27":
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ_"
    elif option == "A1_27":
        return "_ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    else:
        raise ValueError("Invalid alphabet option")

def text_to_numbers(text, alphabet):
    return [alphabet.index(c) for c in text.upper() if c in alphabet]

def numbers_to_text(numbers, alphabet):
    return ''.join(alphabet[n % len(alphabet)] for n in numbers)
