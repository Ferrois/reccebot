#include <ArduinoWebsockets.h>
#include <WiFi.h>

const char *ssid = "wweerrttyy";
const char *password = "69420420";


//const char *ssid = "bertrand's iphone";
//const char *password = "avocadoe";

char host[] = "ws://reccebot.herokuapp.com";

const int ledpin = 4;
const int redled = 33;

unsigned long pingTime = 0;

using namespace websockets;

WebsocketsClient client;

void check_for_command();

void onMessageCallback(WebsocketsMessage message)
{
//    Serial.println(message.data());
    if (message.data().charAt(0) == '@')
    {
        return;
    };
    if (message.data() == "pong"){
      Serial.println("--Pong--");
    }
    if (message.data() == "movew")
    {
        Serial.println("movew");
    }
    else if (message.data() == "moves")
    {
        Serial.println("moves");
    }
    else if (message.data() == "movea")
    {
        Serial.println("movea");
    }
    else if (message.data() == "moved")
    {
        Serial.println("moved");
    }
};
void setupWS(){
  
}

void onEventsCallback(WebsocketsEvent event, String data)
{
    if (event == WebsocketsEvent::ConnectionOpened)
    {
        Serial.println("Connnection Opened");
    }
    else if (event == WebsocketsEvent::ConnectionClosed)
    {
        Serial.println("Connnection Closed");
        client.connect(host);
        Serial.println(host);
    }
    else if (event == WebsocketsEvent::GotPing)
    {
        Serial.println("Server Pinged");
        digitalWrite(ledpin,HIGH);
        delay(50);
        digitalWrite(ledpin,LOW);
        client.pong();
    }
    else if (event == WebsocketsEvent::GotPong)
    {
        Serial.println("Server Ponged");
    }
}


void setup()
{
    Serial.begin(9600);
    pinMode (ledpin, OUTPUT);
    pinMode (redled,OUTPUT);
    digitalWrite(ledpin,HIGH);
    // Connect to wifi
    WiFi.begin(ssid, password);

    // Wait some time to connect to wifi
    for (int i = 0; i < 30 && WiFi.status() != WL_CONNECTED; i++)
    {
        Serial.print(".");
        delay(1000);
    }
    if (WiFi.status() == WL_CONNECTED){
      Serial.println("Connected to wifi");
    }else{
      Serial.println("Failure to connect wifi");
    }

    // Setup Callbacks
    client.onMessage(onMessageCallback);
    client.onEvent(onEventsCallback);

    // Connect to server
    client.connect(host);
    Serial.println(host);

    // Send a message
    client.send("Hi Server!");
    // Send a ping
    client.ping();
    digitalWrite(ledpin,LOW);
}

void loop()
{
    check_for_command();
    unsigned long myTime = millis();
    client.poll();
    if (WiFi.status() != WL_CONNECTED){
      WiFi.begin(ssid,password);
      for (int i = 0; i < 30 && WiFi.status() != WL_CONNECTED; i++)
        {
          Serial.print(".");
          digitalWrite(redled,HIGH);
          delay(500);
          digitalWrite(redled,LOW);
          delay(500);
        }
       client.connect(host);
       Serial.println("Connecting WS");
    }   
}
