import os
from flask import Flask, render_template, url_for, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
import random

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
SQLALCHEMY_TRACK_MODIFICATIONS = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'app.db')
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(80), unique = False)
    def __repr__(self):
        return f'<User {self.username} >'

@app.route('/', methods = ['GET', 'POST'])
def main_page():
    words = load_dic()
    return render_template('main_page.html', words = words, range = range, len = len)

@app.route('/json', methods = ['POST'])
def accuracy_calc():
    data = request.get_json(force=True) 
    print(data)
    return {}

@app.route('/handle_accuracy')
def load_dic():
    file = open('app/static/dic.txt', 'r')
    words = [word.lower()[:-1] for word in file]
    return [[words[random.randint(0, len(words) - 1)] for n in range(6)] for i in range(3) ]
    