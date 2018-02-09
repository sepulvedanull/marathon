import * as d3 from 'd3'
import {selection, select} from 'd3-selection'
import 'd3-selection-multi'

export function showTooltip(d, i) {
  const mo = d3.mouse(d3.select("body").node());
  var x = mo[0] - 130;
  var y = mo[1] - document.body.scrollTop - 70;
  var txt = '<div>' + d.name + '</div><div class="position">Position overall: ' + d.position_overall + '</div><div class="time">Finishing time: ' + d.time_net + '</div>';

  d3.select("#" + this.id + " .shape").attr("stroke", "#000");
  d3.select("#tooltip-inside").html(txt);
  d3.select("#tooltip").style("left", x + "px").style("top", y + "px").style("display", "table");
  d3.select("#minutes-bg-" + timeToMinutes(d.time_net)).attr("opacity", .2);
}

export function hideTooltip(d, i) {
  d3.select("#minutes-bg-" + timeToMinutes(d.time_net)).attr("opacity", 0);
  d3.select("#" + this.id + " .shape").attr("stroke", "none");
  d3.select("#tooltip").style("display", "none");
}

export function xPos(d, gpr, w, csp) {
  return d.per_minute * (w + csp);
}

export function yPos(d, timeScale) {
  return timeScale(timeToMinutes(d.time_net));
}

export function timeToSeconds(timeStr) {
  const timeArr = timeStr.split(":"),
        H = +timeArr[0],
        M = +timeArr[1],
        S = +timeArr[2];
  let secs = H * 60 * 60 + M * 60 + S;

  if (isNaN(secs)) secs = 0;

  return secs;
}

export function timeToMinutes(timeStr) {
  const timeArr = timeStr.split(":"),
        H = +timeArr[0],
        M = +timeArr[1];
  let mins = H * 60 + M;

  if (isNaN(mins)) mins = 0;

  return mins;
}