# Getting stated with the IOS Client

The way that the iOS client works is using the
[Apple Shortcuts app](https://apps.apple.com/us/app/shortcuts/id915249334).
This app run a script that sends a POST request to the server.
The POST request contains the battery level and device name.

## Component overview

The script is comprised of 3 main parts:

1. BatteryServer_V3_Post
   - The script that sends the POST request to the server.
2. Upload Battery:
   - The script that collects the battery and device data and passes it
     to the POST script.
3. Upload Device:
   - The script used to manually send the battery levels of non-smart
     devices to the POST script.

## Scripts

<!-- TODO Update this if I restructure the repository -->

All the shortcut script files can be found in the
[Uploader\iosClient](../../Uploader/iosClient/) folder.  
But for reference, here are screenshots of what each script should look like.

### BatteryServer_V3_Post

![BatteryServer_V3_Post](Photos\BatteryServer_V3_Post_Screenshot.png)

### Upload_Battery

![Upload_Battery_Screenshot](Photos\Upload_Battery_Screenshot.png)

### Upload_Device

![Upload_Device_Screenshot](Photos\Upload_Device_Screenshot.png)
