// ArtyomCommands.js
export default class ArtyomCommandsManager {

    // The ArtyomCommandsManager class expects as argument in the constructor
    // an already declared instance of Artyom.js
    constructor (ArtyomInstance){
        this._artyom = ArtyomInstance;
    }
    
     speak = (xyz) => {
      // Check if speaking
      console.log(this.state);
      const synth = window.speechSynthesis;
      if (synth.speaking) {
        console.error('Already speaking...');
        return;
      }
        
        // Get speak text
        const speakText = new SpeechSynthesisUtterance(xyz);

        // Speak end
        speakText.onend = e => {
          console.log('Done speaking...');

        };

        // Speak error
        speakText.onerror = e => {
          console.error('Something went wrong');
        };

        // Speak
        synth.speak(speakText);
      
    };

    // Execute the loadCommands method to inject the methods to the instance of Artyom
    loadCommands(){
        let Artyom = this._artyom;

        // Here you can load all the commands that you want to Artyom
        return Artyom.addCommands([
            {
                indexes: ["Hello", "Hi"],
                action: () => {
                    Artyom.say("Hello, how are you?");
                }
            },{
                indexes: ["Change Route"],
                action: () => {
                    this.speak("Tell Route to change to")
                  var  xyz=prompt("Enter Route:")
                    alert(xyz);
                }
            },
            {
                indexes: [/How are you/, /Regular expressions supported/],
                smart: true,
                action: () => {
                    Artyom.say("I'm fine, thanks for asking !");
                }
            },
            {
                indexes: ["Generate reports of * of this year"],
                smart: true,
                action: (i, month) => {
                    let year = new Date().getFullYear();
                    
                    Artyom.say(`Generating reports of ${month} ${year} `);

                    Artyom.say("Ready ! What were you expecting? write some code you lazy bear !");
                }
            },
        ]);
    }
}


