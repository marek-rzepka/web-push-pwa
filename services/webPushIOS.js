export class PushControl {
    pushLog = '';
    iOSPushCapability = false;

    logMessage(message) {
        let _toConsole = message;
        try{
            _toConsole = JSON.parse(message);
        } catch(e) { }
        console.log(_toConsole);
        this.pushLog += `>: ${message}\r\n`
        document.getElementById('eventtext').value = this.pushLog;
    }

    async init() {
        console.log('initialize')
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers['push-permission-request'] && window.webkit.messageHandlers['push-permission-state']) {
            this.iOSPushCapability = true;
        }
        document.getElementById('initialize').textContent = this.iOSPushCapability;
        console.log(this.iOSPushCapability)

        window.addEventListener('push-permission-request', (event) => {
            document.getElementById('text').innerHtml = `push permisssion ${JSON.stringify(event)}`
            if (event && event.detail){
                this.logMessage(event.detail);

                switch (event.detail) {
                    case 'granted':
                      // permission granted
                      break;
                    default:
                      // permission denied
                      break;
                  }
            }
        });

        window.addEventListener('push-permission-state', (event) => {
            if (event && event.detail){
                this.logMessage(event.detail);

                switch (event.detail) {
                    case 'notDetermined':
                      // permission not asked
                      break;
                    case 'denied':
                      // permission denied
                      break;
                    case 'authorized':
                    case 'ephemeral':
                    case 'provisional':
                      // permission granted
                      break;
                    case 'unknown':
                    default:
                      // something wrong
                      break;
                }
            }
        });

        window.addEventListener('push-notification', (event) => {
            if (event && event.detail){
                this.logMessage(JSON.stringify(event.detail));
            }
        });

        window.addEventListener('push-token', (event) => {
            if (event && event.detail){
                document.getElementById('showToken').textContent = JSON.stringify(event.detail);
                this.logMessage(JSON.stringify(event.detail));
            }
        });

        document.getElementById('push-permission').addEventListener('click', this.pushPermissionRequest);
        document.getElementById('push-state').addEventListener('click', this.pushPermissionState);
        document.getElementById('token').addEventListener('click', this.pushTokenRequest);
    }

    pushPermissionRequest(){
        console.log('pushPermissionRequest')
		if (this.iOSPushCapability)
			window.webkit.messageHandlers['push-permission-request'].postMessage('push-permission-request');
	}

	pushPermissionState(){
		if (this.iOSPushCapability)
			window.webkit.messageHandlers['push-permission-state'].postMessage('push-permission-state');
	}

    pushSubscribeTopic(topic, eventValue, unsubscribe) {
        if (this.iOSPushCapability) {
          window.webkit.messageHandlers['push-subscribe'].postMessage(JSON.stringify({
            topic, // topic name to subscribe/unsubscribe
            eventValue, // user object: name, email, id, etc.
            unsubscribe // true/false optional
          }));
        }
    }

	pushTokenRequest(){
		if (this.iOSPushCapability)
			window.webkit.messageHandlers['push-token'].postMessage('push-token');
	}

    // render() {
    //     return html`
    //         <nord-card padding="m">
    //             <h2 slot="header">Push Notifications</h2>
    //             <p slot="header-end">Firebase FCM</p>
    //                 <nord-stack direction="horizontal">
    //                     <nord-button variant="primary" @click="${this.pushPermissionRequest}">Push Permission</nord-button>
    //                     <nord-button variant="primary" @click="${this.pushPermissionState}">Push State</nord-button>
    //                 </nord-stack>
    //                 <br>
    //                 <nord-stack direction="horizontal">
    //                     <nord-button variant="primary" @click="${() => this.pushSubscribeTopic('common', {userId:'1234'})}">Topic Subscribe</nord-button>
    //                     <nord-button variant="primary" @click="${this.pushTokenRequest}">Token</nord-button>
    //                 </nord-stack>
    //                 <nord-textarea readonly expand value="${this.pushLog}" placeholder="events log"></nord-textarea>
    //         </nord-card>
    //     `
    // }
}

window.addEventListener('DOMContentLoaded', async () => {
    const pushController = new PushControl();
    await pushController.init();
})