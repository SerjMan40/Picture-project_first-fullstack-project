import { ArrOfObj } from "../types/interfaces"

const costCalculator = (arr: ArrOfObj[]): number => {
  let sum: number = 0
  arr.forEach((item: ArrOfObj) => {
    sum += Number(item.itemId)
  })
  return sum
}

export default costCalculator