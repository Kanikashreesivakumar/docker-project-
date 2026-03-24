from flask import Flash, request,jsonify
from flask_Cors import CORS
import os
from app.analyzer import analyze_resume

app=Flask(__name__)

CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/")
def home():
    return "Backend Running "

@app.route("/upload", methods=["POST"])
def upload():
    try:
        file =request.files["file"]
        if not file:
            return jsonify({"error": "No file uploaded"}),400
        
        path =os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(path)

        result = analyze_resume(path)
        return jsonify({
            "status":"success",
        "analysis": result
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}),500
    
    if __name__=="__main__":
        app.run(host="0.0.0.0",port=5000)