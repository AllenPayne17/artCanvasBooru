import pymongo
import cloudinary
import cloudinary.uploader
from bson import ObjectId
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json

myclient = pymongo.MongoClient("mongodb+srv://Tradebitx:Tradebitx@tradebitx.pfh6nau.mongodb.net/artCanvaBooru?retryWrites=true&w=majority")
mydb = myclient['artCanvaBooru']
mycul = mydb['users']


app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-type"

def convert_to_string(obj):
    if isinstance(obj, dict):
        for key, value in obj.items():
            if isinstance(value, ObjectId):
                obj[key] = str(value)
            elif isinstance(value, list):
                for item in value:
                    convert_to_string(item)
    elif isinstance(obj, list):
        for item in obj:
            convert_to_string(item)

@app.route('/all_posts', methods=['GET'])
def get_all_posts():
    all_posts = []
    all_users = mycul.find({})
    for user in all_users:
        posts = user.get('posts', [])
        if posts:
            for post in posts:
                post['_id'] = str(post.get('_id'))
                all_posts.append(post)
    return jsonify(all_posts)

@app.route("/signup", methods=["POST"])
def signup():
    content = request.get_json()
    email = content.get('email')
    
    # Check if the email already exists in the database
    user = mycul.find_one({"email": email})
    if user:
        return jsonify({"message": "Email already exists"}), 400
    else:
        mycul.insert_one(content)
        return jsonify({"message": "Account created successfully"}), 200

@app.route("/login", methods=["POST"])
def login():
    content = request.get_json()
    email = content.get('email')
    password = content.get('password')

    # Check if the email exists in the database
    user = mycul.find_one({"email": email})
    if user:
        # Verify password
        if user['password'] == password:
            # Convert ObjectId to string for serialization
            user['_id'] = str(user['_id'])
            convert_to_string(user.get('posts', []))

            return jsonify({"message": "Login successful", "user": user}), 200
        else:
            return jsonify({"message": "Incorrect password"}), 401
    else:
        return jsonify({"message": "Email not found"}), 404


# Route to get all users
@app.route("/users", methods=["GET"])
def get_all_users():
    users = mycul.find()  # Retrieve all users from the database
    user_list = []  # List to store user data

    # Convert ObjectId to string for each user document
    for user in users:
        user['_id'] = str(user['_id'])
        convert_to_string(user.get('posts', []))
        user_list.append(user)

    return jsonify({"users": user_list}), 200


@app.route("/upload", methods=['POST'])
def upload_file():
  app.logger.info('in upload route')
  cloudinary.config(cloud_name = 'dlsry4vmx', api_key='785376393144524', api_secret='SJdkHAtLOs2SbVyfJkTPyxQpX2k')
  upload_result = None
  if request.method == 'POST':
    file_to_upload = request.files['file']
    app.logger.info('%s file_to_upload', file_to_upload)
    if file_to_upload:
      folder_name = 'arts'
      upload_result = cloudinary.uploader.upload(file_to_upload, folder=folder_name)
      app.logger.info(upload_result)
      return jsonify(upload_result)


@app.route("/post-image", methods=["POST"])
def add_images_to_user():
    content = request.get_json()
    user_id = content.get('_id')  # Assuming the user ID is sent in the request
    image_url = content.get('imageUrl')  # Assuming a single image URL is sent

    # Check if the user exists in the database
    user = mycul.find_one({"_id": ObjectId(user_id)})

    if user:
        image_id = ObjectId()

        image_object = {
            "_id": image_id,
            "imageUrl": image_url,
            "title": content.get('title', ''),
            "description": content.get('description', ''),
            "tags": content.get('tags', ''),
            "artist": content.get('artist', ''),
            "username": content.get('username', ''),
            "comments": [],
            "DatePost": content.get('DatePost')  # Assuming DatePost is sent in the request
        }

        # Append the image object to the user's postList
        mycul.update_one(
            {"_id": ObjectId(user_id)},
            {"$push": {"posts": image_object}}
        )

        return jsonify({"message": "Image added to user's postList successfully"}), 200
    else:
        return jsonify({"message": "User not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)