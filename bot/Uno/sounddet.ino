const int soundDetPin = A0;

void soundDet(unsigned long int currentTime){
  detTime = currentTime;
  int sensorValue = analogRead(soundDetPin);
//  Serial.println(sensorValue);
  if (abs(sensorValue - 50) > 26 && currentTime - tempdetTime > 2500){
    tempdetTime = currentTime;
    Serial.println("ardsnd");
  }
}
