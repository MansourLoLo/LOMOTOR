import { getDatabase, ref, onValue, push, set } from "./firebase-setup.js";

function initialize(){
    const FORM_MESSAGE = document.querySelector("#form-message")
    FORM_MESSAGE.addEventListener("submit", addMessage)

    showMessages()

}

function showMessages(){
    const MESSAGES_REF = ref(getDatabase(), "messages/")

    onValue(MESSAGES_REF, showAllMessages)

}
function showAllMessages(snapshot){
    let datos = new Date();

    let hora = datos.getHours();
    let segundo = datos.getSeconds();

    if(segundo < 10){
        segundo += "0"+segundo
    }
    const DATE = `${hora} : ${segundo}`;

    const VALUES = snapshot.val()

    for(let value in VALUES){
        const SENDER = VALUES[value].sender
        const VALUE = VALUES[value].text

        const MESSAGE_SENDER = window.localStorage.getItem("username");
        const SENT_MESSAGES  = document.querySelector('#sent-messages')

        if(SENDER == MESSAGE_SENDER){
            SENT_MESSAGES.innerHTML += `<div class=" container own-message" > 
                                            <h5>
                                                ${VALUE} 
                                            </h5>
                                            <h6>
                                                ${DATE} 
                                            </h6>
                                        </div>`
        }else{
            SENT_MESSAGES.innerHTML += `<div class=" container database-message" >  
                                            <h5>
                                                ${SENDER}
                                            </h5>
                                            <h5>
                                                ${VALUE}
                                            </h5>
                                        </div>`
        }
    }

}

function addMessage(e){
    e.preventDefault()

    
    const MESSAGE_SENDER = window.localStorage.getItem("username");

    const MESSAGE_TEXT = e.target["input-field"].value
    
    const MESSAGES_REF = ref(getDatabase(), "messages/")
    
    const newMessage = {
        sender: MESSAGE_SENDER,
        text: MESSAGE_TEXT
    }

    push(MESSAGES_REF, newMessage)

}

initialize()