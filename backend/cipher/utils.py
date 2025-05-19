# cipher/utils.py

import numpy as np
from string import ascii_uppercase

# ALPHABET = ascii_uppercase
# ALPHABET_SIZE = len(ALPHABET)
# CHAR_TO_INT = {ch: idx for idx, ch in enumerate(ALPHABET)}
# INT_TO_CHAR = {idx: ch for idx, ch in enumerate(ALPHABET)}

def get_alphabet_mapping(alphabet_type):
    if alphabet_type == 'A0_26':  # A=0, B=1, ..., Z=25
        alphabet = ascii_uppercase
        return {ch: i for i, ch in enumerate(alphabet)}, {i: ch for i, ch in enumerate(alphabet)}
    elif alphabet_type == 'A1_26':  # A=1, B=2, ..., Z=26
        alphabet = ascii_uppercase
        return {ch: i + 1 for i, ch in enumerate(alphabet)}, {i + 1: ch for i, ch in enumerate(alphabet)}
    elif alphabet_type == 'A0_27':  # A=0, B=1, ..., Z=25, space=26 (27 characters)
        alphabet = ascii_uppercase + ' '
        return {ch: i for i, ch in enumerate(alphabet)}, {i: ch for i, ch in enumerate(alphabet)}
    elif alphabet_type == 'A1_27':  # A=1, B=2, ..., Z=26, space=27 (27 characters)
        alphabet = ascii_uppercase + ' '
        return {ch: i + 1 for i, ch in enumerate(alphabet)}, {i + 1: ch for i, ch in enumerate(alphabet)}
    else:
        raise ValueError("Unsupported alphabet type")

def mod_inverse_matrix(matrix, modulus):
    try:
        det = int(round(np.linalg.det(matrix)))
        det_inv = pow(det % modulus, -1, modulus)
        matrix_mod_inv = (
            det_inv * np.round(det * np.linalg.inv(matrix)).astype(int) % modulus
        )
        return matrix_mod_inv.astype(int)
    except Exception:
        return None

def prepare_text(text, size, alphabet_type='A0_26'):
    char_to_int, _ = get_alphabet_mapping(alphabet_type)
    text = ''.join([ch.upper() for ch in text if ch.upper() in char_to_int])
    while len(text) % size != 0:
        text += 'X'
    return text

def text_to_matrix(text, size, alphabet_type='A0_26'):
    char_to_int, _ = get_alphabet_mapping(alphabet_type)
    return np.array([char_to_int[ch] for ch in text]).reshape(-1, size)

def matrix_to_text(matrix, alphabet_type='A0_26'):
    char_to_int, int_to_char = get_alphabet_mapping(alphabet_type)
    return ''.join(int_to_char[num % len(char_to_int)] for num in matrix.flatten())

def encrypt(plaintext, key_matrix, alphabet_type='A0_26'):
    char_to_int, _ = get_alphabet_mapping(alphabet_type)
    size = key_matrix.shape[0]
    text = prepare_text(plaintext, size, alphabet_type)
    text_matrix = text_to_matrix(text, size, alphabet_type)
    result = np.dot(text_matrix, key_matrix) % len(char_to_int)
    return matrix_to_text(result, alphabet_type)

def decrypt(ciphertext, key_matrix, alphabet_type='A0_26'):
    char_to_int, _ = get_alphabet_mapping(alphabet_type)
    size = key_matrix.shape[0]

    matrix_inv = mod_inverse_matrix(key_matrix, len(char_to_int))
    if matrix_inv is None:
        return "Invalid key matrix (not invertible)"
    
    text_matrix = text_to_matrix(ciphertext, size, alphabet_type)
    result = np.dot(text_matrix, matrix_inv) % len(char_to_int)
    return matrix_to_text(result, alphabet_type)
