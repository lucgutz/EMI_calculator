import { useState } from 'react';
import {
  FormErrorMessage,
  useToast,
  Center,
  Input,
  Flex,
  Card,
  CardBody,
  Button,
  CardHeader,
  FormControl,
  FormLabel,
} from '@chakra-ui/react';

// eslint-disable-next-line react/prop-types
export const Form = ({ createCalculation }) => {
  const [loanValue, setLoanValue] = useState('');
  const [yearlyInterestRate, setYearlyInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [email, setEmail] = useState('');

  const message = useToast();

  const errorEmail = email === '';
  const errorLoanValue = loanValue <= 0;
  const errorYearlyInterestRate =
    yearlyInterestRate <= 0 || yearlyInterestRate >= 100;
  const errorLoanTerm = loanTerm <= 0 || loanTerm > 30;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(loanValue) || loanValue <= 0) {
      message({
        title: 'Loan Value is invalid.',
        description: 'Loan Value should be a positive number.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    } else if (yearlyInterestRate <= 0 || yearlyInterestRate >= 100) {
      message({
        title: 'YIR is invalid.',
        description: 'Yearly Interest Rate should be between 0 and 100.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    } else if (loanTerm <= 0 || loanTerm > 30) {
      message({
        title: 'Loan Term is invalid.',
        description: 'Loan Term should be between 0 and 30.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const inputData = {
      loanValue: parseFloat(loanValue),
      yearlyInterestRate: parseFloat(yearlyInterestRate),
      loanTerm: parseFloat(loanTerm),
      email,
    };
    createCalculation(inputData);

    setLoanValue('');
    setYearlyInterestRate('');
    setLoanTerm('');
    setEmail('');
  };

  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bg="rgb(227, 220, 210)"
        paddingTop={8}
        paddingBottom={8}
      >
        <Card
          p="1rem"
          borderRadius="10px"
          boxShadow="8px 8px 7px rgba(0, 0, 0, 0.2)"
          maxWidth={{ base: '90%', sm: '600px' }}
          height="100%"
        >
          <CardHeader>
            <Center fontSize="xl" fontWeight="bold">
              EMI Calculator
            </Center>
            <Center>Equated Monthly Installment</Center>
          </CardHeader>
          <CardBody minWidth="300px">
            <form onSubmit={handleSubmit}>
              <FormControl isInvalid={errorLoanValue} mb={3}>
                <FormLabel mb={0.5}>Loan value in €:</FormLabel>
                <Input
                  type="number"
                  placeholder="Type full amount"
                  required
                  onChange={(e) => setLoanValue(e.target.value)}
                  value={loanValue}
                  focusBorderColor="black"
                />
              </FormControl>
              <FormControl isInvalid={errorYearlyInterestRate} mb={3}>
                <FormLabel mb={0.5}>Yearly Interest Rate:</FormLabel>
                <Input
                  type="number"
                  required
                  onChange={(e) => setYearlyInterestRate(e.target.value)}
                  value={yearlyInterestRate}
                  focusBorderColor="black"
                />
                {errorYearlyInterestRate && (
                  <FormErrorMessage mt={0.5}>
                    Enter a percentage between 0 and 100
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errorLoanTerm} mb={3}>
                <FormLabel mb={0.5}>Loan Term in years:</FormLabel>
                <Input
                  type="number"
                  onChange={(e) => setLoanTerm(e.target.value)}
                  value={loanTerm}
                  focusBorderColor="black"
                />
                {errorLoanTerm && (
                  <FormErrorMessage mt={0.5}>
                    Enter a number between 0 and 30
                  </FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={errorEmail}>
                <FormLabel mb={0.5}>Email:</FormLabel>
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  focusBorderColor="black"
                />
                {errorEmail && (
                  <FormErrorMessage>E-mail is required</FormErrorMessage>
                )}
              </FormControl>
              <Center mt={4}>
                <Button type="submit">Calculate EMI</Button>
              </Center>
            </form>
          </CardBody>
        </Card>
      </Flex>
    </>
  );
};
