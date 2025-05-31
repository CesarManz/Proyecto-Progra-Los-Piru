from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return 'Servidor funcionando con DeepSeek'

@app.route('/api/generate', methods=['POST'])
def generate():
    data = request.get_json()
    prompt = data.get('prompt', '')
    print(f"Recibido prompt: {prompt}")

    if not prompt:
        return jsonify({'response': "No se recibió un 'prompt' válido."})

    # Llamada a la API de DeepSeek local (Ollama)
    deepseek_response = requests.post(
      #127.0.0.1 = Direccion IP Local
      #11434 = Puerto/HOST que usa OLLAMA por defecto
        'http://127.0.0.1:11434/api/generate',
        json={
            "model": "tinyllama",
            "prompt": prompt,
            "stream": False
        }
    )

    # Si hubo error en la petición
    if deepseek_response.status_code != 200:
        return jsonify({'response': 'Error al comunicarse con el modelo DeepSeek.'})

    result = deepseek_response.json()
    print(f"Respuesta de DeepSeek: {result.get('response', '')}")

    return jsonify({'response': result.get('response', '')})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
