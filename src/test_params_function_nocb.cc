// test_params_function_nocb.cc
#include <node.h>

namespace demo {

using v8::Function;
using v8::Exception;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Null;
using v8::Object;
using v8::String;
using v8::Value;

void RunCallback(const FunctionCallbackInfo<Value>& args) {
 
  Isolate* isolate = args.GetIsolate();
   
  if (args.Length() < 2) {
    // 抛出一个错误并传回到 JavaScript
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "参数数量错误")));
    return;
  }

  if (!args[1]->IsObject()) {
    isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "参数错误")));
    return;
  }

  Local<Function> cb = Local<Function>::Cast(args[0]);
  Local<Object> object = Object::New(isolate);
  Local<Value> argv[1] = { String::NewFromUtf8(isolate, "hello world") }; 
  
  cb->Call(Null(isolate), 1, argv);
}

void Init(Local<Object> exports, Local<Object> module) {
  NODE_SET_METHOD(module, "exports", RunCallback);
}

NODE_MODULE(test_params_function_nocb, Init)

}  // namespace demo
