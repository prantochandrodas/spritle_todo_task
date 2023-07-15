import { useEffect, useState } from 'react'
import './App.css'
const getLocalStoreList = () => {
  let list = JSON.parse(localStorage.getItem('lists'))
  if (list) {
    return JSON.parse(localStorage.getItem('lists'))
  } else {
    return [];
  }
}

const getLocalStoreAmount = () => {
  let amount = JSON.parse(localStorage.getItem('amount'))
  console.log(amount)
  if (amount) {
    return JSON.parse(localStorage.getItem('amount'))
  } else {
    return 0;
  }
}
function App() {
  const [todo, setTodo] = useState('');
  const [item, setItem] = useState(getLocalStoreList())
  const [callEvent, setCallEvent] = useState('');
  const [addAmount, setAddAmount] = useState(getLocalStoreAmount())
  const [Error, setError] = useState('')
  console.log(Error)
  const handelSubmit = (e) => {
    setError('')
    e.preventDefault();
    const form = e.target;
    const datetime = new Date().toLocaleString();
    if (callEvent == 'add' && todo !== '') {
      const data = {
        amount: todo,
        time: datetime,
        status: 'add'
      }
      setItem([...item, data])
      setAddAmount(parseInt(addAmount) + parseInt(todo))

      form.reset();
    } else if (callEvent == 'remove' && addAmount >= parseInt(todo)) {
      const data = {
        amount: todo,
        time: datetime,
        status: 'remove'
      }
      setItem([...item, data])
      if (addAmount == 0) {
        setAddAmount(0)
        setError('Balance is 0 cannot remove')
        form.reset();
      }else {
        setAddAmount(parseInt(addAmount) - parseInt(todo))
        form.reset();
      } 
    }

    if (callEvent == 'remove' && addAmount <parseInt(todo)) {
      setError('Removed balance is grater then balance')
      form.reset();
    } 
  }

  //get lists and amount
  useEffect(() => {
    localStorage.setItem('amount', JSON.stringify(addAmount))
  }, [addAmount])
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(item))
  }, [item])
  return (
    <>
      <h1 id='hedding'>Expense Tracker Basic</h1>
      <div id='input-box'>
        <p >Balance :{addAmount}</p>
        <div id='form'>
          <form onSubmit={handelSubmit} >
            {
              Error !== '' ? <p style={{ color: 'red' }}>{Error}</p> : ''
            }
            <input type="number" name='num' required value={todo} onChange={(e) => setTodo(e.target.value)} /> <br />
            <button type='submit' onClick={() => setCallEvent('add')}>add</button>
            <button type='submit' onClick={() => setCallEvent('remove')}>remove</button>
          </form>
        </div>
      </div>
      <div id='value'>
        <h3>Transactions :</h3>
        {
          item?.map((data, i) => <div key={i}>
            <p>{data.time} - {data.amount} - {data.status}</p>
          </div>)
        }
      </div>
    </>
  )
}

export default App
