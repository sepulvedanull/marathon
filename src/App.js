import React, {Component} from 'react'
import {csv} from 'd3-fetch'
import {select} from 'd3-selection'
import {scaleLinear} from 'd3-scale'
import {range} from 'd3-array'
import 'd3-selection-multi'
import {hideTooltip, xPos, yPos, timeToSeconds, timeToMinutes} from './utils/utils.js'
import data from './data/stjude_marathon_data.csv'
import {RadioGroup, Radio} from 'react-radio-group'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedValue: 'default'
    }
  }

  componentDidMount = () => {
    this.createViz()
  }
  componentDidUpdate = () => {
    this.createViz()
  }

  handleFilterChange = (state) => {
    this.setState({selectedValue: state})
  }

  createViz = () => {

    let colorFilter = this.state.selectedValue;
    csv(data).then(function (data) {
      ready(data);
    })

    const transitionDuration = 1000,
        w = 8,
        csp = 2,
        rsp = 2,
        gpr = 100, // Groups per row
        colorOption = 'gender';

    let svg = this.node;

    function ready(results) {

      // const minMinutes = timeToMinutes(results[0].time_net),
      const minMinutes = 150,
          maxMinutes = timeToMinutes(results[results.length - 1].time_net),
          minHours = +((minMinutes / 60).toFixed(2)),
          maxHours = Math.round(maxMinutes / 60);

      const scaleTicks = range(120, 490, 30), // (start: 135min, stop:361min, step: 15min)
          scaleTicksData = [];

      const margin = {top: 60, right: 10, bottom: 20, left: 100},
          width = 960 - margin.left - margin.right,
          height = ((maxHours - minHours) * 60 * (rsp + w)) - margin.top - margin.bottom;

      select(svg)
          .attrs({
            'height': 800,
            'width': height + margin.top + margin.bottom
          })

      const timeScale = scaleLinear().domain([minHours * 60, maxHours * 60]).range([0, height]);

      const mainContainer = select(svg).append("g").attrs({
        'id': 'container-main',
        'transform': `translate(100, 710) rotate(270)`
      });

      const scaleContainer = select(svg).append("g").attrs({
        'id': 'container-scale',
        'transform': `translate(100, 805) rotate(270)`
      });

      let gender = 0, // 0 = male, 1 = female
          gender_counter = [1, 1],
          per_minute = [];

      for (let i = 0; i < 470; i++) {
        per_minute.push(0);
      }

      scaleTicks.forEach((d) => scaleTicksData.push({"mins": d, "runners_below": 0}));

      let runners_below = 0,
          next_time_below = scaleTicksData[1].mins,
          time_below_i = 0;

      results.forEach((d) => {
        gender = d.sex === 'M' ? 0 : 1;
        gender_counter[gender] = d.position_gender;
        d.gender = gender === 1 ? "f" : "m";
      });

      results.sort((a, b) => timeToSeconds(a.time_net) - timeToSeconds(b.time_net));

      results.forEach((d) => {
        let time_in_minutes = timeToMinutes(d.time_net);
        d.per_minute = per_minute[time_in_minutes];
        per_minute[time_in_minutes] += 1;
        if (time_in_minutes > next_time_below) {
          scaleTicksData[time_below_i].runners_below = runners_below;
          time_below_i += 1;
          next_time_below = scaleTicksData[time_below_i].mins;

        }
        runners_below += 1;
      });
      results.sort((a, b) => a.position_overall - b.position_overall);
      scaleTicksData[scaleTicksData.length - 1].runners_below = results.length;

      drawShapes(results, mainContainer, timeScale, colorOption, per_minute);
      drawScale(scaleContainer, timeScale, margin, minMinutes, scaleTicksData);
      drawTooltip(results, mainContainer)
      // drawLegend();
    }

    function drawTooltip(results, mainContainer) {

    }

    function drawShapes(results, mainContainer, timeScale, colorOption, per_minute) {
      mainContainer.selectAll("rect.minutes-bg")
          .data(per_minute)
          .enter()
          .append('rect')
          .attrs({
            'class': 'minutes-bg',
            'id': (d, i) => `minutes-bg-${i}`,
            'width': (d) => (w + csp) * d,
            'height': w + 1,
            'opacity': 0,
            'x': -w / 2 - csp / 2,
            'y': (d, i) => timeScale(i) + .5
          })
      let gRunners = mainContainer.selectAll("g")
          .data(results, (d) => d.position_overall)
          .enter()
          .append("g")
          .attrs({
            'class': 'runner',
            'id': (d) => `runner-${d.position_overall}`,
            'transform': (d) => `translate(${xPos(d, gpr, w, csp)}, ${yPos(d, timeScale, w, rsp)})`
          })
          .on('mouseover', drawLegend)
          .on('mouseout', hideTooltip);

      gRunners.selectAll('rect.bg-under')
          .data((d) => [d])
          .enter()
          .append("rect")
          .attrs({
            'width': w + csp,
            'height': w + rsp,
            'x': -w / 2 - csp / 2,
            'y': csp / 2,
            'opacity': 0,
            'fill': '#FFF'
          });

      let gRunnersShapes = gRunners.selectAll("circle.shape")
          .data((d) => [d])
          .enter()
          .append("circle")
          .attrs({
            'r': w / 2,
            'cx': 0,
            'cy': w / 2 + csp / 2,
            'opacity': 1,
            'fill': '#CCC',
            'class': 'shape'
          })
      select(`#toggle-${colorOption}`).classed('selected', true);

      changeState(gRunnersShapes);
    }

    function drawScale(scaleContainer, timeScale, margin, minMinutes, scaleTicksData) {
      // scaleContainer
      //   .append("text")
      //   .attrs({
      //     'x': margin.left - 15,
      //     'y': -18,
      //     'text-anchor': 'end',
      //     'font-size': '12px',
      //     'font-weight': 'bold'
      //   })
      //   .text("Net finish time");

      let gScaleTicks = scaleContainer.selectAll("g.tick")
          .data([{"mins": minMinutes, "runners_below": 0}].concat(scaleTicksData), function (d) {
            return d.mins;
          })
          .enter()
          .append("g")
          .attrs({
            'class': 'trick',
            'opacity': 0,
            'transform': (d) => "translate(0," + timeScale(d.mins) + ")"
          })

      gScaleTicks.selectAll("line")
          .data((d) => [d])
          .enter()
          .append("line")
          .attrs({
            'x1': margin.left - 20,
            'y1': 0,
            'x2': margin.left - 10,
            'y2': 0,
            'stroke': '#000'
          })
      gScaleTicks.selectAll("text.hours")
          .data((d) => [d])
          .enter()
          .append("text")
          .attrs({
            'text-anchor': 'end',
            'x': margin.left - 25,
            'y': 4,
            'class': 'hours',
            'font-size': '11px'
          })
          .text((d) => `${Math.floor(d.mins / 60)} hours`);
      gScaleTicks.selectAll("text.minutes")
          .data((d) => [d])
          .enter()
          .append("text")
          .attrs({
            'text-anchor': 'end',
            'x': margin.left - 25,
            'y': 18,
            'class': 'minutes',
            'font-size': '11px'
          })
          .text((d) => {
            let M = d.mins % 60;
            if (M === 0) return "";
            return M + " minutes";
          });
      gScaleTicks
          .transition()
          .duration(transitionDuration)
          .attrs({
            'opacity': 1,
            'transform': (d) => `translate(0, ${timeScale(d.mins)})`
          })
      gScaleTicks
          .exit()
          .remove();
    }

    function drawLegend(d) {
      const legendText = `<h3 style="color:${d.gender === 'm' ? '#66A9BA' : '#F7941D'}"> ${d.name} </h3><p>Position: <strong>${d.position_overall}</strong></p><p>Finishing time: <strong>${d.time_net}</strong></p>`;
      select("#legend").html(legendText);
    }

    function changeState(gRunnersShapes) {
      if (colorFilter === 'default') {
        gRunnersShapes
            .transition()
            .delay(0)
            .duration(transitionDuration)
            .attr("fill", (d) => '#92193A')
      } else if (colorFilter === 'gender') {
        gRunnersShapes
            .transition()
            .delay(0)
            .duration(transitionDuration)
            .attr("fill", (d) => (d.gender === 'm' ? '#0080A7' : '#28A873'))
      }

      else if (colorFilter === 'boston') {
        gRunnersShapes
            .transition()
            .delay(0)
            .duration(transitionDuration)
            .attr("fill", function (d) {
              if (d.gender === 'm') {
                if (d.age >= '18' && d.age <= '34') {
                  if (d.time_net <= '3:05:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '35' && d.age <= '39') {
                  if (d.time_net <= '3:10:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '40' && d.age <= '44') {
                  if (d.time_net <= '3:15:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '45' && d.age <= '49') {
                  if (d.time_net <= '3:25:00') {
                    return '#162F77'
                  }
                } else if (d.age >= '50' && d.age <= '54') {
                  if (d.time_net <= '3:30:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '55' && d.age <= '59') {
                  if (d.time_net <= '3:40:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '60' && d.age <= '64') {
                  if (d.time_net <= '3:55:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '65' && d.age <= '69') {
                  if (d.time_net <= '4:10:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '70' && d.age <= '74') {
                  if (d.time_net <= '4:25:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '75' && d.age <= '79') {
                  if (d.time_net <= '4:40:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '80') {
                  if (d.time_net < '4:55:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else {
                  return '#CCC'
                }
              }
              if (d.gender === 'f') {
                if (d.age >= '18' && d.age <= '34') {
                  if (d.time_net <= '3:35:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '35' && d.age <= '39') {
                  if (d.time_net <= '3:40:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '40' && d.age <= '44') {
                  if (d.time_net <= '3:45:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '45' && d.age <= '49') {
                  if (d.time_net <= '3:55:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '50' && d.age <= '54') {
                  if (d.time_net <= '4:00:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '55' && d.age <= '59') {
                  if (d.time_net <= '4:10:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '60' && d.age <= '64') {
                  if (d.time_net <= '4:25:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '65' && d.age <= '69') {
                  if (d.time_net <= '4:40:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '70' && d.age <= '74') {
                  if (d.time_net <= '4:55:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '75' && d.age <= '79') {
                  if (d.time_net <= '5:10:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else if (d.age >= '80') {
                  if (d.time_net < '5:25:00') {
                    return '#162F77'
                  }
                  else {
                    return '#CCC'
                  }
                } else {
                  return '#CCC'
                }
              } else {
                return '#CCC'
              }
            })
      }

    }
  }

  render() {
    return (
        <div className="canvas-container">
          <div className="canvas-header">
            <h1><strong>St. Jude</strong> Memphis Marathon Weekend</h1>
            <div className="canvas-filters">
              <RadioGroup name="runner-filters" selectedValue={this.state.selectedValue}
                          onChange={this.handleFilterChange}>
                <label>
                  <Radio value="default"/> Default view
                </label>
                <label>
                  <Radio value="boston"/> Boston Marathon qualifiers
                </label>
                <label>
                  <Radio value="gender"/> Male & Female finishers
                </label>
              </RadioGroup>
            </div>
          </div>

          <div className="canvas">
            <svg ref={node => this.node = node}></svg>
          </div>
          <div className="canvas-meta">
            <div className="intro">
              <p>In 2017 St. Jude Children's Research Hospital witnessed 2,347 people
                complete 26.2 miles through the streets of Memphis, TN. Based on <a
                    href="http://www.besttimescct.com/results/marathon-results-by-place-2017.HTML">public race result
                  data</a>,
                this
                visualization seeks to explore the data behind the runners.</p>
            </div>
            <div className="selected-runner">
              <hr/>
              <h3 className="runner-name">Jon Doe</h3>
            </div>
          </div>
        </div>
    )
  }
}

export default App;