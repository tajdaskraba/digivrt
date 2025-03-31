#include <Arduino.h>

#define PWM_CHANNEL 0  
#define PWM_FREQ 5000  // Frequency in Hz
#define PWM_RES 10      // Resolution: 10 bit
#define PWM_PIN 7
#define PWM_READ 15

// put function declarations here:
void pinSetup();
int readMoisture();



void setup() {
  Serial.begin(115200);
  pinSetup();

}



void loop() {
  if (readMoisture() > 1400) {
    Serial.println("red");
    digitalWrite(37, HIGH);
    digitalWrite(36, LOW);
    digitalWrite(35, LOW);
    digitalWrite(18,HIGH);

  } else if(readMoisture()<1100) {
    Serial.println("green");
    digitalWrite(37, LOW);
    digitalWrite(36, LOW);
    digitalWrite(35, HIGH);
    digitalWrite(18,LOW);
  }
  else 
  {
    Serial.println("blue");
    digitalWrite(37, LOW);
    digitalWrite(36, HIGH);
    digitalWrite(35, LOW);
    digitalWrite(18,LOW);
  }
}
void pinSetup(){
  pinMode(37, OUTPUT);
  pinMode(36, OUTPUT);
  pinMode(18, OUTPUT);
  pinMode(35, OUTPUT);
  ledcSetup(PWM_CHANNEL, PWM_FREQ, PWM_RES);
  ledcAttachPin(PWM_PIN, PWM_CHANNEL);
}
int readMoisture(){
    ledcWrite(PWM_CHANNEL,1);
    int sensorValue = analogRead(PWM_READ);
    Serial.println(sensorValue);
    return sensorValue;
}

