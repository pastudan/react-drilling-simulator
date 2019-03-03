import React, { Component } from 'react'
import ReactEcharts from 'echarts-for-react'

import './App.css'

const UPDATE_INTERVAL = 10 // milliseconds
const SECONDS = 20 // how long to display the strip chart
const UPDATES_PER_SECOND = 1000 / UPDATE_INTERVAL
const SERIES_LENGTH = UPDATES_PER_SECOND * SECONDS

class App extends Component {
  state = {
    amplitude: 1,
    data: new Array(SERIES_LENGTH)
  }

  start = () => {
    // Start running calcuations every {UPDATE_ITERVAL}ms
    this.x = 0
    this.interval = window.setInterval(this.update, UPDATE_INTERVAL)
  }

  pause = () => {
    window.clearInterval(this.interval)
  }

  reset = () => {
    this.x = 0
    this.setState({ data: new Array(SERIES_LENGTH) })
  }

  update = () => {
    const { data, amplitude } = this.state
    this.x++

    /* === DO CALCULATION BELOW === */

    const value = Math.sin((this.x / UPDATES_PER_SECOND) * 10) * amplitude

    /* === DO CALCULATION ABOVE === */

    // remove first value, add last value
    const newData = data.slice(1)
    newData.push(value)
    console.log(`X: ${this.x}`, `Y: ${value}`, newData)

    this.setState({ data: newData })
  }

  getOption() {
    return {
      animation: false,
      xAxis: {
        type: 'category',
        data: [...Array(SERIES_LENGTH).keys()].reverse()
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: this.state.data,
          type: 'line',
          smooth: true
        }
      ]
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Drilling Simulator</h2>
          <div className="controls">
            <button onClick={() => this.start()}>start</button>
            <button onClick={() => this.pause()}>pause</button>
            <button onClick={() => this.reset()}>reset</button>
            <input
              type="number"
              name="amplitude"
              value={this.state.amplitude}
              onChange={e => this.setState({ amplitude: e.target.value })}
            />
          </div>
        </header>
        <section>
          <ReactEcharts
            option={this.getOption()}
            notMerge={true}
            lazyUpdate={true}
            theme={'theme_name'}
            onChartReady={this.onChartReadyCallback}
            // onEvents={EventsDict}
            // opts={{ renderer: 'svg' }}
          />
        </section>
      </div>
    )
  }
}

export default App
