

namespace joytest {


    export function testNextNecCode() {
            
        joystick.run();
       
        while (true) {
            basic.showIcon(IconNames.Confused);
            let [address, command] = leagueir.readNecAddressCommand(DigitalPin.P16, 2000);
            if (address != 0) {
                basic.showIcon(IconNames.Happy);
            } else {
                basic.showIcon(IconNames.Sad);
            }
            
            serial.writeLine("Address: " + address + ", Command: " + command);
            pause(100);
        }

    }

    export function testRadioChannelReceive() {
        leagueir.onNecReceived(DigitalPin.P16, function (address: number, command: number) {
            if (address == leagueir.Address.RadioChannel) {
                let channel = (command >> 8) & 0xFF;
                let group = command & 0xFF;
        
                serial.writeLine("Radio Channel: " + channel + ", Group: " + group);
                basic.showIcon(IconNames.Happy);
            } else {
                serial.writeLine("Unknown address: " + address);
                basic.showIcon(IconNames.Sad);
            }
            basic.pause(100);
            basic.clearScreen();
        });
    }

    export function testRadioChannelIrSend() {

        // This makes the IR system, if it uses PWM, have timing problems, due
        // to reading the analog pins for calibration.
        
        let i = 0;

        if(false){
            joystick.init();
            radiop.init();
            negotiate.init("joystick");
            negotiate.findFreeChannel();
        }


        radio.off();
        negotiate.stopBeacon();

        basic.forever(function () {
            let channel = i;
            let group = Math.floor(i / 2);
            i++;
            basic.showIcon(IconNames.Target);

            joystick.sendIRRadioMessage(DigitalPin.P8, channel, group);
            
            basic.clearScreen();
            basic.pause(1000);
        });
    }
    
    


}