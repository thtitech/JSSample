"use strict";

class VisitorInfo{
    constructor(id, startTime, endTime, visitorName, visitorNum, staff, contactStaff){
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.visitorName = visitorName;
        this.visitorNum = visitorNum;
        this.staff = staff;
        this.contactStaff = contactStaff;
        this.facList = [];
        
    }

    addFac(facInfo){
        this.facList.push(facInfo);
    }

    getTd(){
        var rows = "";
        rows += "<td>";
        rows += this.startTime;
        rows += " - "
        rows += this.endTime;
        rows += "</td>"
        rows += "<td>";
        rows += this.visitorName;
        rows += "</td>"
        rows += "<td>";
        rows += this.visitorNum;
        rows += "</td>"
        rows += "<td>";
        rows += this.staff;
        rows += "</td>"
        rows += "<td>";
        rows += this.contactStaff;
        rows += "</td>"
        return rows;
    }
}
