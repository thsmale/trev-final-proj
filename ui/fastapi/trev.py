import pandas as pd

"""
exp_buy: The owner the person who covered the bill
items: Dictionary {item: {name1: price, name2: price}]}
names: List 
tax: float
tip: float
"""
def inital_df(exp_buy, items, names, tax, tip):
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
    sorted_items = {item: {name: items[item].get(name, 0) for name in names} for item in items}


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
    df['Total'] = df.iloc[(df.index.get_loc('Subtotal')):, 0:].applymap(float).sum(axis=1)

   # Add Total Row
    df.loc['Total'] = df.iloc[(df.index.get_loc('Subtotal')):, 0:].applymap(float)\
    .sum(axis=0)

    # Move the index name to a new row
    df = df.reset_index().rename_axis(None, axis=1)
    
    # Name the dataframe Exp input for easy calling
    for key, value in exp_buy.items():
        df_name = key + "_" + value

    return df, df_name


# This is how trev likes the data formatted
trev_data = {
        'items': ['steak', 'crab', 'fries'],
        'trevor': [45., 0., 5.],
        'arthur': [32., 0., 5.],
        'tommy': [0., 55., 5]
}
trev_df = pd.DataFrame(data=trev_data)
print(trev_df)

# This is how Tommy wants the data formatted
test_data = {
        'name': ['ben', 'trevor', 'tommy', 'arthur'],
        'item': ['wine', 'wine', 'wine', 'wine'],
        'price': [30.0, 45, 20, 10.0]
}
test_df = pd.DataFrame(data=test_data)
print(test_df)

# Pivot data to look like trevors
# index, columns, values
print(test_df.pivot(index='item', columns='name', values='price'))
"""
items = dict(zip(list(test_df.item), list(test_df.price)))
print(items)
"""

"""
df, df_name = initial_df('trevor', test_df.item, test_df.name, 10, 20)
print(df_name)
print(df)
"""
