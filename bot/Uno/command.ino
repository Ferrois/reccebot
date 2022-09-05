const unsigned int MAX_MESSAGE_LENGTH = 25;

void motor_turn();
void sendbools();

void commands(String command){
//  Serial.println(strcmp(command,command));
  Serial.println(command.length());
  if (command == "movew\r"){
    motor_go(140,1);
  } else if (command == "moves\r"){
    motor_go(40,1);
  } else if (command == "movea\r"){
    motor_turn(2,10);
  } else if (command == "moved\r"){
    motor_turn(1,10);
  } else if (command == "radoff\r"){
    radarOn = false;
    sendbools();
  } else if (command == "radon\r"){
    radarOn = true;
    sendbools();
  } else if (command == "bol\r"){
    sendbools();
  };
  
  return;
};

void check_for_command()
{
    while (Serial.available() > 0)
    {
        // Create a place to hold the incoming message
        static char message[MAX_MESSAGE_LENGTH];
        static unsigned int message_pos = 0;

        // Read the next available byte in the serial receive buffer
        char inByte = Serial.read();

        // Message coming in (check not terminating character) and guard for over message size
        if (inByte != '\n' && (message_pos < MAX_MESSAGE_LENGTH - 1))
        {
            // Add the incoming byte to our message
            message[message_pos] = inByte;
            message_pos++;
        }
        // Full message received...
        else
        {
            // Add null character to string
            message[message_pos] = '\0';
//            Serial.println(strlen(message));
            Serial.println(message);
            commands(message);
            // Reset for the next message
            message_pos = 0;
            
        };
    };

};
