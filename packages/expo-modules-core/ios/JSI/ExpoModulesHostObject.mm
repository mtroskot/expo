// Copyright 2018-present 650 Industries. All rights reserved.

#import <ExpoModulesCore/ExpoModulesHostObject.h>

namespace expo {

ExpoModulesHostObject::ExpoModulesHostObject(SwiftInteropBridge *interopBridge) : interopBridge(interopBridge) {

}

ExpoModulesHostObject::~ExpoModulesHostObject() {

}

jsi::Value ExpoModulesHostObject::get(jsi::Runtime &runtime, const jsi::PropNameID &name) {
  NSString *moduleName = [NSString stringWithUTF8String:name.utf8(runtime).c_str()];
  JSIObject *nativeObject = [interopBridge getNativeModuleObject:moduleName];
  return nativeObject ? jsi::Value(runtime, *[nativeObject get]) : jsi::Value::undefined();
}

void ExpoModulesHostObject::set(jsi::Runtime &runtime, const jsi::PropNameID &name, const jsi::Value &value) {
  std::string message("RuntimeError: Cannot override the host object for expo module '");
  message += name.utf8(runtime);
  message += "'.";
  throw jsi::JSError(runtime, message);
}

std::vector<jsi::PropNameID> ExpoModulesHostObject::getPropertyNames(jsi::Runtime &runtime) {
  NSArray<NSString *> *moduleNames = [interopBridge getModuleNames];
  std::vector<jsi::PropNameID> propertyNames;

  propertyNames.reserve([moduleNames count]);

  for (NSString *moduleName in moduleNames) {
    propertyNames.push_back(jsi::PropNameID::forAscii(runtime, [moduleName UTF8String]));
  }
  return propertyNames;
}

} // namespace expo
