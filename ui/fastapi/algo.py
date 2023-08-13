import pandas as pd

def calc_pay(master):
    # Store Final amounts (pay and receive)
    payments = {}

    # Store creditors/owners
    creditors = set()

    # Store totals creditors
    total_costs = {} 

    # Iterate rows in "master" DF
    for index, row in master.iterrows():
        # Disreguard the 'Total' row
        if index == 'Total':
            continue

        # Extract who paid for the expense
        owner = row['Expense'].split('_')[-1]
        creditors.add(owner)
        
        # Get the total cost of the expense
        total_cost = row['Total']

        # Update total_costs dict
        if owner not in total_costs:
            total_costs[owner] = total_cost
        else:
            total_costs[owner] += total_cost

        # Iterate over items in the row
        for name, cost in row.items():
            # Skip 'Date', 'Expense', 'Total' columns
            if name not in ['Date', 'Expense', 'Total']:
                # Nan = 0
                if pd.isnull(cost):
                    cost = 0
                # Update the payments dictionary
                if name in payments:
                    payments[name] -= cost
                else:
                    payments[name] = - cost

    # Update payments with total costs for each creditor
    for creditor in creditors:
        if creditor in payments:
            payments[creditor] += total_costs[creditor]
        else:
            payments[creditor] = total_costs[creditor]

    # Convert 
    new_payments = {}

    # Loop through each item in payments
    for k, v in payments.items():
        # Disregard 0
        if v == 0:
            continue
        v = round(v, 2)

        # Convert to string and add "+" when positive
        if v > 0:
            v = "+" + str(v)
        else:
            v = str(v)

        # Store in new
        new_payments[k] = v

    # Replace payments dict with new one
    payments = new_payments

    # Convert payments dictionary to DF
    payments_df = pd.DataFrame.from_dict(payments, orient='index', columns=['Payment']).reset_index()
    payments_df.columns = ['Name', 'Payment']

    # Convert 'Payment' column to numeric (coerce disregards nan etc.)
    payments_df['Payment'] = pd.to_numeric(payments_df['Payment'], errors='coerce')

    # Split DF into positive and negative
    positive_payments = payments_df[payments_df['Payment'] > 0]
    negative_payments = payments_df[payments_df['Payment'] < 0]

    # Payment instructions
    instructions = []

    # While there are still payments to be made
    while not positive_payments.empty and not negative_payments.empty:
        # Get the first row of positive and negative payments
        positive_row = positive_payments.iloc[0]
        negative_row = negative_payments.iloc[0]

        # Extract name and payment amount
        positive_name = positive_row['Name']
        negative_name = negative_row['Name']
        
        positive_payment = positive_row['Payment']
        negative_payment = negative_row['Payment']

        # Check if negative payment is greater or equal to positive payment (abs returns absolute value)
        if abs(negative_payment) >= positive_payment:

            # Instruction for negative payment person to pay positive payment person
            print("NEVER REACHED HERE EVER:")
            instructions.append(f"{negative_name} should pay {positive_name} ${abs(positive_payment):.2f}")
            
            # Remove the current positive payment from the list
            positive_payments = positive_payments.iloc[1:]

            # Update the current negative payment
            negative_payments.iloc[0, negative_payments.columns.get_loc('Payment')] += positive_payment

            # If current negative payment becomes zero, remove from list
            if negative_payments.iloc[0]['Payment'] == 0:
                negative_payments = negative_payments.iloc[1:]

        else:
            # Instruction for negative payment person to pay positive payment person
            instructions.append(f"{negative_name} should pay {positive_name} ${abs(negative_payment):.2f}")

            # Remove the current negative payment from list
            negative_payments = negative_payments.iloc[1:]

            # Update current positive payment
            positive_payments.iloc[0, positive_payments.columns.get_loc('Payment')] += negative_payment

    # Sort DataFrame by descending order
    payments_df = payments_df.sort_values(by = 'Payment', ascending=False)

    return payments_df, instructions
