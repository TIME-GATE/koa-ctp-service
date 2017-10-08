{
  "targets": [
    
    { 
			"target_name": "demo", 
			"sources": ["src/demo.cc"] 
		},
	   
   	{ 
			"target_name": "test_params_nocb", 
			"sources": ["src/test_params_nocb.cc"] 
		},

  	{ 
			"target_name": "test_function_nocb", 
			"sources": ["src/test_function_nocb.cc"] 
		},

    {
      "target_name": "test_params_function_nocb",
      "sources": ["src/test_params_function_nocb.cc"]
    },

		{
      "target_name": "shifctp",
      "sources": [ "src/shifctp.cc","src/tools.cc","src/stdafx.cpp","src/uv_mduser.cpp","src/uv_trader.cpp","src/wrap_mduser.cpp","src/wrap_trader.cpp" ],
      "libraries":["src/ctp_api/linux64/thostmduserapi.so","src/ctp_api/linux64/thosttraderapi.so"],
      "include_dirs":["src/"]
    }

	]
}
