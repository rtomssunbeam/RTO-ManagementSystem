import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.css'

const Rules = () => {
  const trafficRules = [
    {
      id: 1,
      title: 'Speed Limits',
      description: 'Speed limits vary depending on the type of road and the area. Be sure to follow posted speed limits to ensure safety.',
      image: "https://cdn-icons-png.flaticon.com/512/752/752738.png" },
    {
      id: 2,
      title: 'Traffic Signals',
      description: 'Always obey traffic signals. Red means stop, yellow means prepare to stop, and green means go. Be cautious when the light changes.',
      image: "https://cdn-icons-png.flaticon.com/512/1986/1986984.png"},
    {
      id: 3,
      title: 'Right of Way',
      description: 'Respect the right of way of other vehicles, pedestrians, and cyclists. Yield when necessary and avoid causing accidents.',
      image: "https://cdn-icons-png.flaticon.com/512/2439/2439759.png"},
    {
      id: 4,
      title: 'Signaling',
      description: 'Use your turn signals to indicate your intentions to other drivers. Signal well in advance before turning or changing lanes.',
      image: "https://cdn-icons-png.flaticon.com/512/3547/3547373.png" },
    {
      id: 5,
      title: 'Seat Belts',
      description: 'Always wear your seat belt while driving or riding in a vehicle. Seat belts save lives and reduce the risk of serious injury in accidents.',
      image: "https://cdn-icons-png.flaticon.com/512/271/271965.png" },
    {
      id: 6,
      title: 'Distracted Driving',
      description: 'Avoid distractions while driving, such as using a mobile phone, eating, or adjusting the radio. Stay focused on the road at all times.',
      image: "https://e7.pngegg.com/pngimages/272/569/png-clipart-texting-while-driving-text-messaging-distracted-driving-car-driving-driving-logo.png"},
    {
      id: 7,
      title: 'Drinking and Driving',
      description: 'Never drink and drive. Alcohol impairs your ability to drive safely and increases the risk of accidents. Always have a designated driver if you plan to drink.',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe9AHSU1v_aDzWJzIP7cvQCCN7paQJ8P6kI2l2Veos5AKHcP9phUxOgbyivVMr0eHeQOE&usqp=CAU"},
    {
      id: 8,
      title: 'Pedestrian Safety',
      description: 'Respect pedestrians and always yield to them at crosswalks. Be cautious when driving near schools, parks, and residential areas where pedestrians may be present.',
      image: "data:image/jpeg;base64,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"},
    {
      id: 9,
      title: 'Safe Following Distance',
      description: 'Maintain a safe following distance behind other vehicles to allow for enough time to react and stop if necessary. Keep a distance of at least two seconds.',
      image: "image1"},
    {
      id: 10,
      title: 'Adverse Weather Conditions',
      description: 'Adjust your driving behavior in adverse weather conditions such as rain, snow, or fog. Slow down, increase following distance, and use headlights as needed.',
      image: "image1"},
    // Add 10 more rules
    {
      id: 11,
      title: 'Obey Road Signs',
      description: 'Follow all road signs and markings. They provide important information about the road conditions, hazards, and regulations.',
      image: "image1"},
    {
      id: 12,
      title: 'Yield to Emergency Vehicles',
      description: 'When you see or hear emergency vehicles approaching with lights and sirens, yield the right of way and move to the side of the road to allow them to pass safely.',
      image: "image1" },
    {
      id: 13,
      title: 'Keep Your Vehicle Maintained',
      description: 'Regularly maintain your vehicle to ensure it is in good working condition. Check brakes, tires, lights, and other essential components regularly.',
      image: "image1"},
    {
      id: 14,
      title: 'Avoid Tailgating',
      description: 'Maintain a safe distance from the vehicle in front of you to avoid rear-end collisions. Tailgating increases the risk of accidents and reduces reaction time.',
      image: "image1" },
    {
      id: 15,
      title: 'Observe School Zones',
      description: 'Be extra cautious when driving in school zones. Watch out for children crossing the road and obey reduced speed limits during school hours.',
      image: "image1"},
    {
      id: 16,
      title: 'Use Headlights at Night',
      description: 'Always use headlights at night or in low visibility conditions. They help you see the road ahead and make your vehicle more visible to other drivers.',
      image: "image1" },
    {
      id: 17,
      title: 'Merge Safely',
      description: 'When merging onto a highway or changing lanes, signal your intention and merge safely into traffic. Yield to vehicles already on the highway.',
      image: "image1"},
    {
      id: 18,
      title: 'Observe No Parking Zones',
      description: 'Do not park in designated no parking zones. Blocking traffic flow or emergency access areas can result in fines and towing of your vehicle.',
      image: "image1"},
    {
      id: 19,
      title: 'Avoid Fatigue',
      description: 'Avoid driving when tired or drowsy. Fatigue impairs your ability to react quickly and make sound judgments, increasing the risk of accidents.',
      image: "image1"},
    {
      id: 20,
      title: 'Use Mirrors and Blind Spot Checks',
      description: 'Regularly check your mirrors and blind spots to be aware of vehicles around you. Use proper mirror adjustment and shoulder checks before changing lanes.',
      image: "image1"},
  ];

  return (
    <Container>
      
      <Row>
        {trafficRules.map(rule => (
          <Col key={rule.id} xs={12} md={6} lg={4} className="mb-4">
            <Card className='HomeCard'>
              <Card.Body>
                <Card.Title>{rule.title}</Card.Title>
                <Card.Text>{rule.description}</Card.Text>
                <Card.Img variant="top" src={rule.image} />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Rules;
