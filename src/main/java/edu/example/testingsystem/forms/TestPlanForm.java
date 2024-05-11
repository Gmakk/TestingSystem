package edu.example.testingsystem.forms;

import edu.example.testingsystem.entities.Project;
import edu.example.testingsystem.entities.TestPlan;
import edu.example.testingsystem.security.WorkWithData;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

@Service
@Data
public class TestPlanForm {
    private String testPlanTitle;
    private String startDate;//2024-05-09
    private String endDate;

    public TestPlan toTestPlan(Project project){
        Date startDateFormatted = new Date();
        Date endDateFormatted = new Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        try {
            startDateFormatted = formatter.parse(startDate);
            endDateFormatted = formatter.parse(endDate);
        }
        catch (ParseException e) {
            e.printStackTrace();
        }

        return new TestPlan(null,startDateFormatted,endDateFormatted,testPlanTitle,WorkWithData.getCurrentUser(),false,null,project);

    }
}
