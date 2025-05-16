# cipher/utils.py

import numpy as np
from string import ascii_uppercase

ALPHABET = ascii_uppercase
ALPHABET_SIZE = len(ALPHABET)
CHAR_TO_INT = {ch: idx for idx, ch in enumerate(ALPHABET)}
INT_TO_CHAR = {idx: ch for idx, ch in enumerate(ALPHABET)}

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

def prepare_text(text, size):
    text = ''.join([ch.upper() for ch in text if ch.upper() in CHAR_TO_INT])
    while len(text) % size != 0:
        text += 'X'
    return text

def text_to_matrix(text, size):
    return np.array([CHAR_TO_INT[ch] for ch in text]).reshape(-1, size)

def matrix_to_text(matrix):
    return ''.join(INT_TO_CHAR[num % ALPHABET_SIZE] for num in matrix.flatten())

def encrypt(plaintext, key_matrix):
    size = key_matrix.shape[0]
    text = prepare_text(plaintext, size)
    text_matrix = text_to_matrix(text, size)
    result = np.dot(text_matrix, key_matrix) % ALPHABET_SIZE
    return matrix_to_text(result)

def decrypt(ciphertext, key_matrix):
    size = key_matrix.shape[0]
    matrix_inv = mod_inverse_matrix(key_matrix, ALPHABET_SIZE)
    if matrix_inv is None:
        return "Invalid key matrix (not invertible)"
    text_matrix = text_to_matrix(ciphertext, size)
    result = np.dot(text_matrix, matrix_inv) % ALPHABET_SIZE
    return matrix_to_text(result)
