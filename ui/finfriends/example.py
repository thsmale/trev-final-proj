from venmo import receipt_to_df
from algo import calc_pay

# read file
with open('trev-payload.json', 'r') as myfile:
    payload=myfile.read()

# payload = payload.decode('utf-8')
# Did not run yet
# payload = json.loads(payload)
# print(json.loads(payload))

#convert_format(payload)

dfs, master, df_name_date, df_list = receipt_to_df(payload)
payments_df, instructions = calc_pay(master)
print(payments_df)
print(instructions)
