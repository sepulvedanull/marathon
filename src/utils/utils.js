import {select, mouse} from 'd3-selection'


export function showTooltip(d, i) {
  const mo = mouse(select('body').node());
  const x = mo[0] - 130;
  const y = mo[1] - document.body.scrollTop - 70;
  const txt = `<div> ${d.name} </div><div class="position">Position overall: ${d.position_overall}</div><div class="time">Finishing time: ${d.time_net}</div>`;

  select(`#${this.id}  .shape`).attr('stroke', '#000');
  select('#tooltip-inside').html(txt);
  select('#tooltip').style("left", x + "px").style('top', y + 'px').style('display', 'table');
  select(`#minutes-bg-${timeToMinutes(d.time_net)}` ).attr('opacity', .2);
}

export function hideTooltip(d, i) {
  select(`#minutes-bg-${timeToMinutes(d.time_net)}` ).attr('opacity', 0);
  select(`#${this.id}  .shape`).attr('stroke', 'none');
  select('#tooltip').style('display', 'none');
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



export function compressArray(original) {
 
	var compressed = [];
	// make a copy of the input array
	var copy = original.slice(0);
 
	// first loop goes over every element
	for (var i = 0; i < original.length; i++) {
 
		var myCount = 0;	
		// loop over every element in the copy and see if it's the same
		for (var w = 0; w < copy.length; w++) {
			if (original[i] == copy[w]) {
				// increase amount of times duplicate is found
				myCount++;
				// sets item to undefined
				delete copy[w];
			}
		}
 
		if (myCount > 0) {
			var a = new Object();
			a.value = original[i];
			a.count = myCount;
			compressed.push(a);
		}
	}
 
	return compressed;
};
