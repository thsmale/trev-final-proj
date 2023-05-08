from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from typing import Union


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
async def post_bill(bills: list[Bill]):
    #body = await request.body()
    print(bills)
    return {"Hello": "World"}
