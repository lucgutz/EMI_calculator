const calculateEMI = (P, NN, RR) => {
  // prettier-ignore
  const R = (RR/100) / 12;
  const N = NN * 12;
  // prettier-ignore
  const EMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
  return EMI;
};

export default calculateEMI;
