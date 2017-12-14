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
 *
 *
 */

/* burn it */

$(function() {
    /* model : student model days */
    var model = {
        attendance: JSON.parse(localStorage.attendance),
        days: [],
        studentAttendday: {
            name: '',
            isAttend: []
        }
    };

    /* octopus */
    var octopus = {
/*        setDays: function(num) {
            console.log('setDays');
            for (var i = 1; i < num + 1; i++) {
                model.attendance.days.push(i);
            }
        },*/
/*        addDays: function(num) { 
            console.log('addDays');
            model.attendance.days.push(num);
        },
        addStudent: function(student) {
            console.log('addStudent');
            model.students.push(student);
        },*/
        getDays: function() {
            console.log('getDays');

            return 12;
        },
        getData: function() {
            console.log('getData');
            
            return model;
        },
        init: function(num) {
            console.log('octopus init');

            daysView.init();
            modelView.init();
        },
        updateAttendance: function(name, i) {
            console.log('updateAttendance');
            if (model[name][i]) {
                model[name][i] = false;
            } else {
                model[name][i] = true;
            }

            modelView.render(model);
        }
    };

    /* view : student view days view */
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
            topHead.insertAdjacentHTML('afterend', days);
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
/*                    inputCheckbox.click(function() {
                        var name = this.name;
                        var i = this.index;
                        console.log(name, i);
                        octopus.updateAttendance(name, i);
                    });*/


                    studentAttendTd.append(inputCheckbox);
                    studentTr.append(studentAttendTd);
                }
                // console.log(name, i);
                // console.log(col[name].length, studentTr.find('[checked]').length);
                var studentMissedTd = $(`<td class="missed-col"></td>`);
                studentTr.append(studentMissedTd);
                studentMissedTd.each(function() {
                    octopus.updateAttendance();
                    var missed = col[name].length - studentMissedTd.parent('tr').find('[checked]').length;
                    // console.log(studentMissedTd.parent().html());
                    studentMissedTd.text(missed);                    
                });
                studentsTbody.append(studentTr);
                // console.log(studentsTbody.html());
            }
        },
        /*update: function() {
            $('input').click(function() {
                return modelView.render;
            });
        }*/
    };

    octopus.init();
});


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

    // Check boxes, based on attendace records
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
