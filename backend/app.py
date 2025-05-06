from flask import Flask, request, jsonify
from flask_cors import CORS
from hill_cipher_core import encrypt, decrypt

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5175"}})


@app.route('/encrypt', methods=['POST'])
def api_encrypt():
    data = request.get_json()
    plaintext = data['plaintext']
    print(plaintext)
    matrix = [[int(x) for x in data['matrix'][0:2]],
              [int(x) for x in data['matrix'][2:4]]]
    alphabet_option = data.get('alphabet', 'A0_26')

    try:
        result = encrypt(plaintext, matrix, alphabet_option)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/decrypt', methods=['POST'])
def api_decrypt():
    data = request.get_json()
    ciphertext = data['ciphertext']
    matrix = [[int(x) for x in data['matrix'][0:2]],
              [int(x) for x in data['matrix'][2:4]]]
    alphabet_option = data.get('alphabet', 'A0_26')

    try:
        result = decrypt(ciphertext, matrix, alphabet_option)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 400
    
@app.route('/hello', methods = ['GET'])
def helloworld():
    return jsonify({'message':'Hello'})

if __name__ == '__main__':
    app.run(debug=True)
