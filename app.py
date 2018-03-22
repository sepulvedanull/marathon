from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

from flask.ext.heroku import Heroku

app = Flask(__name__)
# https://stackoverflow.com/questions/45179120/how-do-i-connect-my-flask-app-to-its-heroku-database-using-psycopg2
# http://www.vertabelo.com/blog/technical-articles/web-app-development-with-flask-sqlalchemy-bootstrap-part-3
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://dgvnwqnawhccop:168b5904636719b5d62c585ca79b821f9d2fd7d0090ed9048cb744530d628538@ec2-54-221-212-15.compute-1.amazonaws.com:5432/d53bb2j3fl7r7l'
heroku = Heroku(app)
db = SQLAlchemy(app)

# Create our database model
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True)

    def __init__(self, email):
        self.email = email

    def __repr__(self):
        return '<E-mail %r>' % self.email

# Set "homepage" to index.html
@app.route('/')
def index():
    return render_template('index.html')

# Save e-mail to database and send to success page
@app.route('/prereg', methods=['POST'])
def prereg():
    email = None
    if request.method == 'POST':
        email = request.form['email']
        # Check that email does not already exist (not a great query, but works)
        if not db.session.query(User).filter(User.email == email).count():
            reg = User(email)
            db.session.add(reg)
            db.session.commit()
            return render_template('success.html')
    return render_template('index.html')

if __name__ == '__main__':
    app.debug = True
    app.run()
