# school-attendance
 ## 第一版，思路：
 1. 对方表结构是：建立以名字为基础的出勤表。
     如：获取名字，然后随机12天的出勤（）
 
 ## 第二版，思路变化，
 1. 从小功能做起，显示一个学生的出勤。
 2. 表格渲染，为了使表格不出现异形，需要统一的行列
 3. 将渲染分为：
     1、表头渲染
     2、出勤内容渲染
     3、缺席列渲染（由于出勤内容改动，仅需要刷新缺席列，甚至应该是此单元格。其他位置不需要重新渲染，
        以此减少浏览器负荷，可惜能力有限，暂未想到更好方式）
 ## 功能
 1. 仅可以设定天数（通过octopus中setDays()实现）
 2. 添加人员等下一版实现
