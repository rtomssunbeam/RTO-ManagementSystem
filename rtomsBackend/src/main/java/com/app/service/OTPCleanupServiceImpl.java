package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.daos.EmailSenderServiceDao;

@Service
public class OTPCleanupServiceImpl implements OTPCleanupService{

	@Autowired
	private final EmailSenderServiceDao emailSenderServiceDao;
	//private final TaskScheduler taskScheduler;
	
	@Autowired
    public OTPCleanupServiceImpl(EmailSenderServiceDao emailSenderServiceDao) { //,TaskScheduler taskScheduler
        this.emailSenderServiceDao = emailSenderServiceDao;
        //this.taskScheduler = taskScheduler;
    }
    
//	@PostConstruct
//    public void scheduleCleanupTask() {
//        taskScheduler.scheduleAtFixedRate(this::cleanupExpiredOtpRecords, 5 * 60 * 1000);
//    }
	
	
	@Transactional//@Scheduled(cron = "0 */5 * * * *")// Execute daily at midnight
//	@Scheduled(fixedRate = 10000)// 5 minutes in milliseconds (fixedDelay = 5 * 60 * 1000)
	@Scheduled(cron="@daily")
	@Override
	public void cleanupExpiredOtpRecords() {
		emailSenderServiceDao.deleteExpiredRecords();
	}

}


 //  @Scheduled => used to schedule a method to be executed at fixed intervals 
 //                  or according to a specific cron expression.

//When we write @Scheduled is 'cron', 'fixedDelay(String)', or 'fixedRate(String)' attributes is required


//******************************** ALTERNATE SOLUTION ******************************************************//


 // Cron expression  => allows you to define when the method should run by specifying minute, 
 //                     hour, day of the month, month, day of the week, and year values.

//"0 0 0 * * ?"   =>  This is a cron expression that specifies a time of day. 
//                      It means "execute at midnight (00:00) every day."

//   0     =>  Represents the value for the minute field. 
//             In this case, it's set to zero, indicating the start of the hour.

//   0     => Represents the value for the hour field. It's set to zero, indicating midnight.

//   0     => Represents the value for the day of the month field. 
//            It's set to zero, indicating any day of the month.

//   *     =>  Represents the value for the month field. It's set to *, indicating any month

//   *     =>  Represents the value for the day of the week field. 
//             It's set to *, indicating any day of the week.

//   ?     =>  Used in Quartz cron expressions to represent the "no specific value" or 
//             "don't care" condition for a field. It's often used in place of the day 
//             of the week field when the day of the week isn't important.
