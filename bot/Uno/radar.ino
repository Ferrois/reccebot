#include <Servo.h>
//// Defines Tirg and Echo pins of the Ultrasonic Sensor
const int trigPin = 10;
const int echoPin = 11;
const int radarServoPin = 12;
// Variables for the duration and the distance

long duration;
int distance;

Servo radarServo;

void initialiseRadar()
{
    pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  radarServo.attach(radarServoPin);
};

void radar(unsigned long int currentTime) {
  radarTime = currentTime;
//  Serial.print(currentTime);
//  Serial.print(":");
//  Serial.println(radarTime);
  // rotates the servo motor from 15 to 165 degrees
  radarServo.write(radarAngle);
  delay(50);
  distance = calculateDistance();
  Serial.print("usd");
  Serial.print(radarAngle);
  Serial.print(":");
  Serial.println(distance);
//  Serial.print("\r");
  if (radarDir == 0){
    radarAngle += 5;
    if (radarAngle >= 165){
      radarDir = 1;
    }
  } else if (radarDir == 1){
    radarAngle -= 5;
    if (radarAngle <= 15){
      radarDir = 0;
    }
  }
}
// Function for calculating the distance measured by the Ultrasonic sensor
int calculateDistance(){ 
  
  digitalWrite(trigPin, LOW); 
  delayMicroseconds(2);
  // Sets the trigPin on HIGH state for 10 micro seconds
  digitalWrite(trigPin, HIGH); 
  delayMicroseconds(20);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH); // Reads the echoPin, returns the sound wave travel time in microseconds
  distance= duration*0.034/2;
  return distance;
}
