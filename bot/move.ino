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

void motor_go(int speed)
{
  left_motor.write(speed);
  right_motor.write(speed);
};
