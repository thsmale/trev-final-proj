import json
import pandas as pd

data = [
  {
    "id": "50f3c690-1668-40d4-abd5-edc7f73fdca6",
    "eventName": "d",
    "owner": "Jamie",
    "date": "d",
    "description": "d",
    "tax": "3.4",
    "tip": "4.34",
    "tabs": [
      {
        "id": "5c1c9626-6877-4cb8-bfb9-d29d0ead33cd",
        "name": "ytrff",
        "item": "d",
        "price": "32.3"
      },
      {
        "id": "37d51981-05c1-45c3-a031-529eedef0230",
        "name": "dsfdsf",
        "item": "sdc",
        "price": "3.34"
      },
      {
        "id": "d85ce369-aad3-45e8-a0b9-f1167e64b2dc",
        "name": "das",
        "item": "fafadf",
        "price": "2.3"
      },
      {
        "id": "0e1e3476-a4df-4bd4-853f-f2bcfd91b890",
        "name": "asd",
        "item": "da",
        "price": "2.34"
      }
    ]
  }
]

# json_data is a utf-8 encoded string from JSON
# Converts string to a list
def convert_format(json_data):
    # Convert json str to py dict
    json_data = json.loads(json_data)
    new_format_list = []
    for python_dict in json_data:
        print(python_dict)
        new_format = {}
        new_format["exp_date"] = {python_dict["owner"]: python_dict["date"]}
        new_format["lines"] = [(tab["name"], tab["item"], float(tab["price"])) for tab in python_dict["tabs"]]
        new_format["tax_tip"] = (float(python_dict["tax"]), float(python_dict["tip"]))
        new_format_list.append(new_format)

    return new_format_list

def intake(exp_date, lines, tax_tip):
    items = {}
    names = []
    for line in lines:
        name, item, price = line
        name = name.capitalize()
        item = item.capitalize()
        price = float(price)
        if "/" in name:
            split = name.split("/")
            price = float(price/len(split))
            for name in split:
                name = name.capitalize()
                if item not in items:
                    items[item] = {name: price}
                else:
                    items[item][name] = price
                if name not in names:
                    names.append(name)
        else:
            if item not in items:
                items[item] = {name: price}
            else:
                items[item][name] = price
            if name not in names:
                names.append(name)

    tax, tip = tax_tip

    return exp_date, items, names, tax, tip

# json is a utf-8 encoded string from JSON
def receipt_to_df(json):
    data = convert_format(json)
    dfs = {}
    df_list = []
    df_name_date = {}  # Keep track of the date for each DataFrame

    for receipt_data in data:
        try:
            exp_date, items, names, tax, tip = intake(**receipt_data)

            # Subtotal = creating list for all prices
            keys = items.keys()
            l2 = []
            for v in keys:
                l1 = items[v].values()
                for v in l1:
                    l2.append(float(v))
            subtotal = sum(l2)

            # Adj rates
            tax_rate = (tax / subtotal)
            tip_rate = (tip / subtotal)

            # Personal subtotal dict
            nested = items.values()
            per_sub = {}
            for d in nested:
                for k, v in d.items():
                    per_dict = {k:v}
                    for k, v in per_dict.items():
                        if k in per_sub:
                            per_sub[k] += float(v)
                        else:
                            per_sub[k] = float(v)

            # Personal Adj tax and tips
            per_tax = {}
            for k in per_sub:
                per_tax[k] = (per_sub[k] * tax_rate)
            per_tip = {}
            for k in per_sub:
                per_tip[k] = (per_sub[k] * tip_rate)

            # nested list comprehension to sort the items dictionary keys based on the names list order
            # for names dict is nested in items dict
            sorted_items = {item: {name: items[item].get(name, 0) for name in names} \
                            for item in items}


            # Create dataframe using sorted_items
            df = pd.DataFrame.from_dict(sorted_items, orient="index").fillna(0)

            # First column to "Items"
            df.index.name = "Items"

            # Rename columns to names
            df.columns = names

            # Add Personal subtotal and Adj Tax/Tip rows
            df.loc["Subtotal"] = {name: per_sub[name] for name in names}
            df.loc["Adj Tax"] = {name: per_tax[name] for name in names}
            df.loc["Adj Tip"] = {name: per_tip[name] for name in names}

            # Add Total column
            df['Total'] = df.iloc[(df.index.get_loc('Subtotal')):, 0:].applymap(float)\
            .sum(axis=1)

            # Add Total Row
            df.loc['Total'] = df.iloc[(df.index.get_loc('Subtotal')):, 0:]\
            .applymap(float).sum(axis=0)

            # Move the index name to a new row
            df = df.reset_index().rename_axis(None, axis=1)

            for key, value in exp_date.items():
                df_name = key
                date = value

            dfs[df_name] = df
            df_name_date[df_name] = date  # Store the date
            df_list.append(df)
        except Exception as e:
            print("Invalid input. Please try again.")
            continue

    result = []
    master = pd.DataFrame()
    for i, (df_name, df) in enumerate(dfs.items()):
        melted_df = pd.melt(df, id_vars = ['Items'], var_name = 'names', value_name = 'price')
        filtered_melt = melted_df[melted_df['Items'] == 'Total']
        df_names = list(filtered_melt['names'])
        df_prices = list(filtered_melt['price'])

        master_df = pd.DataFrame(columns = ['Date', 'Expense'] + df_names) # Creates master DataFrame column headings
        master_df.loc[0] = [df_name_date[df_name], df_name] + df_prices  # Fills columns with data from melt

        result.append(master_df)
        master = pd.concat(result, ignore_index = True)
        total_col = master.pop('Total')  # Remove the Total column
        master['Total'] = total_col  # Add the removed column back which puts it to the end
        master.loc['Total'] = master.iloc[:, 2:].applymap(float).sum(axis = 0)
    
    print(data)
    return (dfs, master, df_name_date, df_list)
