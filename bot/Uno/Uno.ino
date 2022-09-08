#include <SoftwareSerial.h>
#include <TinyGPS++.h>

void motor_go();
void initialiseMotors();
void initialiseMotion();
void check_for_command();

void initialiseRadar();
void radar();
void soundDet();
void sendbools();
void alarm();
void initialiseAlarm();
void checkMotion();

//SoftwareSerial ESP32(2,3);

const int btnPin = 8;
unsigned long btnTime = 0;
unsigned long radarTime = 0;
int radarAngle = 15;
int radarDir = 0;
unsigned long detTime = 0;
unsigned long tempdetTime = 0;
unsigned long motionTime = 0;

bool isMoving = false;
bool radarOn = false;

TinyGPSPlus gps;
//SoftwareSerial gpsSerial(5,6);

void setup()
{
    
    Serial.begin(9600);
//    gpsSerial.begin(9600);
//ESP32.begin(9600);
// button
    pinMode(btnPin,INPUT);
//radar

  initialiseRadar();
//motor
  initialiseMotors();
//bool check
  sendbools();

  initialiseMotion();
  initialiseAlarm();
  

}

void loop()
{
  const unsigned long currentTime = millis();
  check_for_command();
  if (digitalRead(btnPin) == HIGH && currentTime - btnTime > 1500){
    btnTime = currentTime;
    Serial.println("ardbtn");
  }
  if (currentTime - radarTime > 250 && radarOn == true){
    radar(currentTime);
  }
  if (currentTime - detTime > 100){
    soundDet(currentTime);
  }
  if (currentTime - motionTime > 1000){
    checkMotion(currentTime);
  }
//  while(Serial.available())
//  {
//    gps.encode(Serial.read());
//  }
//  Serial.println(gps.satellites.value());
//  if(gps.location.isUpdated()){
//    //Get the latest info from the gps object which it derived from the data sent by the GPS unit
//    Serial.println("Satellite Count:");
//    Serial.println(gps.satellites.value());
//    Serial.println("Latitude:");
//    Serial.println(gps.location.lat(), 6);
//    Serial.println("Longitude:");
//    Serial.println(gps.location.lng(), 6);
//    Serial.println("Speed MPH:");
//    Serial.println(gps.speed.mph());
//    Serial.println("Altitude Feet:");
//    Serial.println(gps.altitude.feet());
//    Serial.println("");
//  }
//  alarm();
}
