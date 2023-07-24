from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from venmo import receipt_to_df
from algo import calc_pay
import json

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
    """
    print(payload)
    pdict = json.loads(payload)
    print(pdict)

    Returns convert_format ptyhon_dict = json.loads(json_data) JSON object must be str, bytes or bytearray, not DataFrame
    payload = pd.read_json(payload)
    print(payload)
    """
    dfs, master, df_name_date, df_list = receipt_to_df(payload)
    payments_df, instructions = calc_pay(master)
    print(payments_df)
    print(instructions)
    return {"Hello": "World"}
