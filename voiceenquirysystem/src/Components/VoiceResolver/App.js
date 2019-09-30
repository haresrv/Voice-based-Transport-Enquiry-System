import React from 'react';
import Artyom from 'artyom.js';
import ArtyomCommandsManager from './ArtyomCommands.js';
import tachyons from 'tachyons';

const Jarvis = new Artyom();

export default class App extends React.Component {
    constructor (props, context){
        super(props, context);

        this.startAssistant = this.startAssistant.bind(this);
        this.stopAssistant = this.stopAssistant.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        
        this.state = {
            artyomActive: false,
            textValue: ''
        };

        let CommandsManager = new ArtyomCommandsManager(Jarvis);
        CommandsManager.loadCommands();
    }

    startAssistant=() => {
        let _this = this;

        console.log("Artyom succesfully started !");

        Jarvis.initialize({
            lang: "en-GB",
            debug: true,
            continuous: true,
            soundex: true,
            listen: true
        }).then(() => {
            // Display loaded commands in the console
            console.log(Jarvis.getAvailableCommands());

            Jarvis.say("Start?");

            _this.setState({
                artyomActive: true
            });
        }).catch((err) => {
            console.error("Oopsy daisy, this shouldn't happen !", err);
        });

        Jarvis.redirectRecognizedTextOutput((recognizedText, isFinal) => {
            if(isFinal){
                document.getElementById(this.props.id).value = recognizedText;
                this.setState({textValue:recognizedText})
            }else{
                document.getElementById(this.props.id).value = recognizedText;
                
            }
        });
    }

    stopAssistant() {
        let _this = this;

        Jarvis.fatality().then(() => {
            console.log("Jarvis has been succesfully stopped");
            console.log(this.state);
            
            _this.setState({
                artyomActive: false
            });
            
        }).catch((err) => {
            console.error("Oopsy daisy, this shouldn't happen neither!", err);

            _this.setState({
                artyomActive: false
            });
        });
    }



    handleTextChange(event) {
        this.setState({
            textValue: event.target.value
        });
    }

    handleClick1 = (event) => {
        event.preventDefault();
        this.startAssistant();
    }

    handleClick2 = (event) => {
        event.preventDefault();
        this.stopAssistant();
        console.log(this.state)
    }

    render() {
        return (
            <div className="bg-gold">
                
                {/* Voice commands action buttons */}
                <textarea onChange={this.handleTextChange} id={this.props.id} value={this.state.textValue} style={{width:"200px",height:"auto"}}/>
                <input type="image" value="Start Artyom" disabled={this.state.artyomActive} src="https://robohash.org/1" style={{width:"auto",height:"50px"}} onClick={this.handleClick1}/>
                <input type="image" value="Stop Artyom" disabled={!this.state.artyomActive} src="https://robohash.org/2" style={{width:"auto",height:"50px"}} onClick={this.handleClick2}/>
                <br/>
                {/* Speech synthesis Area */}      
                
                
            </div>
        )
    }
}
