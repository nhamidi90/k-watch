import os
from flask import (
    Flask, flash, render_template, 
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
if os.path.exists("env.py"):
	import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get_shows")
def get_shows():
    shows = list(mongo.db.shows.find())
    status = list(mongo.db.status.find())
    return render_template("shows.html", shows=shows, status=status)


@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        existing_user = mongo.db.user.find_one(
            {"username": request.form.get("username").lower()})
        
        if existing_user:
            flash("Username already exists")
            return redirect(url_for("register"))


        register = {
            "username": request.form.get("username").lower(),
            "email": request.form.get("email"),
            "password": generate_password_hash(request.form.get("password")),
            "confirm_password": generate_password_hash(request.form.get("confirm_password"))
        }
        
        password1 = request.form.get("password")
        password2 = request.form.get("confirm_password")

        if password1 != password2:
            flash("Passwords do not match. Please try again")
        else: mongo.db.user.insert_one(register), flash(
            "Registration successful! Welcome!")
        session["user"] = request.form.get("email")
        return redirect(url_for("profile", username=session["user"]))

    return render_template("register.html")


@app.route("/sign_in", methods=["GET", "POST"])
def sign_in():
    if request.method == "POST":
        existing_user = mongo.db.user.find_one(
            {"email": request.form.get("email")})
        
        if existing_user:
            if check_password_hash(
                existing_user["password"], request.form.get("password")):
                    session['user'] = existing_user['username']
                    return redirect(url_for("get_shows", username=session["user"]))
            else:
                flash("Incorrect Email or Password")
                return redirect(url_for("sign_in"))

        else:
            flash("Incorrect Email or Password")
            return redirect(url_for("sign_in"))
    return render_template("sign-in.html")


@app.route("/profile/<username>", methods=["GET", "POST"])
def profile(username):
    username = mongo.db.user.find_one({"username": session["user"]})['username']

    if session["user"]:
        return render_template("profile.html", username=username)
    
    return redirect(url_for(sign_in))


@app.route("/sign_out")
def sign_out():
    session.clear()
    return redirect(url_for("sign_in"))


@app.route("/add_drama", methods=["GET", "POST"])
def add_drama():
    if request.method == "POST":
        drama = {
        "title": request.form.get("title"),
        "image": request.form.get("img_url"),
        "year": request.form.get("year"),
        "number_of_episodes": request.form.get("number_of_episodes"),
        "status": request.form.get("status"),
        "episodes_watched": request.form.get("episodes_watched"),
        "rating": request.form.get("rating"),
        "notes": request.form.get("notes"),
        "created_by": session["user"]
        }
        mongo.db.shows.insert_one(drama)
        flash("Your drama was added successfully")
        return redirect(url_for("get_shows"))
    status = list(mongo.db.status.find())
    return render_template("add_drama.html", status=status)


@app.route("/edit_drama/<show_id>", methods=["GET", "POST"])
def edit_drama(show_id):
    show = mongo.db.shows.find_one({"_id": ObjectId(show_id)})
    status = list(mongo.db.status.find())
    return render_template("edit_drama.html", show=show, status=status)


if __name__ == "__main__":
    app.run(host = os.environ.get("IP"),
            port = int(os.environ.get("PORT")), 
            debug = True)
