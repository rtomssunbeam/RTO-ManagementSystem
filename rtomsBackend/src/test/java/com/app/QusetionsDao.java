package com.app;

import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import com.app.daos.QuestionDao;
import com.app.entities.Question;


@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
class QusetionsDao {
	
	@Autowired
	private QuestionDao questionDao;

	@Test
	@Rollback(false)
	void addQuestions() {
		
		List<Question>list=questionDao.saveAll(listOfQuestions());
		
		assertEquals(listOfQuestions().size(), list.size());
		
	}
	
	List<Question> listOfQuestions()
	{
		List<Question> list = new ArrayList<Question>();
		
		list.addAll(Arrays.asList(
			    new Question("What color are stop signs?", "Red", "Blue", "Yellow", "Green", "a"),
			    new Question("What does a yield sign indicate?", "Speed up", "Stop", "Slow down", "Proceed with caution", "d"),
			    new Question("What does a solid yellow line on the road indicate?", "No passing allowed", "Passing allowed with caution", "Passing allowed in one direction", "Passing allowed in both directions", "a"),
			    new Question("What is the purpose of a speed bump?", "To slow down traffic", "To indicate a pedestrian crossing", "To mark a railway crossing", "To guide traffic in the right direction", "a"),
			    new Question("When should you use your hazard lights?", "To indicate a turn", "To signal other drivers of a problem", "To increase visibility in fog", "To park illegally", "b"),
			    new Question("What should you do if you witness a traffic accident?", "Ignore it and continue driving", "Stop and provide assistance if possible", "Honk your horn to warn other drivers", "Drive around the accident scene", "b"),
			    new Question("What does a broken white line on the road indicate?", "No passing allowed", "Passing allowed with caution", "Passing allowed in one direction", "Passing allowed in both directions", "b"),
			    new Question("What should you do if you encounter black ice on the road?", "Accelerate to maintain control", "Brake suddenly", "Steer gently in the direction of the skid", "Honk your horn to alert other drivers", "c"),
			    new Question("What does a yellow diamond-shaped sign with a pedestrian symbol indicate?", "School zone", "Playground area", "Pedestrian crossing", "Bicycle lane", "c"),
			    new Question("What should you do if you miss your exit on a freeway?", "Stop and reverse", "Continue to the next exit and turn around", "Make a U-turn", "Pull over and wait for assistance", "b"),
			    new Question("What does a flashing yellow traffic light mean?", "Stop and wait for the light to turn green", "Proceed with caution", "Stop and yield to all traffic", "Slow down and prepare to stop", "b"),
			    new Question("What should you do when approaching a roundabout?", "Stop and wait for other vehicles to pass", "Enter the roundabout without slowing down", "Yield to vehicles already in the roundabout", "Honk your horn to signal your presence", "c"),
			    new Question("What does a double solid yellow line on the road indicate?", "Passing allowed in both directions", "Passing allowed with caution", "No passing allowed", "Passing allowed in one direction", "c"),
			    new Question("What is the maximum speed limit in a residential area?", "40 mph", "50 mph", "20 mph", "60 mph", "c"),
			    new Question("What is the purpose of a yield sign?", "To indicate a pedestrian crossing", "To warn of a potential hazard", "To indicate the end of a road", "To give the right-of-way to other vehicles", "d"),
			    new Question("What should you do if your vehicle starts to skid on a slippery road?", "Apply the brakes firmly", "Steer in the opposite direction of the skid", "Accelerate to regain control", "Turn off the engine", "b"),
			    new Question("What does a white rectangular sign with black letters indicate?", "Warning of a railroad crossing", "Regulatory information", "Directional guidance", "Information about nearby attractions", "b"),
			    new Question("What should you do when driving in foggy conditions?", "Turn on your high beams", "Follow closely to the vehicle in front of you", "Use low beams and fog lights", "Speed up to reach your destination quickly", "c"),
			    new Question("What should you do when approaching a stopped emergency vehicle with its lights flashing?", "Move to the left and pass quickly", "Slow down and move over to the adjacent lane if possible", "Ignore the vehicle and continue driving", "Honk your horn to alert the driver", "b"),
			    new Question("What should you do if you are involved in a minor traffic collision with no injuries?", "Exchange information with the other driver and notify the police", "Leave the scene without stopping", "Take pictures of the damage and leave", "Continue driving as if nothing happened", "a")

			));
		
		return list;
	}

}
