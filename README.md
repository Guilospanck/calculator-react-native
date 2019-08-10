# calculator-react-native
 A simple calculator made using React Native
 
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
![GitHub](https://img.shields.io/github/license/Guilospanck/HowToDevelopers)

# Below there is some instructions for all react-native apps and I did put this information here to help me remember some processes in the future. I hope that it helps me and anyone else.

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
  > The colors.xml file is used to declare what color will be the background of our splash screen. Inside the tag <color></color> you put the code of the color you want.
  - Now go to ``` yourProjectFolder/android/app/src/main/res/drawable ``` and create a new file <i>background_splash.xml</i>, which is where we are going to definitively develop our splash screen, and put the code below:
  ```
  <?xml version="1.0" enconding="utf-8" ?>
  <layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@color/primary"  />
    <item 
     android:width="200dp"
     android:height="200dp"
     android:drawable="@drawable/icon"
     android:gravity="center"    
    />   
  </layer-list>
  
  ```
  > Explanations about the code above: the first item draws the background of our splash screen using the color tag defined in the colors.xml; in the second item we are defining our icon, which is inside the drawable folder, to have 200dp x 200dp and positioning it in the center of the screen ( using gravity center the icon will be in the center no matter what the size of the screen )
  - Now we need to the Android to see this file as the splash screen. Go to ``` yourProjectFolder/android/app/src/main/res/values ``` and edit the styles.xml to:
  ``` 
  <resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
        <!-- Customize your theme here. -->
        <item name="android:textColor">#000000</item>
        <item name="android:windowBackground">
            @drawable/background_splash
        </item>
        <item name="android:statusBarColor">
            @color/primary
        </item>
    </style>

</resources>
  ```
> The item android:statusBarColor it is used in case if you have defined some <StatusBar barStyle="light-content" backgroundColor="#7159C1"></StatusBar> inside your <b>App.js</b> file. It is necessary because the js file is read <i>after</i> the styles.xml file, so, if you do not set this up here, when the splash screens appear, the status bar will have a different color than the color when the app is already running.
