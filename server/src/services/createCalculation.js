import calculationData from '../data/calculations.json' assert { type: 'json' };
import { v4 as uuid } from 'uuid';

const createCalculation = (
  loanValue,
  yearlyInterestRate,
  loanTerm,
  email,
  result
) => {
  const newCalculation = {
    id: uuid(),
    loanValue,
    yearlyInterestRate,
    loanTerm,
    email,
    result,
  };

  calculationData.calculations.push(newCalculation);
  return newCalculation;
};

export default createCalculation;
