from flask import Flask
import threading

app = Flask(__name__)
time = 0


def count():
    global time
    time += 1


timer = threading.Timer(1, count)


@app.route('/time')
def get_current_time():
    return {'time': time}


@app.route('/die')
def commit_die():
    return {'success': 'I am dead'}
