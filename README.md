# calculator-react-native
 A simple calculator made using React Native
 
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
![GitHub](https://img.shields.io/github/license/Guilospanck/HowToDevelopers)

## Instalation -> Tutorial for all React Native apps
<b>It is better to follow the React Native CLI approach</b>;
- If you don't have React Native installed yet, you must follow this [tutorial](https://facebook.github.io/react-native/docs/getting-started);  
- If you already have the React Native package and all setup ok, to create a new project you have to type:
```
react-native init [name-of-the-project]
```

### Changing the name of the App (if you change of idea after initializing it)
 - ```git branch rename-app ``` and ``` git checkout rename-app ``` to create a new branch if something goes wrong;
 - Update the <i>name</i> in <b>package.json</b>, and <i>name and displayName</i> in <b>app.json</b> files (New name for your app);
 - Delete <b>android/</b> and <b>ios/</b> folder but before deleting remember you will lose all the changes you made throughout the app in these folders so its better to have back up, for example react navigation configuration mentioned in documentation, linking fonts and icons, app icon etc;
 - Run ``` react-native upgrade --legacy true ``` (this will generate android and ios folder once again with new configuration);
 - Run ``` react-native link ``` (to re-link all the libraries and packages);
 - Go to android folder and run gradlew clean to clean cache.
 ```
 cd android 
 gradlew clean 
 ```
Now back to main app cd ../
 - Now run ``` react-native run-android ```
 
 ### Changing the icon for Android app
  - First have at hand the image icon (<b>1024x1024</b>) that you want to set;
  - Go to [ApeTools](https://apetools.webprofusion.com/#/tools/imagegorilla) and upload the icon on <i>Step 1</i>, select the Android bundle, click in <b>Kapow!</b> and then download the zip file generated;
  - Extract the zip file and copy all the folders inside the folder <i>Bundle/android</i>;
  - Navigate to ``` [yourProject]/android/app/src/main/res ```, delete the mipmaps folders and then paste the drawable icons;
  - Now you need to change the path to these icons. Go to ``` yourProjectFolder/android/app/src/main/res ``` and open the <b>AndroidManifest.xml</b> file;
  - Inside the AndroidManifest.xml file, change from ``` android:icon="@mipmap/ic_launcher" ``` to ``` android:icon="@drawable/icon" ```. <b>PS.: if exists android:roundIcon , you must change the "@mipmap/roundIcon" to "@drawable/icon" as well</b>.
  
  
  ### Changing splash screen
  - Go to ``` yourProjectFolder/android/app/src/main/res/values ``` and create a new file <i>colors.xml</i> and put the following code:
  ```
  <?xml version="1.0" enconding="utf-8" ?>
  <resources>
   <color name="primary">#7159C1</color>
  </resources>
  ```
