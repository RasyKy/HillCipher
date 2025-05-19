# cipher/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import numpy as np
from .utils import encrypt, decrypt

@csrf_exempt
def cipher_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        matrix_data = data.get('matrix')
        input_text = data.get('text', '')
        mode = data.get('mode', 'encrypt')  # or 'decrypt'
        alphabet_type = data.get('alphabet', 'A0_26')

        try:
            matrix = np.array(matrix_data, dtype=int)
            if matrix.shape[0] != matrix.shape[1]:
                return JsonResponse({'error': 'Key matrix must be square'}, status=400)
        except:
            return JsonResponse({'error': 'Invalid matrix'}, status=400)

        if mode == 'encrypt':
            result = encrypt(input_text, matrix, alphabet_type)
        elif mode == 'decrypt':
            result = decrypt(input_text, matrix, alphabet_type)
        else:
            result = "Invalid mode"

        return JsonResponse({'result': result})

    return JsonResponse({'error': 'Invalid request'}, status=400)
