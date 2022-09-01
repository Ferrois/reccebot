#include <Servo.h>

int left_motor_pin = A1;
int right_motor_pin = A2;
Servo left_motor;
Servo right_motor;

void initialiseMotors()
{
  left_motor.attach(left_motor_pin);
  right_motor.attach(right_motor_pin);
};

void motor_go(int speed,int stop)
{
  Serial.println("MotorGO");
  left_motor.write(speed);
  right_motor.write(180-speed);
  if (stop == 1){
    delay(2000);
    left_motor.write(90);
    right_motor.write(90);
  };
};

void motor_turn(int dir, int angle){
  if (dir == 1){ //right
    for (int i = 0; i < angle; i++){
      left_motor.write(105);
      right_motor.write(105);
      delay(100);
    };
  };
  if (dir == 2){ //left
    for (int i = 0; i < angle; i++){
      left_motor.write(75);
      right_motor.write(75);
      delay(100);
    };
  };
  left_motor.write(90);
  right_motor.write(90);
};
