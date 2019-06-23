"use strict";

class VisitInfo{
    constructor(startTime, endTime, visitorName){
        this.startTime = startTime;
        this.endTime = endTime;
        this.visitorName = visitorName;
        this.facList = [];
    }

    addFac(facInfo){
        this.facList.push(facInfo);
    }
}

class FacilityInfo{
    constructor(startTime, endTime, facName, visitorInfo){
        this.startTime = startTime;
        this.endTime = endTime;
        this.facName = facName;
        this.visitorInfo = visitorInfo;
    }
}

var vinfo1 = new VisitInfo("10:00", "15:00", "太郎");
var vinfo2 = new VisitInfo("12:00", "16:00", "次郎");
var vinfo3 = new VisitInfo("16:00", "18:00", "三郎");

var finfo1 = new FacilityInfo("10:00", "12:00", "会議室A", vinfo1);
var finfo2 = new FacilityInfo("12:00", "13:00", "会議室B", vinfo1);
var finfo3 = new FacilityInfo("13:00", "14:00", "会議室A", vinfo1);
vinfo1.addFac(finfo1);
vinfo1.addFac(finfo2);
vinfo1.addFac(finfo3);
var finfo4 = new FacilityInfo("12:00", "13:00", "会議室A", vinfo2);
var finfo5 = new FacilityInfo("13:00", "14:00", "会議室B", vinfo2);
vinfo2.addFac(finfo4);
vinfo2.addFac(finfo5);

var g_vinfoList = [vinfo1, vinfo2, vinfo3];
var g_finfoList = [finfo1, finfo2, finfo3, finfo4, finfo5];

var fColumNum = 3;
var vColumNum = 3;

function filtering(){
    var startTime = $("#start-time").val();
    var endTime = $("#end-time").val();
    var fac = $('[name="fac"] option:selected').val();
    console.log(fac);
}


function addVinfo(rows, vinfo){
    rows += "<td>";
    rows += vinfo.startTime;
    rows += "</td>"
    rows += "<td>";
    rows += vinfo.endTime;
    rows += "</td>"
    rows += "<td>";
    rows += vinfo.visitorName;
    rows += "</td>"
    return rows;
}

function addFinfo(rows, finfo){
    rows += "<td>";
    rows += finfo.facName;
    rows += "</td>"
    rows += "<td>";
    rows += finfo.startTime;
    rows += "</td>"
    rows += "<td>";
    rows += finfo.endTime;
    rows += "</td>"
    return rows;
}

function makeTable(vinfoList, finfoList){
    //var targetTable = $("#test-table");
    $("#test-table").remove();
    var rows = "<table id='test-table'>";
    // make rows
    for(var i = 0; i < vinfoList.length; i++){
        rows += "<tr>";
        var vinfo = vinfoList[i];
        // show vinfo
        rows = addVinfo(rows, vinfo);

        //console.log(vinfo);
        
        if(vinfo.facList.length == 0){
            for(var j = 0; j < fColumNum; j++){
                rows += "<td>";
                rows += "-"
                rows += "</td>";
            }
            rows += "</tr>";
        }else{
            for(var j = 0; j < vinfo.facList.length; j++){
                rows = addFinfo(rows, vinfo.facList[j]);
                //console.log(vinfo.facList[j]);
                rows += "</tr>";
                if(j == vinfo.facList.length-1){
                    break;
                }
                rows += "<tr>";
                for(var k = 0; k < vColumNum; k++){
                    rows += "<td>";
                    rows += "</td>";
                }
            }
        }
    }
    rows += "</table>"
    //targetTable.append(rows);
    $("body").append(rows);
}

$(document).ready(function(){
    makeTable(g_vinfoList, g_finfoList)
});

