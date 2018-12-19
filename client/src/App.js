import React, { Component } from 'react'
import './App.css'
import microgear from 'microgear'
import axios from 'axios'

class App extends Component {
    constructor(props) {
        super(props)
        this.gear = microgear.create({
            key: 'Il8fwPqTTXGGwcX',
            secret: '1qCT5qfG77cYEa6GAh6YkpzRl',
            alias: 'Aira'
        })
        this.gear.connect('AiraCO') // NotSure
        this.gear.on('connected', () => {
            console.log('connected . . .')
        })
        this.state = {
            msg: '',
            topic: '',
            data: []
        }
        this.getConnected()
    }
    getConnected = () => {
        microgear.on('connected', () => {
            microgear.setAlias('Aira')
            return <h2>Connected to NETPIE</h2>
        })
        microgear.on('present', event => {
            console.log(event)
        })

        microgear.on('absent', event => {
            console.log(event)
        })
    }
    getData = () => {
        microgear.on('message', (topic, msg) => {
            this.setState({ msg: msg, topic: topic })
            let split_msg = this.state.msg.split('/')
            let humid = ''
            let temp = ''
            if (typeof split_msg[0] != 'undefined' && split_msg[0] == '') {
                humid = split_msg[1]
                temp = split_msg[2]
            }
            return (
                <div>
                    <p>`Data from Node MCU = ${this.state.msg}`</p>
                    <p>`Topic = ${this.setState.topic}`</p>
                    <p>`Humidity = ${humid}`</p>
                    <p>`Temperature = ${temp}`</p>
                </div>
            )
        })
    }
    //Graph Function
    getGraph = data => {}
    componentDidMount() {
        //Get Data
        axios
            .get('/api/received_data')
            .then(function(response) {
                this.setState({ data: response })
            })
            .catch(function(error) {
                console.log(error)
            })
    }
    componentDidUpdate() {
        //Send For Write File
        axios
            .post('/api/sent_data', {
                msg: this.state.msg,
                date: new Date()
            })
            .then(function(response) {
                console.log(response)
            })
            .catch(function(error) {
                console.log(error)
            })
    }
    render() {
        return (
            <React.Fragment>
                <h1>Aira</h1>
                <div>{this.getData()}</div>
                <div>{this.getGraph()}</div>
            </React.Fragment>
        )
    }
}

export default App
