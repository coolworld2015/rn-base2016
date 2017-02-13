# RN Base
git clone https://github.com/coolworld2015/rn-base.git
-------------------------------------------------------------------------------------------------
git config --global user.name "coolworld2015"
-------------------------------------------------------------------------------------------------
git config --global user.email "wintermute2015@ukr.net"
-------------------------------------------------------------------------------------------------
npm install -g react-native-cli
-------------------------------------------------------------------------------------------------
npm install (for rn-base.git)
-------------------------------------------------------------------------------------------------
react-native init AwesomeProject
-------------------------------------------------------------------------------------------------
cd AwesomeProject
-------------------------------------------------------------------------------------------------
rn-base\android -> local.properties -> sdk.dir = C:/Users/ed/AppData/Local/Android/sdk
-------------------------------------------------------------------------------------------------
Android SDK Manager -> Android SDK Build-tools (23.0.1)
-------------------------------------------------------------------------------------------------
ANDROID_HOME -> C:/Users/ed/AppData/Local/Android/sdk
-------------------------------------------------------------------------------------------------
MAX_WAIT_TIME = 360000 -> node_modules\react-native\packager\react-packager\src\node-haste\FileWatcher
-------------------------------------------------------------------------------------------------
Genymotion -> Ctrl+M -> Menu
-------------------------------------------------------------------------------------------------
react-native run-android
-------------------------------------------------------------------------------------------------
APK -> react-native bundle --dev false --platform android --entry-file index.android.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug
-------------------------------------------------------------------------------------------------
APK -> cd android -> gradlew assembleDebug(assembleRelease) -> \android\app\build\outputs\apk
-------------------------------------------------------------------------------------------------
PIC -> /android/app/src/main/res/mipmap
-------------------------------------------------------------------------------------------------
CONFIG -> android/app ->build.gradle
-------------------------------------------------------------------------------------------------
react-native start
-------------------------------------------------------------------------------------------------
react-native run-ios
-------------------------------------------------------------------------------------------------
react-native run-ios --simulator="iPhone 5"
-------------------------------------------------------------------------------------------------
http/https - NSAllowsArbitraryLoads in \ios\Cool\Info.plist
-------------------------------------------------------------------------------------------------
https://www.diawi.com/ for *.ipa
-------------------------------------------------------------------------------------------------
To install the version you need to do the following:
1) Open the build link on your device's Safari browser. You may just open this email on your device and tap that link.
2) Tap "Install application" on opened page.
3) Pop-up which propose to install an app will appear. Tap "Install".
4) Tap Home button to hide Safari, app is installing.
5) Now you need to trust ... Enterprise profile to be able to run installed app. To do that you need to: 
a) Go to Settings => General => Profiles & Device Management.
b) Select "... Professional Ooo".
c) Tap "Trust "... Professional Ooo"".
d) Pop-up will appear, tap "Trust" there.
6) That's it. Move back to springboard and run the app.
Installed.
-------------------------------------------------------------------------------------------------