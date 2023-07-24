from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Union
import pandas as pd


tab_schema_example = {
        'id': '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
        'name': 'Trevor',
        'item': 'pizza',
        'price': 8.00
}

class Tab(BaseModel):
    id: str
    name: str
    item: str
    price: Union[float, str] = None 

    class Config:
        schema_extra = {
                'example': tab_schema_example
        }

class Bill(BaseModel):
    id: str
    eventName: str
    owner: str
    date: str
    description: str
    tabs: list[Tab]

    class Config: 
        schema_extra = {
                'example': {
                    'id': '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000',
                    'eventName': 'Pizza review',
                    'owner': 'Arthur',
                    'date': '2023-05-08T05:51:46.855Z',
                    'desciption': 'hail lil cesars pizza',
                    'tabs': [tab_schema_example]
                }
        }

app = FastAPI()

origins = [
        'http://localhost:3000'
]

app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=['POST'],
        allow_headers=['*']
)

@app.post("/bill")
async def post_bill(request: Request):
    payload = await request.body()
    payload = payload.decode('utf-8')
    payload = pd.read_json(payload)
    print(payload)
    """
    print(bills)
    print(bills[0].owner)
    print(type(bills[0]))
    temp = pd.DataFrame(data=bills)
    print(temp)
    temp2 = pd.DataFrame.from_records([[bill.to_dict()] for bill in bills])
    print(temp2)
    """
    """
    df = pd.DataFrame(data=bills, 
                      columns=[
                          'id', 
                          'eventName',
                          'owner',
                          'date',
                          'description',
                          'tabs'
                          ])
    print(df)
    tabs = pd.DataFrame([vars(s) for s in bills[0].tabs], columns=['id', 'name', 'item', 'price'])
    print(tabs)
    """
    return {"Hello": "World"}
