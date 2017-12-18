/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col'),
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());
/* 思路：
 * 1、对方表结构是：建立以名字为基础的出勤表。
 *     如：获取名字，然后随机12天的出勤（）
 * 
 * 思路变化，
 * 1、从小功能做起，显示一个学生的出勤。
 * 2、表格渲染，为了使表格不出现异形，需要统一的行列
 * 3、将渲染分为：
 *     1、表头渲染
 *     2、出勤内容渲染
 *     3、缺席列渲染（由于出勤内容改动，仅需要刷新缺席列，甚至应该是此单元格。其他位置不需要重新渲染，
 *        以此减少浏览器负荷，可惜能力有限，暂未想到更好方式）
 */

/* mov */

$(function(){
    /* model 获取随机出勤数据，添加出勤天数（此因素影响表格格式）*/
    var model = {
        days: 0,
        attendance: JSON.parse(localStorage.attendance)
    };
    /* octopus 流程及数据控制单元*/
    var octopus = {
        /* 获取出勤数据 */
        getAttendance: function() {
            return model.attendance;
        },
        /* 获取这个名字的出勤数据 */
        getCurrentAttendance: function(name) {
            /* 名字必须非空 */
            if (name) {
                var currentAttendance = model.attendance[name];
                var moreDays = this.getDays() - currentAttendance.length;
                if (moreDays > 0) {
                    for (var i = 0; i < moreDays; i++) {
                        currentAttendance.push(false);
                    }
                }
                return currentAttendance;                
            }
        },
        updateAttendance: function(name, i) {
            // 更新出勤变动
            if (model.attendance[name][i]) {
                model.attendance[name][i] = false;
            } else {
                model.attendance[name][i] = true;
            }
            // 更新完成，需要从新渲染
            missedView.render();

        },
        // 获取出勤天数
        getDays: function() {
            return model.days;
        },
        // 初始化时，设定出勤天数
        setDays: function(num) {
            model.days = num;           
        },
        // 初始化
        init: function() {
            tableHeadView.init();
            tableBodyView.init();
            missedView.init();
        },
        // 获取缺席数据，根据当前展示天数计算，更加合理
        getMissed: function(name, days) {
            var missed = 0;
            var student = this.getCurrentAttendance(name);
            for (var i = 0; i < days; i++) {
                if (!student[i]) {
                    missed++;
                }
            }
            return missed;
        },
        // 添加学生出勤数据
        addAttendance: function(name) {
            var attendance = this.getAttendance();;
            attendance[name] = [];
            var days = this.getDays();
            for (var i = 0; i < days.length; i++) {
                attendance[name].push(false);
            }
            tableBodyView.render(name);
        }
    };
    // 表头
    var tableHeadView = {
        // 初始化
        init: function() {
            octopus.setDays(16);
            this.render();
        },
        // 渲染
        render: function() {
            var days = octopus.getDays();
            var thRow = '';
            var thTr = $('thead').find('tr');
            var thBegin = $(`<th class="name-col">Student Name</th>`);
            for (var i = 1; i < days + 1; i++) {
                var th = `<th>${i}</th>`;
                thRow += th;
            }
            thTr.append(thBegin, thRow);
        }

    };
    // 出勤数据列
    var tableBodyView = {
        // 初始化
        init: function() {
            var that = this;
            // 获取姓名，此方法在其他浏览器可能不支持
            var names = Object.keys(octopus.getAttendance());
            names.forEach(function(name) {
                that.render(name);                
            });
        },
        // 渲染
        render: function(name) {
            console.log('tableBodyView render');
            var days = octopus.getDays();
            var tbody = $('tbody');
            var student = octopus.getCurrentAttendance(name);
            var trStudent = $(`<tr class="student"></tr>`);
            tbody.append(trStudent);
            var tdStudentName = $(`<td class="name-col">${name}</td>`);
            trStudent.append(tdStudentName);
            // var tdStudentAttendances = ``;
            // 这里使用let ecs6的关键字达到定位效果，否者就给input上this.index属性，达到同样效果
            for (let i = 0; i < days; i++) {
                var tdStudentAttendance = $(`<td class="attend-col"><input type="checkbox"></td>`);
                var checked = (student[i]? "checked": undefined);
                
                tdStudentAttendance.find('input').attr('checked', checked).click(function() {
                    octopus.updateAttendance(name, i);
                });
                trStudent.append(tdStudentAttendance);
            }
            var tdStudentMissed = $(`<td class="missed-col">0</td>`);
            var missed = octopus.getMissed(name);
            tdStudentMissed.text(missed);
            trStudent.append(tdStudentMissed);                

        }

    }
    // 缺席列渲染
    var missedView = {
        // 初始化
        init: function() {
            // 表头只需要渲染一次，但是这样感觉不合理，下一版再调整
            $('thead').children('tr').append(`<th class="missed-col">Days Missed-col</th>`);
            this.render();
        },
        // 渲染
        render: function() {
            var days = octopus.getDays();
            $('td.name-col').each(function() {
                var name = $(this).text();
                var missed = octopus.getMissed(name, days);
                console.log(missed);
                $(this).parent().find('.missed-col').text(missed);
            });
        }
    };

    octopus.init();
});







