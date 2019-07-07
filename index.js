"use strict";

var vColumnNum = 5;
var fColumnNum = 2;
var vinfoList = [];
var vinfoMap = {};
var finfoList = [];

// when load
$(document).ready(function(){
    parseTable();
    console.log(finfoList);
    showTable();
});

//when bottun click
$(function() {
    $("#search-btn").click(function(){
        // GET request example
        var url = "index.html?";
        // start time
        var startH = $("#startH").val();
        var startM = $("#startM").val();
        url += "startH=";
        url += startH;
        url += "&startM=";
        url += startM;
        // end time
        var endH = $("#endH").val();
        var endM = $("#endM").val();
        url += "&endH=";
        url += endH;
        url += "&endM=";
        url += endM;
        // fac
        var fac = $('[name="fac"] option:selected').val();
        url += "&facId=";
        url += fac;
        window.location.href = url;
    });    
});

// utility functions
function getParam(name) {
    var url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));    
}

function parseTable(){
    //set vinfoList, findoList
    var fid = getParam("facId");
    var startHour = getParam("startH");
    var startMinute = getParam("startM");
    var endHour = getParam("endH");
    var endMinute = getParam("endM");

    if(startHour == null || startHour == ""){
        startHour = 0;
    }
    if(startMinute == null || startMinute == ""){
        startMinute = 0;
    }
    if(endHour == null || endHour == ""){
        endHour = 23;
    }
    if(endMinute == null || endMinute == ""){
        endMinute = 59;
    }
    
    $("#info-table tr").each(function(i, e){
        if(i != 0){
            var rows = $(this).find('td');
            makeInstance(rows, fid, startHour, startMinute, endHour, endMinute);
        }
    });
}

function makeInstance(rows, fid, startHour, startMinute, endHour, endMinute){
    // TODO: change index
    var vid = rows[0].innerText;
    var vinfo;
    var startDate = new Date(2000, 1, 1, startHour, startMinute, 0);
    var endDate = new Date(2000, 1, 1, endHour, endMinute, 0);
    
    // create or not
    var array;
    if(fid == null || fid == "-1"){
        // filter VisitorInfo time
        array = rows[1].innerText.split(":");
    }else{
        // filter FacilityInfo time
        array = rows[9].innerText.split(":");
        if(rows[7].innerText != fid){
            return;
        }
    }
    var visitorDate = new Date(2000, 1, 1, Number(array[0]), Number(array[1]), 0);
    if(startDate.getTime() > visitorDate.getTime() ||
       endDate.getTime() < visitorDate.getTime()){
        return;
    }

    //make instance
    // visitor info
    if(vid in vinfoMap){
        vinfo = vinfoMap[vid];
    }else{
        vinfo = new VisitorInfo(rows[0].innerText, rows[1].innerText,
                                rows[2].innerText, rows[3].innerText,
                                rows[4].innerText, rows[5].innerText,
                                rows[6].innerText);
        vinfoMap[vid] = vinfo;
        vinfoList.push(vinfo);
    }
    
    //facility info
    if(rows[7].innerText != "-"){
        var finfo = new FacilityInfo(rows[7].innerText, rows[9].innerText,
                                     rows[10].innerText, rows[8].innerText, vinfo);
        finfoList.push(finfo);
        vinfo.addFac(finfo);
    }
}

function showTable(){
    var fid = getParam("facId");
    if(fid != null && fid != "-1"){
        finfoList.sort(function(o1, o2){
            var a1 = o1.startTime.split(":");
            var tmp1 = new Date(2000, 1, 1, Number(a1[0]), Number(a1[1]), 0);
            var a2 = o2.startTime.split(":");
            var tmp2 = new Date(2000, 1, 1, Number(a2[0]), Number(a2[1]), 0);
            return (tmp1.getTime() > tmp2.getTime()) ? 1 : -1;
        });
        showTableWithFac();
    }else{
        showTableWithVis();
    }
}

function showTableWithFac(){
    var target = $("#show-table");
    var prevId = null;
    var rows = "";
    
    for(var i = 0; i < finfoList.length; i++){
        var finfo = finfoList[i];
        console.log(finfo);
        rows += "<tr>";
        if(prevId != finfo.visitorInfo.id){
            rows += finfo.visitorInfo.getTd();
            prevId = finfo.visitorInfo.id;
        }else{
            for(var k = 0; k < vColumnNum; k++){
                // empty td
                rows += "<td>";
                rows += "</td>";
            }
        }
        rows += finfo.getTd();
        rows += "</tr>";
    }
    target.append(rows);
}

function showTableWithVis(){
    var target = $("#show-table");
    var rows = "";
    // make rows
    for(var i = 0; i < vinfoList.length; i++){
        rows += "<tr>";
        var vinfo = vinfoList[i];
        // show vinfo
        rows += vinfo.getTd();
        if(vinfo.facList.length == 0){
            for(var j = 0; j < fColumnNum; j++){
                rows += "<td>";
                rows += "-"
                rows += "</td>";
            }
            rows += "</tr>";
        }else{
            for(var j = 0; j < vinfo.facList.length; j++){
                rows += vinfo.facList[j].getTd();
                rows += "</tr>";
                if(j == vinfo.facList.length-1){
                    break;
                }
                rows += "<tr>";
                for(var k = 0; k < vColumnNum; k++){
                    // empty td
                    rows += "<td>";
                    rows += "</td>";
                }
            }
        }
    }
    target.append(rows);    
}


