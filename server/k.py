from flask import Flask, request, jsonify
from matching import StoreData
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Initialize storage as None
storage = None

@app.route('/store_mentor_data', methods = ['POST'])
def store_data():
    try:
        data = request.get_json()

        if not data or not isinstance(data, list):
            return jsonify({'error': 'Invalid data format'}), 400
        
        global storage
        storage = StoreData(data)
        
        return jsonify({'message': 'Data stored successfully'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@app.route('/get_match', methods = ['GET'])    
def get_match():
    global storage
    
    if storage is None:
        return jsonify({'error': 'No data has been stored yet. Please store data first.'}), 400
    
    data = request.args.to_dict()
    if not data:
        return jsonify({'error': 'No query parameters received'}), 400
    
    try:
        match = storage.get_match(data)
        return jsonify({'message':'Match found!', 'match': match}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

if __name__ == '__main__':
    app.run(debug = True)