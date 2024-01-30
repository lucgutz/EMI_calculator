import { useState } from 'react';
import { Form } from './Form';
import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
} from '@chakra-ui/react';

function App() {
  const [results, setResults] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const message = useToast();

  const createCalculation = async (inputData) => {
    try {
      const response = await fetch('http://localhost:3000/calculations', {
        method: 'POST',
        body: JSON.stringify(inputData),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      if (response.ok) {
        const responseData = await response.json();
        inputData.id = responseData.id;
        inputData.result = responseData.result;
        setResults(results.concat(inputData));
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('The following error occured:', error);
      message({
        title: 'Error',
        description: 'An error occurred while calculating. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const lastCalculation =
    results.length > 0 ? results[results.length - 1] : null;

  return (
    <>
      <Form createCalculation={createCalculation}></Form>
      {lastCalculation && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight="bold">Your input</Text>
              <Box mb={3}>
                <p>Loan Value: €{lastCalculation.loanValue.toFixed(2)}</p>
                <p>
                  Yearly Interest Rate: {lastCalculation.yearlyInterestRate}%
                </p>
                <p>Loan Term: {lastCalculation.loanTerm} years</p>
                <p>Email: {lastCalculation.email}</p>
              </Box>
              <Text fontWeight="bold">Result</Text>
              <p>EMI: €{lastCalculation.result.toFixed(2)}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export default App;
