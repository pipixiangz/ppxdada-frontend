const { generateService } = require("@umijs/openapi");

generateService({
  requestLibPath: "import request from '@/request'",
  //根据哪个地址的文档生成
  schemaPath: "http://localhost:8101/api/v2/api-docs",
  serversPath: "./src",
});
