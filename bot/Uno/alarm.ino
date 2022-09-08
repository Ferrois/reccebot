const int alarmPin = 13;

void initialiseAlarm(){
  pinMode(alarmPin,OUTPUT);
}

void alarm(){
  
  digitalWrite(alarmPin,HIGH);
  digitalWrite(alarmPin,LOW);
}
