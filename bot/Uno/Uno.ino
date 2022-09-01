//#include <SoftwareSerial.h>

void motor_go();
void initialiseMotors();
void check_for_command();

void initialiseRadar();
void radar();
void soundDet();


//SoftwareSerial ESP32(2,3);

const int btnPin = 8;
unsigned long btnTime = 0;
unsigned long radarTime = 0;
int radarAngle = 15;
int radarDir = 0;
unsigned long detTime = 0;
unsigned long tempdetTime = 0;

void setup()
{
    
    Serial.begin(9600);
// button
    pinMode(btnPin,INPUT);
//radar

  initialiseRadar();
//motor
  initialiseMotors();


}

void loop()
{
  const unsigned long currentTime = millis();
  check_for_command();
  
  if (digitalRead(btnPin) == HIGH && currentTime - btnTime > 1500){
    btnTime = currentTime;
    Serial.println("ardbtn");
  }
  if (currentTime - radarTime > 250){
    radar(currentTime);
  }
  if (currentTime - detTime > 100){
    soundDet(currentTime);
  }
}
