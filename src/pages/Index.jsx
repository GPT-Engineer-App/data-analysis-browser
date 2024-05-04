import React, { useState } from "react";
import { Container, VStack, Textarea, Button, Select, Text, useToast, Heading, Box, Input } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

const Index = () => {
  const [data, setData] = useState("");
  const [analysisResult, setAnalysisResult] = useState("");
  const [selectedAnalysis, setSelectedAnalysis] = useState("");
  const toast = useToast();

  const handleDataChange = (event) => {
    setData(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setData(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleAnalysisChange = (event) => {
    setSelectedAnalysis(event.target.value);
  };

  const performAnalysis = () => {
    if (!data) {
      toast({
        title: "No data provided",
        description: "Please enter or upload data to analyze.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Dummy analysis logic
    switch (selectedAnalysis) {
      case "count":
        setAnalysisResult(`Number of rows: ${data.split("\n").length}`);
        break;
      case "unique":
        const uniqueValues = new Set(data.split(","));
        setAnalysisResult(`Unique values: ${Array.from(uniqueValues).join(", ")}`);
        break;
      default:
        setAnalysisResult("Select an analysis method.");
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Heading>Data Analysis Tool</Heading>
        <Text>Enter CSV data or upload a file:</Text>
        <Textarea value={data} onChange={handleDataChange} placeholder="Enter CSV data here" size="sm" />
        <Box>
          <Input type="file" accept=".csv" onChange={handleFileChange} p={1} />
          <Button leftIcon={<FaUpload />} onClick={() => document.querySelector('input[type="file"]').click()}>
            Upload CSV
          </Button>
        </Box>
        <Select placeholder="Select analysis type" onChange={handleAnalysisChange}>
          <option value="count">Count Rows</option>
          <option value="unique">Unique Values</option>
        </Select>
        <Button colorScheme="blue" onClick={performAnalysis}>
          Analyze
        </Button>
        <Text fontWeight="bold">Analysis Result:</Text>
        <Text>{analysisResult}</Text>
      </VStack>
    </Container>
  );
};

export default Index;
