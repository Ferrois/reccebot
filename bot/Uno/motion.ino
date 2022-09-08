const int pirPin = 4;

void initialiseMotion(){
  pinMode(pirPin,INPUT);
}

void checkMotion(unsigned long currentTime){
  if (digitalRead(pirPin) && isMoving == false){
    motionTime = currentTime;
    Serial.println("ardmot");
  }
}
