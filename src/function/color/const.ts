/* 颜色色值匹配的正则 **/ 
export const colorValueReg = /#[0-9a-fA-F]+/;
/* 颜色配置匹配的正则 **/ 
export const colorConfigReg = /([\$a-zA-Z_-][\$a-zA-Z0-9_-]*):+\s*(#[0-9a-fA-F]+)/g;