import requests

def notifyServer(number):
  requests.post('http://localhost:3000/validate',data={'number'=number}
