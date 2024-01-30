import calculationData from '../data/calculations.json' assert { type: 'json' };

const getCalculations = () => {
  return calculationData.calculations;
};

export default getCalculations;
