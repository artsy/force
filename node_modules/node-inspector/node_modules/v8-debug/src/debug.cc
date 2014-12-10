#include <stdlib.h>
#include "nan.h"
#include "v8-debug.h"

namespace nodex {

  class Debug {
    public:
      
      static NAN_METHOD(Call) {
        NanScope();
        
        if (args.Length() < 1) {
          return NanThrowError("Error");
        }
        
        v8::Handle<v8::Function> fn = v8::Handle<v8::Function>::Cast(args[0]);
        v8::Debug::Call(fn);
        
        NanReturnUndefined();
      };
      
      static NAN_METHOD(Signal) {
        NanScope();
        
        size_t length;
        const char* msg = NanCString(args[0], &length);
        uint16_t* command = (uint16_t*)malloc(sizeof(uint16_t) * (length + 1));
        command[length] = 0;
        for (int i = 0; i < length; i++) {
          command[i] = msg[i];
        }
#if (NODE_MODULE_VERSION > 0x000B)
        v8::Isolate* debug_isolate = v8::Debug::GetDebugContext()->GetIsolate();
        v8::Debug::SendCommand(debug_isolate, command, length);
#else
        v8::Debug::SendCommand(command, length);
#endif   
        NanReturnUndefined();
      };
      
      static NAN_METHOD(Mirror) {
        NanScope();
        
        if (args.Length() < 1) {
          return NanThrowError("Invalid number of arguments");
        }
        
        NanReturnValue(v8::Debug::GetMirror(args[0]));
      };
      
      static NAN_METHOD(RunScript) {
        NanScope();

        v8::Local<v8::String> script_source(args[0]->ToString());
        if (script_source.IsEmpty())
          NanReturnUndefined();
        v8::Context::Scope context_scope(v8::Debug::GetDebugContext());
        v8::Local<v8::Script> script = v8::Script::Compile(script_source);
        if (script.IsEmpty())
          NanReturnUndefined();

        NanReturnValue(script->Run());
      };
    private:
      Debug() {}
      ~Debug() {}
  };
  
  void Initialize(v8::Handle<v8::Object> target) {
    NanScope();
    NODE_SET_METHOD(target, "call", Debug::Call);
    NODE_SET_METHOD(target, "signal", Debug::Signal);
    NODE_SET_METHOD(target, "mirror", Debug::Mirror);
    NODE_SET_METHOD(target, "runScript", Debug::RunScript);
    
    const char allow_natives_syntax[] = "--allow_natives_syntax";
    v8::V8::SetFlagsFromString(allow_natives_syntax, sizeof(allow_natives_syntax) - 1);
  }
  
  NODE_MODULE(debug, Initialize)
}