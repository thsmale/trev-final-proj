# fastapi
This accepts the JSON payload from the grommet UI and feeds the code into trevors venmo least paths algorithm.
It returns the most efficient venmo payments required to settle all tabs then the UI will display the results in a table.

## Running
Specify the port or otherwise everytime the server is reloaded the server will bind to a new port
```
uvicorn main:app --reload --port 3001
```