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
    var model = JSON.parse(localStorage.attendance);

    /* octopus */
    var octopus = {
/*        setDays: function(num) {
            console.log('setDays');
            for (var i = 1; i < num + 1; i++) {
                model.attendance.days.push(i);
            }
        },*/
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
            
            return model;
        },
        init: function(num) {
            console.log('octopus init');

            daysView.init();
            modelView.init();
        },
        updateAttendance: function() {
            console.log('updateAttendance');
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
            console.log(col);

            this.render(col);
        },
        render: function(col) {
            console.log('modelView render');
            // var students = '';
            var studentsBody = $('tbody')[0];
            var studentRows = '',
                newStudentRow = '';
            for (var name in col) {
                var inputCols = '';
                var studentRow = document.createElement('tr');
                var studentNameCol = `<td class="name-col">${name}</td>`;
                for (var value in col[name]) {
                    var input = `<input type="checkbox">`;
                    // var input = document.createElement('input');
                    // input.type = "checkbox";
/*                    $(input).click(function(this) {

                    });*/
                    var inputCol = `<td class="attend-col">${input}</td>`;
                    inputCols += inputCol;
                }
                studentRow.innerHTML = studentNameCol + inputCols;
                console.log(studentRow);
                $(studentsBody).append(studentRow);
                // console.log(studentRows);
            
                // var studentName = `<td class="name-col">${col[i]}</td>`;
                // nameCol[i + 1].insertAdjacentHTML('afterend', studentName);
            }
            // studentsBody.insertAdjacentHTML('afterbegin', studentRows);
        }
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