/* burn it 

$(function() {
     model : student model days 
    var model = {
        attendance: JSON.parse(localStorage.attendance),
        days: [],
        studentAttendday: {
            name: '',
            isAttend: []
        }
    };

     octopus 
    var octopus = {
        setDays: function(num) {
            console.log('setDays');
            for (var i = 1; i < num + 1; i++) {
                model.attendance.days.push(i);
            }
        },
        addDays: function(num) { 
            console.log('addDays');
            model.attendance.days.push(num);
        },
        addStudent: function(student) {
            console.log('addStudent');
            model.students.push(student);
        },
        getDays: function() {
            console.log('getDays');

            return 12;
        },
        getData: function() {
            console.log('getData');
            
            return model.attendance;
        },
        init: function(num) {
            console.log('octopus init');

            daysView.init();
            modelView.init();
        },
        updateAttendance: function(name, i) {
            console.log('updateAttendance');
            if (model.attendance[name][i]) {
                model.attendance[name][i] = false;
            } else {
                model.attendance[name][i] = true;
            }

            modelView.render(model.attendance);
        }
    };

    view : student view days view
    var daysView = {
        init: function() {
            console.log('daysView init');
            // octopus.setDays(12);
            var row = octopus.getDays();
            this.render(row);
        },
        render: function(row) {
            console.log('daysView render');
            var days = '';
            var topHead = $('th.name-col')[0];
            for (var i = 0; i < row; i++) {
                var day = `<th>${i + 1}</th>`;
                days += day; 
            }
            // topHead.insertAdjacentHTML('afterend', days);
            $(topHead).after(days);
        }
    };

    var modelView = {
        init: function() {
            console.log('modelView init');
            var col = octopus.getData();

            this.render(col);
        },
        render: function(col) {
            console.log('modelView render');
            var studentsTbody = $('tbody');
            studentsTbody.empty();
            for(var name in col) {
                // 第一层：行循环, 建立每一个 studentTr 形成 studentTrs
                // console.log('modelView render first floor');
                var studentTr = $('<tr></tr>');
                var studentNameTd = $(`<td class="name-col">${name}</td>`);
                studentTr.append(studentNameTd);
                for (var i = 0; i < col[name].length; i++) {
                    var studentAttendTd = $(`<td class="attend-col"></td>`);
                    var checked = (col[name][i]? "checked": undefined);
                    var inputCheckbox = $(`<input type="checkbox">`);
                    inputCheckbox.attr("checked", checked);
                    inputCheckbox.attr("name", name);
                    inputCheckbox.attr("index", i);

                    // 

                    // console.log(name, i);
                    inputCheckbox.click(function() {
                        var name = this.name;
                        var i = this.index;
                        console.log('inputCheckbox', this);
                        octopus.updateAttendance(name, i);
                    });


                    studentAttendTd.append(inputCheckbox);
                    studentTr.append(studentAttendTd);
                }
                // console.log(name, i);
                // console.log(col[name].length, studentTr.find('[checked]').length);
                var studentMissedTd = $(`<td class="missed-col"></td>`);
                studentTr.append(studentMissedTd);
                studentMissedTd.each(function() {
                    // octopus.updateAttendance();
                    var missed = col[name].length - studentMissedTd.parent('tr').find('[checked]').length;
                    // console.log(studentMissedTd.parent().html());
                    studentMissedTd.text(missed);                    
                });
                studentsTbody.append(studentTr);
                // console.log(studentsTbody.html());
            }
        },
        update: function() {
            $('input').click(function() {
                return modelView.render;
            });
        }
    };

    octopus.init();
});
*/

/* STUDENT APPLICATION */
/*$(function() {
    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendance records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });

    countMissing();
}());*/
