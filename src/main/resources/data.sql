--пользователи
INSERT INTO authority VALUES ('ROLE_ADMIN'),('ROLE_ANALYST'),
                             ('ROLE_TESTER'),('ROLE_DIRECTOR');
INSERT INTO role VALUES ('Rules everything','admin'),('Creates test cases','analyst'),
                        ('Performs test cases','tester'),('Approves the plan','director');
INSERT INTO role_authorities(authorities_name, role_title) VALUES ('ROLE_ADMIN','admin'),('ROLE_ANALYST','admin'),
                                  ('ROLE_TESTER','admin'),('ROLE_DIRECTOR','admin'),
                                  ('ROLE_ANALYST','analyst'),('ROLE_TESTER','tester'),
                                  ('ROLE_DIRECTOR','director');
--пароли формата admin-admin
INSERT INTO userr VALUES ('2',true,'admin','$2a$10$IxwXIodgb8Y5LfJ9LNAhf.3VpW8oVC954E0IBNrS76VKQC7chkxxK','admin'),
                         ('1',true,'director','$2a$10$RRwcXonX5z.GafLQ4H8pz.0KzLxtkMMV1Pbs51hQruLpaODgEjDte','director'),
                         ('3',true,'analyst','$2a$10$RJef5odVkEbE1mFrMIZfmet4f/JrLLEmDtdIPcgkFLwvMuejbSTJO','analyst'),
                         ('4',true,'tester','$2a$10$jiPCz.K8lA8q7XGvp5OaguLKg.QxjlZwcJnwFyMtyNvzSgzehVRci','tester'),
                         ('5',false,'inactive','$2y$10$qpuOza3wgD10NnOGi4jey.FquLv.cK6E8zYh2oVeBW2twb49fRkVm','tester');



--проекты
INSERT INTO project VALUES (1,'Test project');
INSERT INTO project VALUES (2,'Test project2');
INSERT INTO project VALUES (3,'Test project3');
INSERT INTO requirement VALUES (1,'Нужно протестировать ввод','Test project'),
                               (2,'Нужно протестировать отображение','Test project'),(3,'Нужно протестировать авторизацию','Test project');
INSERT INTO test_plan VALUES (true,3,1,'2024-12-24 12:00:00','2024-5-24 12:00:00','Test project','Тестирование ввода');
INSERT INTO test_plan VALUES (true,3,2,'2024-12-24 12:00:00','2024-5-24 12:00:00','Test project','Тестирование вывода');
INSERT INTO scenario VALUES (3,4,1,'Тестирование ввода таким-то пользователем');
INSERT INTO scenario VALUES (3,4,2,'Тестирование ввода сяким-то пользователем');
INSERT INTO scenario VALUES (3,4,3,'Тестирование ввода тем самым пользователем');
INSERT INTO test_case VALUES (3,1,'Ввести по порядку следующие цифры','1 2 3','3 2 1','Test project','Проверка ввода формы1');
INSERT INTO test_case VALUES (3,2,'Ввести по порядку следующие цифры','4 5 6','6 5 4','Test project','Проверка ввода формы2');
INSERT INTO test_case VALUES (3,3,'Ввести по порядку следующие цифры','7 8 9','9 8 7','Test project','Проверка ввода формы3');
INSERT INTO test_case VALUES (3,4,'Ввести по порядку следующие цифры','10 11 12','21 11 01','Test project','Проверка ввода формы4');
INSERT INTO test_case VALUES (3,5,'Ввести по порядку следующие цифры','13 14 15','51 41 31','Test project','Проверка ввода формы5');

INSERT INTO test_plan_scenarios VALUES (1,1);
INSERT INTO test_plan_scenarios VALUES (2,1);
INSERT INTO test_plan_scenarios VALUES (3,2);
INSERT INTO scenario_case_connection VALUES (false,1,false,1,1,null);
INSERT INTO scenario_case_connection VALUES (false,2,true,1,2,null);
INSERT INTO scenario_case_connection VALUES (false,3,true,2,3,null);
INSERT INTO scenario_case_connection VALUES (false,4,true,2,4,null);
INSERT INTO scenario_case_connection VALUES (false,5,false,3,5,null);
