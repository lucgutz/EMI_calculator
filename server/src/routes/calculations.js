import { Router } from 'express';
import getCalculations from '../services/getCalculations.js';
import createCalculation from '../services/createCalculation.js';
import calculateEMI from '../services/calculateEMI.js';

const router = Router();

router.get('/', (req, res) => {
  const calculations = getCalculations();
  res.json(calculations);
});

router.post('/', (req, res) => {
  const { loanValue, yearlyInterestRate, loanTerm, email } = req.body;
  const result = calculateEMI(loanValue, loanTerm, yearlyInterestRate);

  const newCalculation = createCalculation(
    loanValue,
    yearlyInterestRate,
    loanTerm,
    email,
    result
  );
  res.status(201).json(newCalculation);
});

export default router;
