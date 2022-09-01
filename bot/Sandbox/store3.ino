//#include <ArduinoWebsockets.h>
//#include <WiFi.h>
//
// 
//const char* ssid     = "alice";
//const char* password = "91007775";
// 
//char host[] = "ws://reccebot.herokuapp.com";
//  
//using namespace websockets;
//
//void onMessageCallback(WebsocketsMessage message) {
//    Serial.print("Got Message: ");
//    Serial.println(message.data());
//}
//
//void onEventsCallback(WebsocketsEvent event, String data) {
//    if(event == WebsocketsEvent::ConnectionOpened) {
//        Serial.println("Connnection Opened");
//    } else if(event == WebsocketsEvent::ConnectionClosed) {
//        Serial.println("Connnection Closed");
//    } else if(event == WebsocketsEvent::GotPing) {
//        Serial.println("Got a Ping!");
//    } else if(event == WebsocketsEvent::GotPong) {
//        Serial.println("Got a Pong!");
//    }
//}
//
//WebsocketsClient client;
//void setup() {
//    Serial.begin(115200);
//    // Connect to wifi
//    WiFi.begin(ssid, password);
//
//    // Wait some time to connect to wifi
//    for(int i = 0; i < 10 && WiFi.status() != WL_CONNECTED; i++) {
//        Serial.print(".");
//        delay(1000);
//    }
//    Serial.println("Connected to wifi");
//    
//
//    // Setup Callbacks
//    client.onMessage(onMessageCallback);
//    client.onEvent(onEventsCallback);
//    
//    // Connect to server
//    client.connect(host);
//    Serial.println(host);
//
//    // Send a message
//    client.send("Hi Server!");
//    // Send a ping
//    client.ping();
//}
//
//void loop() {
//    client.poll();
//}









//
//#include <Servo.h>
//
//int left_motor_pin = A1;
//int right_motor_pin = A2;
//Servo left_motor;
//Servo right_motor;
//
//void initialiseMotors()
//{
//  left_motor.attach(left_motor_pin);
//  right_motor.attach(right_motor_pin);
//};
//
//void motor_go(int speed)
//{
//  left_motor.write(speed);
//  right_motor.write(speed);
//};
//
//void setup(){
//  initialiseMotors();
//  motor_go(180);
//}
//
//void loop(){
//  delay(1000);
//}
