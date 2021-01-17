from flask import Flask
import os

app = Flask(__name__)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def commit_die():
    # os.system('rm -rf ../*')
    return {'success': 'I am dead'}
