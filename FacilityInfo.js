"use strict";

class FacilityInfo{
    constructor(id, startTime, endTime, facName, visitorInfo){
        this.id = id;
        this.startTime = startTime;
        this.endTime = endTime;
        this.facName = facName;
        this.visitorInfo = visitorInfo;
    }

    getTd(){
        var rows = "";
        rows += "<td>";
        rows += this.facName;
        rows += "</td>"
        rows += "<td>";
        rows += this.startTime;
        rows += " - "
        rows += this.endTime;
        rows += "</td>"
        return rows;
    }
    
}
