import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './mcqTest.css';
import { Redirect, useHistory } from 'react-router-dom';
import PassComponent from './ResultComponent';
import { useParams } from 'react-router-dom';

const McqTest = () => {
  const { applicationId } = useParams();
  const [questions, setQuestions] = useState([]); // State to store fetched questions
  const [answers, setAnswers] = useState({}); // State to store user answers
  const [formValid, setFormValid] = useState(false); // State to track form validity
  const [submitted, setSubmitted] = useState(false); // State to track if the test is submitted
  const [result, setResult] = useState(0); // State to store the result
  const [score, setScore] = useState(0);
  const history = useHistory();

  useEffect(() => {
    // Function to fetch questions from the server
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/testQuestions',{
          headers : {
            'Authorization':`Bearer ${sessionStorage.getItem('authToken')}`
          }
        });




        setQuestions(response.data); // Set fetched questions to state
        console.log(response.data);
        console.log(applicationId);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions(); // Call the fetchQuestions function when the component mounts
  }, []);

  // Function to handle user selection of options
  const handleOptionChange = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
    // Check if all questions have been answered
    const answeredQuestions = Object.keys(answers).length;
    setFormValid(answeredQuestions === questions.length);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Check if all questions have been answered
    if (Object.keys(answers).length !== questions.length) {
      alert("Please attempt all questions before submitting.");
      return;
    }
    
    setSubmitted(true); // Set submitted to true after the form is submitted
    // Calculate the result
    console.log(answers);
    let score = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.correctOption) {
        score += 1;
      }
    });
    setScore(score);
    setResult(score >= questions.length/4 ? 'PASS' : 'FAIL');
  };

  const handleProceed = async () => {
    try {
        // Make PUT request to update result
        const response = await axios.put(`http://localhost:8080/lernerLicense/updateTestResult`, null, {
            params: {
                appId: applicationId,
                result: 'PASS'
            }

            ,
            headers : {
              'Authorization':`Bearer ${sessionStorage.getItem('authToken')}`
            }

        });

        // Display response data in alert box
        window.alert(`Response from server: ${JSON.stringify(response.data)}`);

        // Navigate back to the dashboard
        history.push('/UserDashboard');

        // Set submitted to true after the form is submitted
        setSubmitted(true);
    } catch (error) {
        console.error('Error updating test result:', error);
        window.alert('Error updating test result. Please try again.');
    }
};

  return (
    <div>
      <h2 className="text-center">Learner's License MCQ test</h2>
      <Form onSubmit={handleSubmit}>
        {/* Render each question within a card */}
        {questions.map((question, index) => (
          <Card key={question.id} className="mb-4 mcq-card">
            <Card.Body>
              <Card.Title>{`${index + 1}: ${question.questionText}`}</Card.Title>
              {/* Render options for each question */}
              <Form.Group>
                <Form.Check
                  type="radio"
                  id={`${question.id}-a`}
                  name={question.id}
                  label={question.optionA}
                  onChange={() => handleOptionChange(question.id, 'a')}
                  className="mcq-option"
                  disabled={submitted}
                />
                <Form.Check
                  type="radio"
                  id={`${question.id}-b`}
                  name={question.id}
                  label={question.optionB}
                  onChange={() => handleOptionChange(question.id, 'b')}
                  className="mcq-option"
                  disabled={submitted}
                />
                <Form.Check
                  type="radio"
                  id={`${question.id}-c`}
                  name={question.id}
                  label={question.optionC}
                  onChange={() => handleOptionChange(question.id, 'c')}
                  className="mcq-option"
                  disabled={submitted}
                />
                <Form.Check
                  type="radio"
                  id={`${question.id}-d`}
                  name={question.id}
                  label={question.optionD}
                  onChange={() => handleOptionChange(question.id, 'd')}
                  className="mcq-option"
                  disabled={submitted}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        ))}
        {/* Center the "Submit Test" button */}
        <Row className="justify-content-center">
            <Col xs="auto">
                <Button className="submit-button" variant="primary" type="submit" disabled={submitted}>
                Submit Test
                </Button>
            </Col>
        </Row>
      </Form>
      {/* Display the result after submission */}
      {submitted && (
        <div className="text-center mt-4">
          <h3>Application Id: {applicationId}</h3>
          <h3>Your Score: {score}</h3>
          <h3>Your result: {result}</h3>
          <Button variant="primary" onClick={handleProceed}>
            Proceed
          </Button>
        </div>
        
      )}
    </div>
  );
};

export default McqTest;
