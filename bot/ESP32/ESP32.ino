#include <ArduinoWebsockets.h>
#include <WiFi.h>

#include "esp_camera.h"
#include "base64.h"

#define PWDN_GPIO_NUM     32
#define RESET_GPIO_NUM    -1
#define XCLK_GPIO_NUM      0
#define SIOD_GPIO_NUM     26
#define SIOC_GPIO_NUM     27

#define Y9_GPIO_NUM       35
#define Y8_GPIO_NUM       34
#define Y7_GPIO_NUM       39
#define Y6_GPIO_NUM       36
#define Y5_GPIO_NUM       21
#define Y4_GPIO_NUM       19
#define Y3_GPIO_NUM       18
#define Y2_GPIO_NUM        5
#define VSYNC_GPIO_NUM    25
#define HREF_GPIO_NUM     23
#define PCLK_GPIO_NUM     22

const char *ssid = "wweerrttyy";
const char *password = "69420420";


//const char *ssid = "bertrand's iphone";
//const char *password = "avocadoe";

char host[] = "ws://reccebot.herokuapp.com";

const int ledpin = 4;
const int redled = 33;

bool cameraOn = true;

unsigned long pingTime = 0;
unsigned long messageTimestamp = 0;

using namespace websockets;

WebsocketsClient client;

void check_for_command();

void setupCamera()
{

    camera_config_t config;
    config.ledc_channel = LEDC_CHANNEL_0;
    config.ledc_timer = LEDC_TIMER_0;
    config.pin_d0 = Y2_GPIO_NUM;
    config.pin_d1 = Y3_GPIO_NUM;
    config.pin_d2 = Y4_GPIO_NUM;
    config.pin_d3 = Y5_GPIO_NUM;
    config.pin_d4 = Y6_GPIO_NUM;
    config.pin_d5 = Y7_GPIO_NUM;
    config.pin_d6 = Y8_GPIO_NUM;
    config.pin_d7 = Y9_GPIO_NUM;
    config.pin_xclk = XCLK_GPIO_NUM;
    config.pin_pclk = PCLK_GPIO_NUM;
    config.pin_vsync = VSYNC_GPIO_NUM;
    config.pin_href = HREF_GPIO_NUM;
    config.pin_sscb_sda = SIOD_GPIO_NUM;
    config.pin_sscb_scl = SIOC_GPIO_NUM;
    config.pin_pwdn = PWDN_GPIO_NUM;
    config.pin_reset = RESET_GPIO_NUM;
    config.xclk_freq_hz = 20000000;
    config.pixel_format = PIXFORMAT_JPEG;
    
    config.frame_size = FRAMESIZE_QVGA; // FRAMESIZE_ + QVGA|CIF|VGA|SVGA|XGA|SXGA|UXGA
    config.jpeg_quality = 12;
    config.fb_count = 1;
  
    // Init Camera
    esp_err_t err = esp_camera_init(&config);
    if (err != ESP_OK) {
      Serial.printf("Camera init failed with error 0x%x", err);
      return;
    }
  
  
}

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
    else if (message.data() == "camoff")
    {
        cameraOn = false;
        Serial.println("bol");
    }
    else if (message.data() == "camon")
    {
        cameraOn = true;
        Serial.println("bol");
    }
    else if (message.data() == "radon"){
      Serial.println("radon");
    }
    else if (message.data() == "radoff"){
      Serial.println("radoff");
    }
    else if (message.data() == "boolscheck"){
      Serial.println("bol");
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
        Serial.println("bol");
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
    setupCamera();
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

    if(myTime - messageTimestamp > 2000 && WiFi.status() == WL_CONNECTED && cameraOn == true) {
        messageTimestamp = myTime;
        Serial.println(myTime);

        camera_fb_t * fb = NULL;

        // Take Picture with Camera
        fb = esp_camera_fb_get();  
        if(!fb) {
          Serial.println("Camera capture failed");
          return;
        }
        
        client.sendBinary((const char*)fb->buf,fb->len);
        Serial.println("Image sent");
        esp_camera_fb_return(fb); 
    }
}
