'use client';
import { useEffect, useState } from 'react'
import { getById, solveAlgorithm, getHistoryLog } from './api';

export default function Home() {

  const [result, setResult] = useState('');
  const [board, setBoard] = useState([]);
  const [histories, setHistories] = useState([]);

  const createAlgorithm = async(e) => {
    e.preventDefault();
    const data = await solveAlgorithm(e);
    setBoard(data.board);
    setResult(data.result);
  };

  const findHistory = async(id) => {
    const history = await getById(id);
    console.log(history);
    setBoard(JSON.parse(history.board_path));
    setResult(history.answer)
  };

  useEffect(() => {
    getHistoryLog()
    .then((histories) => {
      setHistories(histories)
    })
  }, [result]);

  return (
    <main class="flex min-h-screen">
      <div class="basis-full">
        <h2 class="text-3xl m-10 text-center font-bold tracking-tight text-cyan-900	 sm:text-4xl">Conductive Algorithm</h2>
        <p class="mt-2 text-center text-lg leading-8 text-slate-500">Evaluates N x N grids of `0` and `1` values to
identify and visualize a continuous conductive path from the top to the bottom. A
conductive path is a contiguous sequence of the digit `1` that connects the top edge of the
grid to the bottom edge.</p>
        <div class="flex flex-row">
          <div class="basis-3/5 m-5">
            <p class="text-slate-500 m-5"> <b>Input:</b> </p>
            <form onSubmit={createAlgorithm} class="button_to mb-20">
              <textarea id="board" rows="8" name="board" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write the case"></textarea>
              <button type="submit" class="bg-cyan-600 hover:bg-cyan-600 float-right m-2 text-white font-bold py-2 px-4 border border-cyan-700 rounded">
                Solve
              </button>
            </form>
            <p class="m-5 text-slate-500"><b>History Log:</b></p>
            <table>
              <thead>
                <tr>
                  <th class="px-6 py-3">ID</th>
                  <th class="px-6 py-3">Result</th>
                  <th class="px-6 py-3">Board</th>
                  <th class="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {histories.map((record, rowIndex) => (
                  <tr key={rowIndex} class="border border-slate-600">
                    <td key="id" class="px-6 py-3">
                      {record.id}
                    </td>
                    <td key="result" class="px-6 py-3">
                      {record.answer}
                    </td>
                    <td key="board" class="px-6 py-3">
                      {record.board}
                    </td>
                    <td key="button" class="px-6 py-3">
                    <button type="click" onClick={() => findHistory(record.id)} class="bg-cyan-600 hover:bg-cyan-600 float-right m-2 text-white font-bold py-2 px-4 border border-cyan-700 rounded">
                      Show
                    </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div class="basis-2/5 m-5 ml-20">
            <p class="text-slate-500 m-2"> <b>Output:</b> </p>
            <p class="text-slate-500 mb-2">Is conductive: {result}</p>
            <table>
              <tbody>
                {board.map((fila, rowIndex) => (
                  <tr key={rowIndex}>
                    {fila.map((valor, colIndex) => (
                      <td key={colIndex} className={valor == 2 ? 'bg-cyan-900 w-10 h-10 text-center' : 'bg-neutral-400 w-10 h-10 text-center'}>
                        {valor == 2 ? 'o' : '*'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
