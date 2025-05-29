# cipher/views.py

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import numpy as np
from .utils import encrypt, decrypt

@csrf_exempt
def cipher_view(request):
    if request.method == 'POST':
        try:
            # Log the raw request for debugging
            logger.info(f"Request body: {request.body}")
            logger.info(f"Content type: {request.content_type}")
            
            data = json.loads(request.body)
            logger.info(f"Parsed data: {data}")
            
            matrix_data = data.get('matrix')
            input_text = data.get('text', '')
            mode = data.get('mode', 'encrypt')
            alphabet_type = data.get('alphabet', 'A0_26')
            
            logger.info(f"Matrix data: {matrix_data}")
            logger.info(f"Text: {input_text}")
            logger.info(f"Mode: {mode}")
            logger.info(f"Alphabet: {alphabet_type}")
            
        except json.JSONDecodeError as e:
            logger.error(f"JSON decode error: {e}")
            return JsonResponse({'error': f'Invalid JSON: {str(e)}'}, status=400)
        except Exception as e:
            logger.error(f"Request parsing error: {e}")
            return JsonResponse({'error': f'Request error: {str(e)}'}, status=400)

        try:
            matrix = np.array(matrix_data, dtype=int)
            if matrix.shape[0] != matrix.shape[1]:
                return JsonResponse({'error': 'Key matrix must be square'}, status=400)
        except Exception as e:
            logger.error(f"Matrix error: {e}")
            return JsonResponse({'error': f'Invalid matrix: {str(e)}'}, status=400)

        try:
            if mode == 'encrypt':
                result = encrypt(input_text, matrix, alphabet_type)
            elif mode == 'decrypt':
                result = decrypt(input_text, matrix, alphabet_type)
            else:
                return JsonResponse({'error': 'Invalid mode'}, status=400)
            
            return JsonResponse({'result': result})
            
        except Exception as e:
            logger.error(f"Cipher operation error: {e}")
            return JsonResponse({'error': f'Cipher error: {str(e)}'}, status=400)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)
