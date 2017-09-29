module.exports.routes = [
  
  { verb: 'GET',    path: '/v1/verb/get',             fn: 'verb.verbGetOnThisRequest',          desc: '测试GET' },
  { verb: 'POST',   path: '/v1/verb/post',            fn: 'verb.verbPostOnThisRequest',         desc: '测试POST' },
  { verb: 'PUT',    path: '/v1/verb/put',             fn: 'verb.verbPutOnThisRequest',          desc: '测试PUT' },
  { verb: 'DELETE', path: '/v1/verb/delete',          fn: 'verb.verbDeleteOnThisRequest',       desc: '测试DELETE' },
  
  { verb: 'GET',    path: '/v1/embedded',             fn: 'embedded.unlockYourCplusJourney',    desc: '嵌入式测试' },
  { verb: 'GET',    path: '/v1/testParamsNocb',       fn: 'embedded.testParamsNocb',            desc: '传参数无回调返回' },
  { verb: 'GET',    path: '/v1/testFuncsNocb',        fn: 'embedded.testFunctionNocb',          desc: '传函数无回调返回' },
  { verb: 'GET',    path: '/v1/testParamsFuncsNocb',  fn: 'embedded.testParamsFunctionNocb',    desc: '传函数参数无回调返回' },

]
