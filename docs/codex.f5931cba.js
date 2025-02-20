var e,t,n,o,s,i,a,r,l,d,c,u,h,m,f,g,E,p,v,y,C,I,O,b,_,w=globalThis,T={},A={},S=w.parcelRequire94c2;null==S&&((S=function(e){if(e in T)return T[e].exports;if(e in A){var t=A[e];delete A[e];var n={id:e,exports:{}};return T[e]=n,t.call(n.exports,n,n.exports),n.exports}var o=Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){A[e]=t},w.parcelRequire94c2=S);var R=S.register;R("27Lyk",function(e,t){Object.defineProperty(e.exports,"register",{get:()=>n,set:e=>n=e,enumerable:!0,configurable:!0});var n,o=new Map;n=function(e,t){for(var n=0;n<t.length-1;n+=2)o.set(t[n],{baseUrl:e,path:t[n+1]})}}),R("lKpmK",function(e,t){e.exports=new URL("service-worker.ae2116a8.js",import.meta.url).toString()}),S("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["aVCRy","codex.f5931cba.js","3o9Aw","service-worker.ae2116a8.js"]'));var N=S("ilpIi"),L=S("8XP4m");(e=h||(h={})).STRING="string",e.NUMBER="number",e.INTEGER="integer",e.BOOLEAN="boolean",e.ARRAY="array",e.OBJECT="object",(t=m||(m={})).LANGUAGE_UNSPECIFIED="language_unspecified",t.PYTHON="python",(n=f||(f={})).OUTCOME_UNSPECIFIED="outcome_unspecified",n.OUTCOME_OK="outcome_ok",n.OUTCOME_FAILED="outcome_failed",n.OUTCOME_DEADLINE_EXCEEDED="outcome_deadline_exceeded";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const k=["user","model","function","system"];(o=g||(g={})).HARM_CATEGORY_UNSPECIFIED="HARM_CATEGORY_UNSPECIFIED",o.HARM_CATEGORY_HATE_SPEECH="HARM_CATEGORY_HATE_SPEECH",o.HARM_CATEGORY_SEXUALLY_EXPLICIT="HARM_CATEGORY_SEXUALLY_EXPLICIT",o.HARM_CATEGORY_HARASSMENT="HARM_CATEGORY_HARASSMENT",o.HARM_CATEGORY_DANGEROUS_CONTENT="HARM_CATEGORY_DANGEROUS_CONTENT",(s=E||(E={})).HARM_BLOCK_THRESHOLD_UNSPECIFIED="HARM_BLOCK_THRESHOLD_UNSPECIFIED",s.BLOCK_LOW_AND_ABOVE="BLOCK_LOW_AND_ABOVE",s.BLOCK_MEDIUM_AND_ABOVE="BLOCK_MEDIUM_AND_ABOVE",s.BLOCK_ONLY_HIGH="BLOCK_ONLY_HIGH",s.BLOCK_NONE="BLOCK_NONE",(i=p||(p={})).HARM_PROBABILITY_UNSPECIFIED="HARM_PROBABILITY_UNSPECIFIED",i.NEGLIGIBLE="NEGLIGIBLE",i.LOW="LOW",i.MEDIUM="MEDIUM",i.HIGH="HIGH",(a=v||(v={})).BLOCKED_REASON_UNSPECIFIED="BLOCKED_REASON_UNSPECIFIED",a.SAFETY="SAFETY",a.OTHER="OTHER",(r=y||(y={})).FINISH_REASON_UNSPECIFIED="FINISH_REASON_UNSPECIFIED",r.STOP="STOP",r.MAX_TOKENS="MAX_TOKENS",r.SAFETY="SAFETY",r.RECITATION="RECITATION",r.LANGUAGE="LANGUAGE",r.OTHER="OTHER",(l=C||(C={})).TASK_TYPE_UNSPECIFIED="TASK_TYPE_UNSPECIFIED",l.RETRIEVAL_QUERY="RETRIEVAL_QUERY",l.RETRIEVAL_DOCUMENT="RETRIEVAL_DOCUMENT",l.SEMANTIC_SIMILARITY="SEMANTIC_SIMILARITY",l.CLASSIFICATION="CLASSIFICATION",l.CLUSTERING="CLUSTERING",(d=I||(I={})).MODE_UNSPECIFIED="MODE_UNSPECIFIED",d.AUTO="AUTO",d.ANY="ANY",d.NONE="NONE",(c=O||(O={})).MODE_UNSPECIFIED="MODE_UNSPECIFIED",c.MODE_DYNAMIC="MODE_DYNAMIC";/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M extends Error{constructor(e){super(`[GoogleGenerativeAI Error]: ${e}`)}}class x extends M{constructor(e,t){super(e),this.response=t}}class D extends M{constructor(e,t,n,o){super(e),this.status=t,this.statusText=n,this.errorDetails=o}}class B extends M{}(u=b||(b={})).GENERATE_CONTENT="generateContent",u.STREAM_GENERATE_CONTENT="streamGenerateContent",u.COUNT_TOKENS="countTokens",u.EMBED_CONTENT="embedContent",u.BATCH_EMBED_CONTENTS="batchEmbedContents";class H{constructor(e,t,n,o,s){this.model=e,this.task=t,this.apiKey=n,this.stream=o,this.requestOptions=s}toString(){var e,t;let n=(null===(e=this.requestOptions)||void 0===e?void 0:e.apiVersion)||"v1beta",o=(null===(t=this.requestOptions)||void 0===t?void 0:t.baseUrl)||"https://generativelanguage.googleapis.com",s=`${o}/${n}/${this.model}:${this.task}`;return this.stream&&(s+="?alt=sse"),s}}async function F(e){var t;let n=new Headers;n.append("Content-Type","application/json"),n.append("x-goog-api-client",function(e){let t=[];return(null==e?void 0:e.apiClient)&&t.push(e.apiClient),t.push("genai-js/0.21.0"),t.join(" ")}(e.requestOptions)),n.append("x-goog-api-key",e.apiKey);let o=null===(t=e.requestOptions)||void 0===t?void 0:t.customHeaders;if(o){if(!(o instanceof Headers))try{o=new Headers(o)}catch(e){throw new B(`unable to convert customHeaders value ${JSON.stringify(o)} to Headers: ${e.message}`)}for(let[e,t]of o.entries()){if("x-goog-api-key"===e)throw new B(`Cannot set reserved header name ${e}`);if("x-goog-api-client"===e)throw new B(`Header name ${e} can only be set using the apiClient field`);n.append(e,t)}}return n}async function U(e,t,n,o,s,i){let a=new H(e,t,n,o,i);return{url:a.toString(),fetchOptions:Object.assign(Object.assign({},function(e){let t={};if((null==e?void 0:e.signal)!==void 0||(null==e?void 0:e.timeout)>=0){let n=new AbortController;(null==e?void 0:e.timeout)>=0&&setTimeout(()=>n.abort(),e.timeout),(null==e?void 0:e.signal)&&e.signal.addEventListener("abort",()=>{n.abort()}),t.signal=n.signal}return t}(i)),{method:"POST",headers:await F(a),body:s})}}async function $(e,t,n,o,s,i={},a=fetch){let{url:r,fetchOptions:l}=await U(e,t,n,o,s,i);return P(r,l,a)}async function P(e,t,n=fetch){let o;try{o=await n(e,t)}catch(t){!function(e,t){let n=e;throw e instanceof D||e instanceof B||((n=new M(`Error fetching from ${t.toString()}: ${e.message}`)).stack=e.stack),n}(t,e)}return o.ok||await j(o,e),o}async function j(e,t){let n,o="";try{let t=await e.json();o=t.error.message,t.error.details&&(o+=` ${JSON.stringify(t.error.details)}`,n=t.error.details)}catch(e){}throw new D(`Error fetching from ${t.toString()}: [${e.status} ${e.statusText}] ${o}`,e.status,e.statusText,n)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(e){return e.text=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning text from the first candidate only. Access response.candidates directly to use the other candidates.`),q(e.candidates[0]))throw new x(`${V(e)}`,e);return function(e){var t,n,o,s;let i=[];if(null===(n=null===(t=e.candidates)||void 0===t?void 0:t[0].content)||void 0===n?void 0:n.parts)for(let t of null===(s=null===(o=e.candidates)||void 0===o?void 0:o[0].content)||void 0===s?void 0:s.parts)t.text&&i.push(t.text),t.executableCode&&i.push("\n```"+t.executableCode.language+"\n"+t.executableCode.code+"\n```\n"),t.codeExecutionResult&&i.push("\n```\n"+t.codeExecutionResult.output+"\n```\n");return i.length>0?i.join(""):""}(e)}if(e.promptFeedback)throw new x(`Text not available. ${V(e)}`,e);return""},e.functionCall=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),q(e.candidates[0]))throw new x(`${V(e)}`,e);return console.warn("response.functionCall() is deprecated. Use response.functionCalls() instead."),K(e)[0]}if(e.promptFeedback)throw new x(`Function call not available. ${V(e)}`,e)},e.functionCalls=()=>{if(e.candidates&&e.candidates.length>0){if(e.candidates.length>1&&console.warn(`This response had ${e.candidates.length} candidates. Returning function calls from the first candidate only. Access response.candidates directly to use the other candidates.`),q(e.candidates[0]))throw new x(`${V(e)}`,e);return K(e)}if(e.promptFeedback)throw new x(`Function call not available. ${V(e)}`,e)},e}function K(e){var t,n,o,s;let i=[];if(null===(n=null===(t=e.candidates)||void 0===t?void 0:t[0].content)||void 0===n?void 0:n.parts)for(let t of null===(s=null===(o=e.candidates)||void 0===o?void 0:o[0].content)||void 0===s?void 0:s.parts)t.functionCall&&i.push(t.functionCall);return i.length>0?i:void 0}const Y=[y.RECITATION,y.SAFETY,y.LANGUAGE];function q(e){return!!e.finishReason&&Y.includes(e.finishReason)}function V(e){var t,n,o;let s="";if((!e.candidates||0===e.candidates.length)&&e.promptFeedback)s+="Response was blocked",(null===(t=e.promptFeedback)||void 0===t?void 0:t.blockReason)&&(s+=` due to ${e.promptFeedback.blockReason}`),(null===(n=e.promptFeedback)||void 0===n?void 0:n.blockReasonMessage)&&(s+=`: ${e.promptFeedback.blockReasonMessage}`);else if(null===(o=e.candidates)||void 0===o?void 0:o[0]){let t=e.candidates[0];q(t)&&(s+=`Candidate was blocked due to ${t.finishReason}`,t.finishMessage&&(s+=`: ${t.finishMessage}`))}return s}function J(e){return this instanceof J?(this.v=e,this):new J(e)}"function"==typeof SuppressedError&&SuppressedError;/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W=/^data\: (.*)(?:\n\n|\r\r|\r\n\r\n)/;async function X(e){let t=[],n=e.getReader();for(;;){let{done:e,value:o}=await n.read();if(e)return G(function(e){let t=e[e.length-1],n={promptFeedback:null==t?void 0:t.promptFeedback};for(let t of e){if(t.candidates)for(let e of t.candidates){let t=e.index;if(n.candidates||(n.candidates=[]),n.candidates[t]||(n.candidates[t]={index:e.index}),n.candidates[t].citationMetadata=e.citationMetadata,n.candidates[t].groundingMetadata=e.groundingMetadata,n.candidates[t].finishReason=e.finishReason,n.candidates[t].finishMessage=e.finishMessage,n.candidates[t].safetyRatings=e.safetyRatings,e.content&&e.content.parts){n.candidates[t].content||(n.candidates[t].content={role:e.content.role||"user",parts:[]});let o={};for(let s of e.content.parts)s.text&&(o.text=s.text),s.functionCall&&(o.functionCall=s.functionCall),s.executableCode&&(o.executableCode=s.executableCode),s.codeExecutionResult&&(o.codeExecutionResult=s.codeExecutionResult),0===Object.keys(o).length&&(o.text=""),n.candidates[t].content.parts.push(o)}}t.usageMetadata&&(n.usageMetadata=t.usageMetadata)}return n}(t));t.push(o)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Q(e,t,n,o){return function(e){let[t,n]=(function(e){let t=e.getReader();return new ReadableStream({start(e){let n="";return function o(){return t.read().then(({value:t,done:s})=>{let i;if(s){if(n.trim()){e.error(new M("Failed to parse stream"));return}e.close();return}let a=(n+=t).match(W);for(;a;){try{i=JSON.parse(a[1])}catch(t){e.error(new M(`Error parsing JSON response: "${a[1]}"`));return}e.enqueue(i),a=(n=n.substring(a[0].length)).match(W)}return o()})}()}})})(e.body.pipeThrough(new TextDecoderStream("utf8",{fatal:!0}))).tee();return{stream:function(e){return function(e,t,n){if(!Symbol.asyncIterator)throw TypeError("Symbol.asyncIterator is not defined.");var o,s=n.apply(e,t||[]),i=[];return o={},a("next"),a("throw"),a("return"),o[Symbol.asyncIterator]=function(){return this},o;function a(e){s[e]&&(o[e]=function(t){return new Promise(function(n,o){i.push([e,t,n,o])>1||r(e,t)})})}function r(e,t){try{var n;(n=s[e](t)).value instanceof J?Promise.resolve(n.value.v).then(l,d):c(i[0][2],n)}catch(e){c(i[0][3],e)}}function l(e){r("next",e)}function d(e){r("throw",e)}function c(e,t){e(t),i.shift(),i.length&&r(i[0][0],i[0][1])}}(this,arguments,function*(){let t=e.getReader();for(;;){let{value:e,done:n}=yield J(t.read());if(n)break;yield yield J(G(e))}})}(t),response:X(n)}}(await $(t,b.STREAM_GENERATE_CONTENT,e,!0,JSON.stringify(n),o))}async function z(e,t,n,o){let s=await $(t,b.GENERATE_CONTENT,e,!1,JSON.stringify(n),o);return{response:G(await s.json())}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Z(e){if(null!=e){if("string"==typeof e)return{role:"system",parts:[{text:e}]};if(e.text)return{role:"system",parts:[e]};if(e.parts)return e.role?e:{role:"system",parts:e.parts}}}function ee(e){let t=[];if("string"==typeof e)t=[{text:e}];else for(let n of e)"string"==typeof n?t.push({text:n}):t.push(n);return function(e){let t={role:"user",parts:[]},n={role:"function",parts:[]},o=!1,s=!1;for(let i of e)"functionResponse"in i?(n.parts.push(i),s=!0):(t.parts.push(i),o=!0);if(o&&s)throw new M("Within a single message, FunctionResponse cannot be mixed with other type of part in the request for sending chat message.");if(!o&&!s)throw new M("No content is provided for sending chat message.");return o?t:n}(t)}function et(e){let t;return t=e.contents?e:{contents:[ee(e)]},e.systemInstruction&&(t.systemInstruction=Z(e.systemInstruction)),t}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const en=["text","inlineData","functionCall","functionResponse","executableCode","codeExecutionResult"],eo={user:["text","inlineData"],function:["functionResponse"],model:["text","functionCall","executableCode","codeExecutionResult"],system:["text"]},es="SILENT_ERROR";class ei{constructor(e,t,n,o={}){this.model=t,this.params=n,this._requestOptions=o,this._history=[],this._sendPromise=Promise.resolve(),this._apiKey=e,(null==n?void 0:n.history)&&(function(e){let t=!1;for(let n of e){let{role:e,parts:o}=n;if(!t&&"user"!==e)throw new M(`First content should be with role 'user', got ${e}`);if(!k.includes(e))throw new M(`Each item should include role field. Got ${e} but valid roles are: ${JSON.stringify(k)}`);if(!Array.isArray(o))throw new M("Content should have 'parts' property with an array of Parts");if(0===o.length)throw new M("Each Content should have at least one part");let s={text:0,inlineData:0,functionCall:0,functionResponse:0,fileData:0,executableCode:0,codeExecutionResult:0};for(let e of o)for(let t of en)t in e&&(s[t]+=1);let i=eo[e];for(let t of en)if(!i.includes(t)&&s[t]>0)throw new M(`Content with role '${e}' can't contain '${t}' part`);t=!0}}(n.history),this._history=n.history)}async getHistory(){return await this._sendPromise,this._history}async sendMessage(e,t={}){var n,o,s,i,a,r;let l;await this._sendPromise;let d=ee(e),c={safetySettings:null===(n=this.params)||void 0===n?void 0:n.safetySettings,generationConfig:null===(o=this.params)||void 0===o?void 0:o.generationConfig,tools:null===(s=this.params)||void 0===s?void 0:s.tools,toolConfig:null===(i=this.params)||void 0===i?void 0:i.toolConfig,systemInstruction:null===(a=this.params)||void 0===a?void 0:a.systemInstruction,cachedContent:null===(r=this.params)||void 0===r?void 0:r.cachedContent,contents:[...this._history,d]},u=Object.assign(Object.assign({},this._requestOptions),t);return this._sendPromise=this._sendPromise.then(()=>z(this._apiKey,this.model,c,u)).then(e=>{var t;if(e.response.candidates&&e.response.candidates.length>0){this._history.push(d);let n=Object.assign({parts:[],role:"model"},null===(t=e.response.candidates)||void 0===t?void 0:t[0].content);this._history.push(n)}else{let t=V(e.response);t&&console.warn(`sendMessage() was unsuccessful. ${t}. Inspect response object for details.`)}l=e}),await this._sendPromise,l}async sendMessageStream(e,t={}){var n,o,s,i,a,r;await this._sendPromise;let l=ee(e),d={safetySettings:null===(n=this.params)||void 0===n?void 0:n.safetySettings,generationConfig:null===(o=this.params)||void 0===o?void 0:o.generationConfig,tools:null===(s=this.params)||void 0===s?void 0:s.tools,toolConfig:null===(i=this.params)||void 0===i?void 0:i.toolConfig,systemInstruction:null===(a=this.params)||void 0===a?void 0:a.systemInstruction,cachedContent:null===(r=this.params)||void 0===r?void 0:r.cachedContent,contents:[...this._history,l]},c=Object.assign(Object.assign({},this._requestOptions),t),u=Q(this._apiKey,this.model,d,c);return this._sendPromise=this._sendPromise.then(()=>u).catch(e=>{throw Error(es)}).then(e=>e.response).then(e=>{if(e.candidates&&e.candidates.length>0){this._history.push(l);let t=Object.assign({},e.candidates[0].content);t.role||(t.role="model"),this._history.push(t)}else{let t=V(e);t&&console.warn(`sendMessageStream() was unsuccessful. ${t}. Inspect response object for details.`)}}).catch(e=>{e.message!==es&&console.error(e)}),u}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ea(e,t,n,o){return(await $(t,b.COUNT_TOKENS,e,!1,JSON.stringify(n),o)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function er(e,t,n,o){return(await $(t,b.EMBED_CONTENT,e,!1,JSON.stringify(n),o)).json()}async function el(e,t,n,o){let s=n.requests.map(e=>Object.assign(Object.assign({},e),{model:t}));return(await $(t,b.BATCH_EMBED_CONTENTS,e,!1,JSON.stringify({requests:s}),o)).json()}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ed{constructor(e,t,n={}){this.apiKey=e,this._requestOptions=n,t.model.includes("/")?this.model=t.model:this.model=`models/${t.model}`,this.generationConfig=t.generationConfig||{},this.safetySettings=t.safetySettings||[],this.tools=t.tools,this.toolConfig=t.toolConfig,this.systemInstruction=Z(t.systemInstruction),this.cachedContent=t.cachedContent}async generateContent(e,t={}){var n;let o=et(e),s=Object.assign(Object.assign({},this._requestOptions),t);return z(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(n=this.cachedContent)||void 0===n?void 0:n.name},o),s)}async generateContentStream(e,t={}){var n;let o=et(e),s=Object.assign(Object.assign({},this._requestOptions),t);return Q(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(n=this.cachedContent)||void 0===n?void 0:n.name},o),s)}startChat(e){var t;return new ei(this.apiKey,this.model,Object.assign({generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:null===(t=this.cachedContent)||void 0===t?void 0:t.name},e),this._requestOptions)}async countTokens(e,t={}){let n=function(e,t){var n;let o={model:null==t?void 0:t.model,generationConfig:null==t?void 0:t.generationConfig,safetySettings:null==t?void 0:t.safetySettings,tools:null==t?void 0:t.tools,toolConfig:null==t?void 0:t.toolConfig,systemInstruction:null==t?void 0:t.systemInstruction,cachedContent:null===(n=null==t?void 0:t.cachedContent)||void 0===n?void 0:n.name,contents:[]},s=null!=e.generateContentRequest;if(e.contents){if(s)throw new B("CountTokensRequest must have one of contents or generateContentRequest, not both.");o.contents=e.contents}else if(s)o=Object.assign(Object.assign({},o),e.generateContentRequest);else{let t=ee(e);o.contents=[t]}return{generateContentRequest:o}}(e,{model:this.model,generationConfig:this.generationConfig,safetySettings:this.safetySettings,tools:this.tools,toolConfig:this.toolConfig,systemInstruction:this.systemInstruction,cachedContent:this.cachedContent}),o=Object.assign(Object.assign({},this._requestOptions),t);return ea(this.apiKey,this.model,n,o)}async embedContent(e,t={}){let n="string"==typeof e||Array.isArray(e)?{content:ee(e)}:e,o=Object.assign(Object.assign({},this._requestOptions),t);return er(this.apiKey,this.model,n,o)}async batchEmbedContents(e,t={}){let n=Object.assign(Object.assign({},this._requestOptions),t);return el(this.apiKey,this.model,e,n)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ec{constructor(e){this.apiKey=e}getGenerativeModel(e,t){if(!e.model)throw new M("Must provide a model name. Example: genai.getGenerativeModel({ model: 'my-model-name' })");return new ed(this.apiKey,e,t)}getGenerativeModelFromCachedContent(e,t,n){if(!e.name)throw new B("Cached content must contain a `name` field.");if(!e.model)throw new B("Cached content must contain a `model` field.");for(let n of["model","systemInstruction"])if((null==t?void 0:t[n])&&e[n]&&(null==t?void 0:t[n])!==e[n]){if("model"===n&&(t.model.startsWith("models/")?t.model.replace("models/",""):t.model)===(e.model.startsWith("models/")?e.model.replace("models/",""):e.model))continue;throw new B(`Different value for "${n}" specified in modelParams (${t[n]}) and cachedContent (${e[n]})`)}let o=Object.assign(Object.assign({},t),{model:e.model,tools:e.tools,toolConfig:e.toolConfig,systemInstruction:e.systemInstruction,cachedContent:e});return new ed(this.apiKey,o,n)}}const eu=document.getElementById("ai-send-btn"),eh=document.getElementById("ai-chat-input"),em=document.getElementById("chat-history"),ef=new URL(S("lKpmK"));async function eg(){_=new ec((await (0,N.getDoc)((0,N.doc)(L.db,"apikey","googlegenai"))).data().key).getGenerativeModel({model:"gemini-1.5-flash"})}async function eE(e){ep("ChatBot: "+(await _.generateContent(e)).response.text())}function ep(e){let t=document.createElement("p");t.textContent=e,t.className="history",em.appendChild(t),eh.value=""}"serviceWorker"in navigator&&navigator.serviceWorker.register(ef.href,{scope:"/codex/"}).then(()=>console.log("Service Worker Registered for scope:",ef.href,"with","file:///assets/scripts/app.js")).catch(e=>console.error("Service Worker Error:",e)),document.addEventListener("DOMContentLoaded",async()=>{await new Promise((e,t)=>{(0,L.auth).onAuthStateChanged(n=>{n?e(n):(console.log("User is not authenticated"),window.location="index.html",t("User not authenticated"))})}),eg();let e=[],t=document.getElementById("book-list"),n=document.getElementById("book-form"),o=document.getElementById("book-management-form"),s=document.getElementById("side-menu"),i=document.getElementById("menu-overlay"),a=document.getElementById("burger-menu"),r=document.getElementById("close-menu"),l=document.getElementById("add-book-link"),d=document.getElementById("sign-out"),c=document.getElementById("close-form"),u=document.getElementById("delete-book"),h=document.getElementById("book-id");function m(){s.classList.remove("open"),i.classList.remove("show"),v(!1)}function f(){t.innerHTML="",e.forEach(e=>{var n;let o=document.createElement("article");if(o.id=e.id,o.classList.add("book-card"),o.setAttribute("aria-labelledby",`book-title-${e.id}`),o.tabIndex=0,""!==e.cover){let t=document.createElement("div");t.classList.add("book-img");let n=document.createElement("img");n.src=e.cover,n.alt=`${e.title} Book Cover`,t.appendChild(n),o.appendChild(t)}let s=document.createElement("div");s.classList.add("book-info");let i=document.createElement("h2");i.id=`book-title-${e.id}`,i.textContent=e.title;let a=document.createElement("p");a.innerHTML=`<strong>Author:</strong> ${e.author}`;let r=document.createElement("p");r.innerHTML=`<strong>Genre:</strong> ${e.genre.join(", ")}`;let l=document.createElement("p");l.innerHTML=`<strong>Status:</strong> ${e.status}`;let d=document.createElement("p");d.innerHTML=`<strong>Progress:</strong> ${e.progress}%`;let c=document.createElement("span");c.classList.add("book-rating"),c.setAttribute("aria-label",`Rating: ${e.rating} out of 5 stars`),c.innerHTML=(n=e.rating,"&starf;".repeat(n)+"&star;".repeat(5-n)),s.appendChild(i),s.appendChild(a),s.appendChild(r),s.appendChild(l),s.appendChild(d),o.appendChild(s),o.appendChild(c),t.appendChild(o)})}v(!1),a.addEventListener("click",function(){s.classList.add("open"),i.classList.add("show"),v(!0),function(){let e=s.querySelectorAll("a"),t=s.querySelector("#close-menu"),n=e[0],o=e[e.length-1];s.addEventListener("keydown",e=>{"Tab"===e.key&&(e.shiftKey?document.activeElement===n?(t.focus(),e.preventDefault()):document.activeElement===t&&(o.focus(),e.preventDefault()):document.activeElement===o?(t.focus(),e.preventDefault()):document.activeElement===t&&(n.focus(),e.preventDefault()))})}()}),r.addEventListener("click",m),i.addEventListener("click",m),await (0,L.getBooksFromFirestore)(e);let g=null;function E(e){e&&(e.classList.add("highlight"),e.focus(),e.scrollIntoView({behavior:"smooth"}),setTimeout(()=>e.classList.remove("highlight"),1e3))}function p(e=null){let o=document.getElementById("book-cover"),s=document.getElementById("book-id"),i=document.getElementById("book-title"),a=document.getElementById("book-author"),r=document.getElementById("book-genre"),l=document.getElementById("book-progress"),d=document.getElementById("book-status"),c=document.getElementById("book-rating");e?(o.value=e.cover,s.value=e.id,i.value=e.title,a.value=e.author,r.value=e.genre,l.value=e.progress,d.value=e.status,c.value=e.rating,u.style.display="inline-block"):(o.value="",s.value="",i.value="",a.value="",r.value="",l.value="",d.value="Not Read",c.value="",u.style.display="none"),n.classList.add("show"),t.classList.add("hide")}function v(e){let t=s.querySelectorAll("nav a"),n=s.querySelector("#close-menu");t.forEach(t=>{e?t.setAttribute("tabindex","0"):t.setAttribute("tabindex","-1")}),e?n.setAttribute("tabindex","0"):n.setAttribute("tabindex","-1")}function y(e){let t=document.createElement("div");return t.textContent=e,t.innerHTML}t.addEventListener("keydown",n=>{if("ArrowDown"===n.key){if(n.preventDefault(),null===g)g=t.querySelector(".book-card");else{let e=g.nextElementSibling;e&&e.classList.contains("book-card")&&(g=e)}E(g)}else if("ArrowUp"===n.key){if(n.preventDefault(),null===g)g=t.querySelector(".book-card");else{let e=g.previousElementSibling;e&&e.classList.contains("book-card")&&(g=e)}E(g)}else if(("Enter"===n.key||" "===n.key)&&(n.preventDefault(),g)){let t=g.id;p(e.find(e=>e.id==t))}}),t.addEventListener("focusin",e=>{e.target&&e.target.classList.contains("book-card")&&(g=e.target)}),t.addEventListener("click",t=>{let n=t.target.closest(".book-card");if(n){let t=n.id;p(e.find(e=>e.id==t))}}),o.addEventListener("submit",async o=>{let s;o.preventDefault();let i=o.target;if(!i.checkValidity()){i.reportValidity();return}let a=y(document.getElementById("book-cover").value.trim()),r=y(document.getElementById("book-title").value.trim()),l=y(document.getElementById("book-author").value.trim()),d=document.getElementById("book-genre").value.split(",").map(e=>y(e.trim())),c=y(document.getElementById("book-progress").value.trim()),u=y(document.getElementById("book-status").value.trim()),m=y(document.getElementById("book-rating").value.trim());if(""!==h.value){let t=e.findIndex(e=>e.id==h.value);if(-1!==t){e[t]={id:h.value,cover:a,title:r,author:l,genre:d,progress:c,status:u,rating:m};try{await (0,L.updateBookInFirestore)(e[t])}catch(e){console.error("Error updating book in Firestore: ",e)}s=e[t]}}else{let t={cover:a,title:r,author:l,genre:d,progress:c,status:u,rating:m};e.push(t);try{e[e.length-1].id=await (0,L.addBookToFirestore)(t)}catch(e){console.error("Error adding book to Firestore: ",e)}s=t}f(),n.classList.remove("show"),t.classList.remove("hide");let g=document.getElementById(s.id);g&&(g.classList.add("highlight"),g.focus(),g.scrollIntoView({behavior:"smooth"}),setTimeout(()=>g.classList.remove("highlight"),1500))}),c.addEventListener("click",()=>{n.classList.remove("show"),t.classList.remove("hide")}),u.addEventListener("click",function(){if(""!==h.value&&confirm(`Are you sure you want to delete the book "${document.getElementById("book-title").value}" entry?`)){let o=e.findIndex(e=>e.id==h.value);if(-1!==o){try{(0,L.removeBookFromFirestore)(h.value)}catch(e){console.error("Error removing book from Firestore: ",e)}e.splice(o,1)}f(),n.classList.remove("show"),t.classList.remove("hide")}}),l.addEventListener("click",e=>{e.preventDefault(),p(),m()}),d.addEventListener("click",async e=>{e.preventDefault();try{await (0,L.auth).signOut(),window.location="index.html"}catch(e){console.error("Error signing out: ",e)}}),f(),eu.addEventListener("click",async()=>{var e;let t=eh.value.trim().toLowerCase();t?(ep("You: "+t),e=0,eE(t)):ep("Please enter a prompt")})});
//# sourceMappingURL=codex.f5931cba.js.map
