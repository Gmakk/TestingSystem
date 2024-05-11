--пользователи
INSERT INTO authority VALUES ('ROLE_ADMIN'),('ROLE_ANALYST'),
                             ('ROLE_TESTER'),('ROLE_DIRECTOR');
INSERT INTO role VALUES ('Rules everything','admin'),('Creates test cases','analyst'),
                        ('Performs test cases','tester'),('Approves the plan','director');
INSERT INTO role_authorities VALUES ('ROLE_ADMIN','admin'),('ROLE_ANALYST','analyst'),
                                  ('ROLE_TESTER','tester'),('ROLE_DIRECTOR','director');
INSERT INTO userr VALUES ('2','admin','$2a$10$IxwXIodgb8Y5LfJ9LNAhf.3VpW8oVC954E0IBNrS76VKQC7chkxxK','admin'),
                         ('1','director','$2a$10$RRwcXonX5z.GafLQ4H8pz.0KzLxtkMMV1Pbs51hQruLpaODgEjDte','director'),
                         ('3','analyst','$2a$10$RJef5odVkEbE1mFrMIZfmet4f/JrLLEmDtdIPcgkFLwvMuejbSTJO','analyst'),
                         ('4','tester','$2a$10$jiPCz.K8lA8q7XGvp5OaguLKg.QxjlZwcJnwFyMtyNvzSgzehVRci','tester');



--проекты
INSERT INTO project VALUES (1,'Набор требований для проекта','Test project');
INSERT INTO test_plan VALUES (false,3,1,'2024-12-24 12:00:00','2024-5-24 12:00:00','Test project','Тестирование ввода');
INSERT INTO scenario VALUES (3,4,1,'Тестирование ввода таким-то пользователем');
INSERT INTO test_case VALUES (3,1,'Ввести по порядку следующие цифры','1 2 3','3 2 1','Test project','Проверка ввода формы');



INSERT INTO scenario_case_connection VALUES (1,false,1,1,null);
INSERT INTO test_plan_scenarios VALUES (1,1);