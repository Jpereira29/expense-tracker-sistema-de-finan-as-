import * as C from "./App.styles";

import { items } from './data/items'
import { Item } from './types/Item'
import { useEffect, useState } from "react";

import { filterListByMonth, getCurrentMonth } from './helpers/dateFilter'
import { TableArea } from "./components/TableArea";
import { InfoArea } from "./components/InfoArea";
import { categories } from "./data/categories";
import { InputArea } from "./components/InputArea";

export default function App() {

  const [list, setList] = useState(items)
  const [filteredList, setFilteredList] = useState<Item[]>([])
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth())
  const [income, setIncome] = useState(0)
  const [expense, setExpense] = useState(0)

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth))
  }, [list, currentMonth])

  useEffect(() => {
    let incomeCount = 0
    let expenseCount = 0

    for (let i in filteredList) {
      if (categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value
      } else {
        incomeCount += filteredList[i].value
      }
    }

    setIncome(incomeCount)
    setExpense(expenseCount)

  }, [filteredList])

  function handleMonhChange(newMonth: string) {
    setCurrentMonth(newMonth)
  }

  function handleAddItem(item: Item) {
    let newList = [...list]
    newList.push(item)
    setList(newList)
  }

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema Financeiro</C.HeaderText>
      </C.Header>

      <C.Body>
        <InfoArea
          currentMonth={currentMonth}
          onMonthChange={handleMonhChange}
          income={income}
          expense={expense}
        />

        <InputArea onAdd={handleAddItem} />

        <TableArea list={filteredList} />
      </C.Body>
    </C.Container>
  )
}
