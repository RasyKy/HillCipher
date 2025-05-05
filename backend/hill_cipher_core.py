import numpy as np
from text_converter import text_to_numbers, numbers_to_text, get_alphabet

def mod_inv_matrix(matrix, modulus):
    det = int(round(np.linalg.det(matrix)))
    det_inv = pow(det % modulus, -1, modulus)
    matrix_mod_inv = (
        det_inv * np.round(det * np.linalg.inv(matrix)).astype(int) % modulus
    )
    return matrix_mod_inv

def pad_text_numbers(numbers, size):
    while len(numbers) % size != 0:
        numbers.append(0)
    return numbers

def encrypt(plaintext, matrix, alphabet_option):
    alphabet = get_alphabet(alphabet_option)
    modulus = len(alphabet)

    nums = text_to_numbers(plaintext, alphabet)
    nums = pad_text_numbers(nums, len(matrix))

    matrix = np.array(matrix)
    result = []

    for i in range(0, len(nums), len(matrix)):
        block = np.array(nums[i:i + len(matrix)])
        encrypted_block = matrix.dot(block) % modulus
        result.extend(encrypted_block)

    return numbers_to_text(result, alphabet)

def decrypt(ciphertext, matrix, alphabet_option):
    alphabet = get_alphabet(alphabet_option)
    modulus = len(alphabet)

    nums = text_to_numbers(ciphertext, alphabet)
    matrix = np.array(matrix)
    matrix_inv = mod_inv_matrix(matrix, modulus)

    result = []

    for i in range(0, len(nums), len(matrix)):
        block = np.array(nums[i:i + len(matrix)])
        decrypted_block = matrix_inv.dot(block) % modulus
        result.extend(decrypted_block.astype(int))

    return numbers_to_text(result, alphabet)
