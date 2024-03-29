from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from venmo import receipt_to_df
from algo import calc_pay

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
    dfs, master, df_name_date, df_list = receipt_to_df(payload)
    # TODO integrate payments_df
    payments_df, instructions = calc_pay(master)
    response = {
        'instructions': instructions
    }
    return instructions
