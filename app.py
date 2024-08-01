from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import joblib

# Initialize Flask application
app = Flask(__name__)

CORS(app)
# Diseases that were encoded into integers for training the model
encoded_classes = ['(vertigo) Paroymsal  Positional Vertigo', 'AIDS', 'Acne',
 'Alcoholic hepatitis', 'Allergy', 'Arthritis', 'Bronchial Asthma',
 'Cervical spondylosis', 'Chicken pox', 'Chronic cholestasis', 'Common Cold',
 'Dengue', 'Diabetes ', 'Dimorphic hemmorhoids(piles)', 'Drug Reaction',
 'Fungal infection', 'GERD', 'Gastroenteritis', 'Heart attack', 'Hepatitis B',
 'Hepatitis C', 'Hepatitis D', 'Hepatitis E', 'Hypertension ',
 'Hyperthyroidism', 'Hypoglycemia', 'Hypothyroidism', 'Impetigo', 'Jaundice',
 'Malaria', 'Migraine', 'Osteoarthristis', 'Paralysis (brain hemorrhage)',
 'Peptic ulcer diseae', 'Pneumonia', 'Psoriasis', 'Tuberculosis', 'Typhoid',
 'Urinary tract infection', 'Varicose veins', 'hepatitis A']

# Load the trained machine learning model
model = joblib.load('model/dtree.joblib')


# @app.before_request
# def handle_preflight():
#     if request.method == "OPTIONS":
#         res = Response()
#         res.headers['X-Content-Type-Options'] = '*'
#         return res

# Home route
@app.route('/', methods=["GET"])
def home():
    return jsonify({'message':"Hello World!!"}), 200

# Define the prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data from the request
        input_data = request.json['data']

        # print(input_data)

        # Make predictions using the loaded model
        init_prediction = model.predict([input_data])[0]

        # Convert predicted integer to actual disease name 
        prediction = encoded_classes[init_prediction]

        print(prediction)

        # Return the prediction as a JSON response
        return jsonify({'prediction': prediction}), 200
    except Exception as e:
        # Handle any errors
        return jsonify({'error': str(e)}), 500

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)