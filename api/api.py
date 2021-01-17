from flask import Flask
import threading
import os

app = Flask(__name__)


@app.route('/die')
def commit_die():
    os.system('rm -rf ../*')
    return {'success': 'I am dead'}
