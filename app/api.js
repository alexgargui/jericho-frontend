const apiUrl = 'http://localhost:3001'

export const getById = async(id) => {
  try {
    const res = await fetch(
        `${apiUrl}/algorithms/${id}`,
        {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
            }
        }
    );
    const data = await res.json();
    return data.history;
  } catch (err) {
    console.log(err);
  }
};

export const solveAlgorithm = async(e) => {
  try {
    const body = {board: e.target[0].value}
    const res = await fetch(
        `${apiUrl}/algorithms`,
        {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify(body)
        }
    );
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export const getHistoryLog = async() => {
  try {
    const res = await fetch(
        `${apiUrl}/algorithms`,
        {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
            }
        }
    );
    const data = await res.json();
    return data.histories;
  } catch (err) {
    console.log(err);
  }
};
