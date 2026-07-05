var Me=Object.defineProperty;var De=(n,e,t)=>e in n?Me(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var x=(n,e,t)=>De(n,typeof e!="symbol"?e+"":e,t);import{r as P,j as c,n as He,o as be,B as K,p as ye,q as Be,F as we,s as Se,t as Ce,L as qe,S as Oe,u as _e,v as Fe,M as Ze,w as Ge}from"./react-vendor-BkAB2LzW.js";import{B as ce}from"./badge-DKmsA70d.js";import{b as Qe}from"./index-46bRfBEP.js";function ee(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var L=ee();function Ae(n){L=n}var $={exec:()=>null};function j(n){let e=[];return t=>{let s=Math.max(0,Math.min(3,t-1)),r=e[s];return r||(r=n(s),e[s]=r),r}}function m(n,e=""){let t=typeof n=="string"?n:n.source,s={replace:(r,i)=>{let a=typeof i=="string"?i:i.source;return a=a.replace(S.caret,"$1"),t=t.replace(r,a),s},getRegex:()=>new RegExp(t,e)};return s}var We=((n="")=>{try{return!!new RegExp("(?<=1)(?<!1)"+n)}catch{return!1}})(),S={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:n=>new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:j(n=>new RegExp(`^ {0,${n}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:j(n=>new RegExp(`^ {0,${n}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),fencesBeginRegex:j(n=>new RegExp(`^ {0,${n}}(?:\`\`\`|~~~)`)),headingBeginRegex:j(n=>new RegExp(`^ {0,${n}}#`)),htmlBeginRegex:j(n=>new RegExp(`^ {0,${n}}<(?:[a-z].*>|!--)`,"i")),blockquoteBeginRegex:j(n=>new RegExp(`^ {0,${n}}>`))},Ve=/^(?:[ \t]*(?:\n|$))+/,Ue=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Ke=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,D=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Xe=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,te=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,ve=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Re=m(ve).replace(/bull/g,te).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ye=m(ve).replace(/bull/g,te).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),ne=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Je=/^[^\n]+/,re=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,et=m(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",re).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),tt=m(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,te).getRegex(),W="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",se=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,nt=m("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",se).replace("tag",W).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Te=m(ne).replace("hr",D).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",W).getRegex(),rt=m(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Te).getRegex(),ie={blockquote:rt,code:Ue,def:et,fences:Ke,heading:Xe,hr:D,html:nt,lheading:Re,list:tt,newline:Ve,paragraph:Te,table:$,text:Je},he=m("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",D).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",W).getRegex(),st={...ie,lheading:Ye,table:he,paragraph:m(ne).replace("hr",D).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",he).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",W).getRegex()},it={...ie,html:m(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",se).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:$,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:m(ne).replace("hr",D).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Re).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},at=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,lt=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Pe=/^( {2,}|\\)\n(?!\s*$)/,ot=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,E=/[\p{P}\p{S}]/u,V=/[\s\p{P}\p{S}]/u,ae=/[^\s\p{P}\p{S}]/u,ct=m(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,V).getRegex(),Ne=/(?!~)[\p{P}\p{S}]/u,ht=/(?!~)[\s\p{P}\p{S}]/u,ut=/(?:[^\s\p{P}\p{S}]|~)/u,pt=m(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",We?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),$e=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,dt=m($e,"u").replace(/punct/g,E).getRegex(),gt=m($e,"u").replace(/punct/g,Ne).getRegex(),ze="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",mt=m(ze,"gu").replace(/notPunctSpace/g,ae).replace(/punctSpace/g,V).replace(/punct/g,E).getRegex(),ft=m(ze,"gu").replace(/notPunctSpace/g,ut).replace(/punctSpace/g,ht).replace(/punct/g,Ne).getRegex(),xt=m("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,ae).replace(/punctSpace/g,V).replace(/punct/g,E).getRegex(),kt=m(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,E).getRegex(),bt="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",yt=m(bt,"gu").replace(/notPunctSpace/g,ae).replace(/punctSpace/g,V).replace(/punct/g,E).getRegex(),wt=m(/\\(punct)/,"gu").replace(/punct/g,E).getRegex(),St=m(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ct=m(se).replace("(?:-->|$)","-->").getRegex(),At=m("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ct).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Z=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,vt=m(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",Z).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Le=m(/^!?\[(label)\]\[(ref)\]/).replace("label",Z).replace("ref",re).getRegex(),je=m(/^!?\[(ref)\](?:\[\])?/).replace("ref",re).getRegex(),Rt=m("reflink|nolink(?!\\()","g").replace("reflink",Le).replace("nolink",je).getRegex(),ue=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,le={_backpedal:$,anyPunctuation:wt,autolink:St,blockSkip:pt,br:Pe,code:lt,del:$,delLDelim:$,delRDelim:$,emStrongLDelim:dt,emStrongRDelimAst:mt,emStrongRDelimUnd:xt,escape:at,link:vt,nolink:je,punctuation:ct,reflink:Le,reflinkSearch:Rt,tag:At,text:ot,url:$},Tt={...le,link:m(/^!?\[(label)\]\((.*?)\)/).replace("label",Z).getRegex(),reflink:m(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Z).getRegex()},X={...le,emStrongRDelimAst:ft,emStrongLDelim:gt,delLDelim:kt,delRDelim:yt,url:m(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ue).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:m(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ue).getRegex()},Pt={...X,br:m(Pe).replace("{2,}","*").getRegex(),text:m(X.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},_={normal:ie,gfm:st,pedantic:it},I={normal:le,gfm:X,breaks:Pt,pedantic:Tt},Nt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},pe=n=>Nt[n];function R(n,e){if(e){if(S.escapeTest.test(n))return n.replace(S.escapeReplace,pe)}else if(S.escapeTestNoEncode.test(n))return n.replace(S.escapeReplaceNoEncode,pe);return n}function de(n){try{n=encodeURI(n).replace(S.percentDecode,"%")}catch{return null}return n}function ge(n,e){let t=n.replace(S.findPipe,(i,a,l)=>{let h=!1,o=a;for(;--o>=0&&l[o]==="\\";)h=!h;return h?"|":" |"}),s=t.split(S.splitPipe),r=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;r<s.length;r++)s[r]=s[r].trim().replace(S.slashPipe,"|");return s}function N(n,e,t){let s=n.length;if(s===0)return"";let r=0;for(;r<s&&n.charAt(s-r-1)===e;)r++;return n.slice(0,s-r)}function me(n){let e=n.split(`
`),t=e.length-1;for(;t>=0&&S.blankLine.test(e[t]);)t--;return e.length-t<=2?n:e.slice(0,t+1).join(`
`)}function $t(n,e){if(n.indexOf(e[1])===-1)return-1;let t=0;for(let s=0;s<n.length;s++)if(n[s]==="\\")s++;else if(n[s]===e[0])t++;else if(n[s]===e[1]&&(t--,t<0))return s;return t>0?-2:-1}function zt(n,e=0){let t=e,s="";for(let r of n)if(r==="	"){let i=4-t%4;s+=" ".repeat(i),t+=i}else s+=r,t++;return s}function fe(n,e,t,s,r){let i=e.href,a=e.title||null,l=n[1].replace(r.other.outputLinkReplace,"$1");s.state.inLink=!0;let h={type:n[0].charAt(0)==="!"?"image":"link",raw:t,href:i,title:a,text:l,tokens:s.inlineTokens(l)};return s.state.inLink=!1,h}function Lt(n,e,t){let s=n.match(t.other.indentCodeCompensation);if(s===null)return e;let r=s[1];return e.split(`
`).map(i=>{let a=i.match(t.other.beginningSpace);if(a===null)return i;let[l]=a;return l.length>=r.length?i.slice(r.length):i}).join(`
`)}var G=class{constructor(n){x(this,"options");x(this,"rules");x(this,"lexer");this.options=n||L}space(n){let e=this.rules.block.newline.exec(n);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(n){let e=this.rules.block.code.exec(n);if(e){let t=this.options.pedantic?e[0]:me(e[0]),s=t.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t,codeBlockStyle:"indented",text:s}}}fences(n){let e=this.rules.block.fences.exec(n);if(e){let t=e[0],s=Lt(t,e[3]||"",this.rules);return{type:"code",raw:t,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:s}}}heading(n){let e=this.rules.block.heading.exec(n);if(e){let t=e[2].trim();if(this.rules.other.endingHash.test(t)){let s=N(t,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(t=s.trim())}return{type:"heading",raw:N(e[0],`
`),depth:e[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(n){let e=this.rules.block.hr.exec(n);if(e)return{type:"hr",raw:N(e[0],`
`)}}blockquote(n){let e=this.rules.block.blockquote.exec(n);if(e){let t=N(e[0],`
`).split(`
`),s="",r="",i=[];for(;t.length>0;){let a=!1,l=[],h;for(h=0;h<t.length;h++)if(this.rules.other.blockquoteStart.test(t[h]))l.push(t[h]),a=!0;else if(!a)l.push(t[h]);else break;t=t.slice(h);let o=l.join(`
`),d=o.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${o}`:o,r=r?`${r}
${d}`:d;let u=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(d,i,!0),this.lexer.state.top=u,t.length===0)break;let g=i.at(-1);if(g?.type==="code")break;if(g?.type==="blockquote"){let b=g,k=b.raw+`
`+t.join(`
`),C=this.blockquote(k);i[i.length-1]=C,s=s.substring(0,s.length-b.raw.length)+C.raw,r=r.substring(0,r.length-b.text.length)+C.text;break}else if(g?.type==="list"){let b=g,k=b.raw+`
`+t.join(`
`),C=this.list(k);i[i.length-1]=C,s=s.substring(0,s.length-g.raw.length)+C.raw,r=r.substring(0,r.length-b.raw.length)+C.raw,t=k.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:i,text:r}}}list(n){let e=this.rules.block.list.exec(n);if(e){let t=e[1].trim(),s=t.length>1,r={type:"list",raw:"",ordered:s,start:s?+t.slice(0,-1):"",loose:!1,items:[]};t=s?`\\d{1,9}\\${t.slice(-1)}`:`\\${t}`,this.options.pedantic&&(t=s?t:"[*+-]");let i=this.rules.other.listItemRegex(t),a=!1;for(;n;){let h=!1,o="",d="";if(!(e=i.exec(n))||this.rules.block.hr.test(n))break;o=e[0],n=n.substring(o.length);let u=zt(e[2].split(`
`,1)[0],e[1].length),g=n.split(`
`,1)[0],b=!u.trim(),k=0;if(this.options.pedantic?(k=2,d=u.trimStart()):b?k=e[1].length+1:(k=u.search(this.rules.other.nonSpaceChar),k=k>4?1:k,d=u.slice(k),k+=e[1].length),b&&this.rules.other.blankLine.test(g)&&(o+=g+`
`,n=n.substring(g.length+1),h=!0),!h){let C=this.rules.other.nextBulletRegex(k),H=this.rules.other.hrRegex(k),B=this.rules.other.fencesBeginRegex(k),q=this.rules.other.headingBeginRegex(k),O=this.rules.other.htmlBeginRegex(k),p=this.rules.other.blockquoteBeginRegex(k);for(;n;){let w=n.split(`
`,1)[0],y;if(g=w,this.options.pedantic?(g=g.replace(this.rules.other.listReplaceNesting,"  "),y=g):y=g.replace(this.rules.other.tabCharGlobal,"    "),B.test(g)||q.test(g)||O.test(g)||p.test(g)||C.test(g)||H.test(g))break;if(y.search(this.rules.other.nonSpaceChar)>=k||!g.trim())d+=`
`+y.slice(k);else{if(b||u.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||B.test(u)||q.test(u)||H.test(u))break;d+=`
`+g}b=!g.trim(),o+=w+`
`,n=n.substring(w.length+1),u=y.slice(k)}}r.loose||(a?r.loose=!0:this.rules.other.doubleBlankLine.test(o)&&(a=!0)),r.items.push({type:"list_item",raw:o,task:!!this.options.gfm&&this.rules.other.listIsTask.test(d),loose:!1,text:d,tokens:[]}),r.raw+=o}let l=r.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let h of r.items){this.lexer.state.top=!1,h.tokens=this.lexer.blockTokens(h.text,[]);let o=h.tokens[0];if(h.task&&(o?.type==="text"||o?.type==="paragraph")){h.text=h.text.replace(this.rules.other.listReplaceTask,""),o.raw=o.raw.replace(this.rules.other.listReplaceTask,""),o.text=o.text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}let d=this.rules.other.listTaskCheckbox.exec(h.raw);if(d){let u={type:"checkbox",raw:d[0]+" ",checked:d[0]!=="[ ]"};h.checked=u.checked,r.loose?h.tokens[0]&&["paragraph","text"].includes(h.tokens[0].type)&&"tokens"in h.tokens[0]&&h.tokens[0].tokens?(h.tokens[0].raw=u.raw+h.tokens[0].raw,h.tokens[0].text=u.raw+h.tokens[0].text,h.tokens[0].tokens.unshift(u)):h.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):h.tokens.unshift(u)}}else h.task&&(h.task=!1);if(!r.loose){let d=h.tokens.filter(g=>g.type==="space"),u=d.length>0&&d.some(g=>this.rules.other.anyLine.test(g.raw));r.loose=u}}if(r.loose)for(let h of r.items){h.loose=!0;for(let o of h.tokens)o.type==="text"&&(o.type="paragraph")}return r}}html(n){let e=this.rules.block.html.exec(n);if(e){let t=me(e[0]);return{type:"html",block:!0,raw:t,pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:t}}}def(n){let e=this.rules.block.def.exec(n);if(e){let t=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:t,raw:N(e[0],`
`),href:s,title:r}}}table(n){let e=this.rules.block.table.exec(n);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let t=ge(e[1]),s=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),r=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:N(e[0],`
`),header:[],align:[],rows:[]};if(t.length===s.length){for(let a of s)this.rules.other.tableAlignRight.test(a)?i.align.push("right"):this.rules.other.tableAlignCenter.test(a)?i.align.push("center"):this.rules.other.tableAlignLeft.test(a)?i.align.push("left"):i.align.push(null);for(let a=0;a<t.length;a++)i.header.push({text:t[a],tokens:this.lexer.inline(t[a]),header:!0,align:i.align[a]});for(let a of r)i.rows.push(ge(a,i.header.length).map((l,h)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:i.align[h]})));return i}}lheading(n){let e=this.rules.block.lheading.exec(n);if(e){let t=e[1].trim();return{type:"heading",raw:N(e[0],`
`),depth:e[2].charAt(0)==="="?1:2,text:t,tokens:this.lexer.inline(t)}}}paragraph(n){let e=this.rules.block.paragraph.exec(n);if(e){let t=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}}}text(n){let e=this.rules.block.text.exec(n);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(n){let e=this.rules.inline.escape.exec(n);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(n){let e=this.rules.inline.tag.exec(n);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(n){let e=this.rules.inline.link.exec(n);if(e){let t=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(t)){if(!this.rules.other.endAngleBracket.test(t))return;let i=N(t.slice(0,-1),"\\");if((t.length-i.length)%2===0)return}else{let i=$t(e[2],"()");if(i===-2)return;if(i>-1){let a=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,a).trim(),e[3]=""}}let s=e[2],r="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(s);i&&(s=i[1],r=i[3])}else r=e[3]?e[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(t)?s=s.slice(1):s=s.slice(1,-1)),fe(e,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(n,e){let t;if((t=this.rules.inline.reflink.exec(n))||(t=this.rules.inline.nolink.exec(n))){let s=(t[2]||t[1]).replace(this.rules.other.multipleSpaceGlobal," "),r=e[s.toLowerCase()];if(!r){let i=t[0].charAt(0);return{type:"text",raw:i,text:i}}return fe(t,r,t[0],this.lexer,this.rules)}}emStrong(n,e,t=""){let s=this.rules.inline.emStrongLDelim.exec(n);if(!(!s||!s[1]&&!s[2]&&!s[3]&&!s[4]||s[4]&&t.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[3])||!t||this.rules.inline.punctuation.exec(t))){let r=[...s[0]].length-1,i,a,l=r,h=0,o=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(o.lastIndex=0,e=e.slice(-1*n.length+r);(s=o.exec(e))!==null;){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i)continue;if(a=[...i].length,s[3]||s[4]){l+=a;continue}else if((s[5]||s[6])&&r%3&&!((r+a)%3)){h+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+h);let d=[...s[0]][0].length,u=n.slice(0,r+s.index+d+a);if(Math.min(r,a)%2){let b=u.slice(1,-1);return{type:"em",raw:u,text:b,tokens:this.lexer.inlineTokens(b)}}let g=u.slice(2,-2);return{type:"strong",raw:u,text:g,tokens:this.lexer.inlineTokens(g)}}}}codespan(n){let e=this.rules.inline.code.exec(n);if(e){let t=e[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(t),r=this.rules.other.startingSpaceChar.test(t)&&this.rules.other.endingSpaceChar.test(t);return s&&r&&(t=t.substring(1,t.length-1)),{type:"codespan",raw:e[0],text:t}}}br(n){let e=this.rules.inline.br.exec(n);if(e)return{type:"br",raw:e[0]}}del(n,e,t=""){let s=this.rules.inline.delLDelim.exec(n);if(s&&(!s[1]||!t||this.rules.inline.punctuation.exec(t))){let r=[...s[0]].length-1,i,a,l=r,h=this.rules.inline.delRDelim;for(h.lastIndex=0,e=e.slice(-1*n.length+r);(s=h.exec(e))!==null;){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i||(a=[...i].length,a!==r))continue;if(s[3]||s[4]){l+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l);let o=[...s[0]][0].length,d=n.slice(0,r+s.index+o+a),u=d.slice(r,-r);return{type:"del",raw:d,text:u,tokens:this.lexer.inlineTokens(u)}}}}autolink(n){let e=this.rules.inline.autolink.exec(n);if(e){let t,s;return e[2]==="@"?(t=e[1],s="mailto:"+t):(t=e[1],s=t),{type:"link",raw:e[0],text:t,href:s,tokens:[{type:"text",raw:t,text:t}]}}}url(n){let e;if(e=this.rules.inline.url.exec(n)){let t,s;if(e[2]==="@")t=e[0],s="mailto:"+t;else{let r;do r=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(r!==e[0]);t=e[0],e[1]==="www."?s="http://"+e[0]:s=e[0]}return{type:"link",raw:e[0],text:t,href:s,tokens:[{type:"text",raw:t,text:t}]}}}inlineText(n){let e=this.rules.inline.text.exec(n);if(e){let t=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:t}}}},A=class Y{constructor(e){x(this,"tokens");x(this,"options");x(this,"state");x(this,"inlineQueue");x(this,"tokenizer");this.tokens=[],this.tokens.links=Object.create(null),this.options=e||L,this.options.tokenizer=this.options.tokenizer||new G,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:S,block:_.normal,inline:I.normal};this.options.pedantic?(t.block=_.pedantic,t.inline=I.pedantic):this.options.gfm&&(t.block=_.gfm,this.options.breaks?t.inline=I.breaks:t.inline=I.gfm),this.tokenizer.rules=t}static get rules(){return{block:_,inline:I}}static lex(e,t){return new Y(t).lex(e)}static lexInline(e,t){return new Y(t).inlineTokens(e)}lex(e){e=e.replace(S.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let s=this.inlineQueue[t];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],s=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(S.tabCharGlobal,"    ").replace(S.spaceLine,""));let r=1/0;for(;e;){if(e.length<r)r=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}let i;if(this.options.extensions?.block?.some(l=>(i=l.call({lexer:this},e,t))?(e=e.substring(i.raw.length),t.push(i),!0):!1))continue;if(i=this.tokenizer.space(e)){e=e.substring(i.raw.length);let l=t.at(-1);i.raw.length===1&&l!==void 0?l.raw+=`
`:t.push(i);continue}if(i=this.tokenizer.code(e)){e=e.substring(i.raw.length);let l=t.at(-1);l?.type==="paragraph"||l?.type==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+i.raw,l.text+=`
`+i.text,this.inlineQueue.at(-1).src=l.text):t.push(i);continue}if(i=this.tokenizer.fences(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.heading(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.hr(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.blockquote(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.list(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.html(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.def(e)){e=e.substring(i.raw.length);let l=t.at(-1);l?.type==="paragraph"||l?.type==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+i.raw,l.text+=`
`+i.raw,this.inlineQueue.at(-1).src=l.text):this.tokens.links[i.tag]||(this.tokens.links[i.tag]={href:i.href,title:i.title},t.push(i));continue}if(i=this.tokenizer.table(e)){e=e.substring(i.raw.length),t.push(i);continue}if(i=this.tokenizer.lheading(e)){e=e.substring(i.raw.length),t.push(i);continue}let a=e;if(this.options.extensions?.startBlock){let l=1/0,h=e.slice(1),o;this.options.extensions.startBlock.forEach(d=>{o=d.call({lexer:this},h),typeof o=="number"&&o>=0&&(l=Math.min(l,o))}),l<1/0&&l>=0&&(a=e.substring(0,l+1))}if(this.state.top&&(i=this.tokenizer.paragraph(a))){let l=t.at(-1);s&&l?.type==="paragraph"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+i.raw,l.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):t.push(i),s=a.length!==e.length,e=e.substring(i.raw.length);continue}if(i=this.tokenizer.text(e)){e=e.substring(i.raw.length);let l=t.at(-1);l?.type==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+i.raw,l.text+=`
`+i.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):t.push(i);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let s=e,r=null;if(this.tokens.links){let o=Object.keys(this.tokens.links);if(o.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(s))!==null;)o.includes(r[0].slice(r[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(s))!==null;)s=s.slice(0,r.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(r=this.tokenizer.rules.inline.blockSkip.exec(s))!==null;)i=r[2]?r[2].length:0,s=s.slice(0,r.index+i)+"["+"a".repeat(r[0].length-i-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let a=!1,l="",h=1/0;for(;e;){if(e.length<h)h=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}a||(l=""),a=!1;let o;if(this.options.extensions?.inline?.some(u=>(o=u.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),!0):!1))continue;if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let u=t.at(-1);o.type==="text"&&u?.type==="text"?(u.raw+=o.raw,u.text+=o.text):t.push(o);continue}if(o=this.tokenizer.emStrong(e,s,l)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.del(e,s,l)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.autolink(e)){e=e.substring(o.raw.length),t.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),t.push(o);continue}let d=e;if(this.options.extensions?.startInline){let u=1/0,g=e.slice(1),b;this.options.extensions.startInline.forEach(k=>{b=k.call({lexer:this},g),typeof b=="number"&&b>=0&&(u=Math.min(u,b))}),u<1/0&&u>=0&&(d=e.substring(0,u+1))}if(o=this.tokenizer.inlineText(d)){e=e.substring(o.raw.length),o.raw.slice(-1)!=="_"&&(l=o.raw.slice(-1)),a=!0;let u=t.at(-1);u?.type==="text"?(u.raw+=o.raw,u.text+=o.text):t.push(o);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){let t="Infinite loop on byte: "+e;if(this.options.silent)console.error(t);else throw new Error(t)}},Q=class{constructor(n){x(this,"options");x(this,"parser");this.options=n||L}space(n){return""}code({text:n,lang:e,escaped:t}){let s=(e||"").match(S.notSpaceStart)?.[0],r=n.replace(S.endingNewline,"")+`
`;return s?'<pre><code class="language-'+R(s)+'">'+(t?r:R(r,!0))+`</code></pre>
`:"<pre><code>"+(t?r:R(r,!0))+`</code></pre>
`}blockquote({tokens:n}){return`<blockquote>
${this.parser.parse(n)}</blockquote>
`}html({text:n}){return n}def(n){return""}heading({tokens:n,depth:e}){return`<h${e}>${this.parser.parseInline(n)}</h${e}>
`}hr(n){return`<hr>
`}list(n){let e=n.ordered,t=n.start,s="";for(let a=0;a<n.items.length;a++){let l=n.items[a];s+=this.listitem(l)}let r=e?"ol":"ul",i=e&&t!==1?' start="'+t+'"':"";return"<"+r+i+`>
`+s+"</"+r+`>
`}listitem(n){return`<li>${this.parser.parse(n.tokens)}</li>
`}checkbox({checked:n}){return"<input "+(n?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:n}){return`<p>${this.parser.parseInline(n)}</p>
`}table(n){let e="",t="";for(let r=0;r<n.header.length;r++)t+=this.tablecell(n.header[r]);e+=this.tablerow({text:t});let s="";for(let r=0;r<n.rows.length;r++){let i=n.rows[r];t="";for(let a=0;a<i.length;a++)t+=this.tablecell(i[a]);s+=this.tablerow({text:t})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+s+`</table>
`}tablerow({text:n}){return`<tr>
${n}</tr>
`}tablecell(n){let e=this.parser.parseInline(n.tokens),t=n.header?"th":"td";return(n.align?`<${t} align="${n.align}">`:`<${t}>`)+e+`</${t}>
`}strong({tokens:n}){return`<strong>${this.parser.parseInline(n)}</strong>`}em({tokens:n}){return`<em>${this.parser.parseInline(n)}</em>`}codespan({text:n}){return`<code>${R(n,!0)}</code>`}br(n){return"<br>"}del({tokens:n}){return`<del>${this.parser.parseInline(n)}</del>`}link({href:n,title:e,tokens:t}){let s=this.parser.parseInline(t),r=de(n);if(r===null)return s;n=r;let i='<a href="'+n+'"';return e&&(i+=' title="'+R(e)+'"'),i+=">"+s+"</a>",i}image({href:n,title:e,text:t,tokens:s}){s&&(t=this.parser.parseInline(s,this.parser.textRenderer));let r=de(n);if(r===null)return R(t);n=r;let i=`<img src="${n}" alt="${R(t)}"`;return e&&(i+=` title="${R(e)}"`),i+=">",i}text(n){return"tokens"in n&&n.tokens?this.parser.parseInline(n.tokens):"escaped"in n&&n.escaped?n.text:R(n.text)}},oe=class{strong({text:n}){return n}em({text:n}){return n}codespan({text:n}){return n}del({text:n}){return n}html({text:n}){return n}text({text:n}){return n}link({text:n}){return""+n}image({text:n}){return""+n}br(){return""}checkbox({raw:n}){return n}},v=class J{constructor(e){x(this,"options");x(this,"renderer");x(this,"textRenderer");this.options=e||L,this.options.renderer=this.options.renderer||new Q,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new oe}static parse(e,t){return new J(t).parse(e)}static parseInline(e,t){return new J(t).parseInline(e)}parse(e){this.renderer.parser=this;let t="";for(let s=0;s<e.length;s++){let r=e[s];if(this.options.extensions?.renderers?.[r.type]){let a=r,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){t+=l||"";continue}}let i=r;switch(i.type){case"space":{t+=this.renderer.space(i);break}case"hr":{t+=this.renderer.hr(i);break}case"heading":{t+=this.renderer.heading(i);break}case"code":{t+=this.renderer.code(i);break}case"table":{t+=this.renderer.table(i);break}case"blockquote":{t+=this.renderer.blockquote(i);break}case"list":{t+=this.renderer.list(i);break}case"checkbox":{t+=this.renderer.checkbox(i);break}case"html":{t+=this.renderer.html(i);break}case"def":{t+=this.renderer.def(i);break}case"paragraph":{t+=this.renderer.paragraph(i);break}case"text":{t+=this.renderer.text(i);break}default:{let a='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let s="";for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let l=this.options.extensions.renderers[i.type].call({parser:this},i);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){s+=l||"";continue}}let a=i;switch(a.type){case"escape":{s+=t.text(a);break}case"html":{s+=t.html(a);break}case"link":{s+=t.link(a);break}case"image":{s+=t.image(a);break}case"checkbox":{s+=t.checkbox(a);break}case"strong":{s+=t.strong(a);break}case"em":{s+=t.em(a);break}case"codespan":{s+=t.codespan(a);break}case"br":{s+=t.br(a);break}case"del":{s+=t.del(a);break}case"text":{s+=t.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return s}},F,M=(F=class{constructor(n){x(this,"options");x(this,"block");this.options=n||L}preprocess(n){return n}postprocess(n){return n}processAllTokens(n){return n}emStrongMask(n){return n}provideLexer(n=this.block){return n?A.lex:A.lexInline}provideParser(n=this.block){return n?v.parse:v.parseInline}},x(F,"passThroughHooks",new Set(["preprocess","postprocess","processAllTokens","emStrongMask"])),x(F,"passThroughHooksRespectAsync",new Set(["preprocess","postprocess","processAllTokens"])),F),jt=class{constructor(...n){x(this,"defaults",ee());x(this,"options",this.setOptions);x(this,"parse",this.parseMarkdown(!0));x(this,"parseInline",this.parseMarkdown(!1));x(this,"Parser",v);x(this,"Renderer",Q);x(this,"TextRenderer",oe);x(this,"Lexer",A);x(this,"Tokenizer",G);x(this,"Hooks",M);this.use(...n)}walkTokens(n,e){let t=[];for(let s of n)switch(t=t.concat(e.call(this,s)),s.type){case"table":{let r=s;for(let i of r.header)t=t.concat(this.walkTokens(i.tokens,e));for(let i of r.rows)for(let a of i)t=t.concat(this.walkTokens(a.tokens,e));break}case"list":{let r=s;t=t.concat(this.walkTokens(r.items,e));break}default:{let r=s;this.defaults.extensions?.childTokens?.[r.type]?this.defaults.extensions.childTokens[r.type].forEach(i=>{let a=r[i].flat(1/0);t=t.concat(this.walkTokens(a,e))}):r.tokens&&(t=t.concat(this.walkTokens(r.tokens,e)))}}return t}use(...n){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return n.forEach(t=>{let s={...t};if(s.async=this.defaults.async||s.async||!1,t.extensions&&(t.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){let i=e.renderers[r.name];i?e.renderers[r.name]=function(...a){let l=r.renderer.apply(this,a);return l===!1&&(l=i.apply(this,a)),l}:e.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=e[r.level];i?i.unshift(r.tokenizer):e[r.level]=[r.tokenizer],r.start&&(r.level==="block"?e.startBlock?e.startBlock.push(r.start):e.startBlock=[r.start]:r.level==="inline"&&(e.startInline?e.startInline.push(r.start):e.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(e.childTokens[r.name]=r.childTokens)}),s.extensions=e),t.renderer){let r=this.defaults.renderer||new Q(this.defaults);for(let i in t.renderer){if(!(i in r))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let a=i,l=t.renderer[a],h=r[a];r[a]=(...o)=>{let d=l.apply(r,o);return d===!1&&(d=h.apply(r,o)),d||""}}s.renderer=r}if(t.tokenizer){let r=this.defaults.tokenizer||new G(this.defaults);for(let i in t.tokenizer){if(!(i in r))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let a=i,l=t.tokenizer[a],h=r[a];r[a]=(...o)=>{let d=l.apply(r,o);return d===!1&&(d=h.apply(r,o)),d}}s.tokenizer=r}if(t.hooks){let r=this.defaults.hooks||new M;for(let i in t.hooks){if(!(i in r))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let a=i,l=t.hooks[a],h=r[a];M.passThroughHooks.has(i)?r[a]=o=>{if(this.defaults.async&&M.passThroughHooksRespectAsync.has(i))return(async()=>{let u=await l.call(r,o);return h.call(r,u)})();let d=l.call(r,o);return h.call(r,d)}:r[a]=(...o)=>{if(this.defaults.async)return(async()=>{let u=await l.apply(r,o);return u===!1&&(u=await h.apply(r,o)),u})();let d=l.apply(r,o);return d===!1&&(d=h.apply(r,o)),d}}s.hooks=r}if(t.walkTokens){let r=this.defaults.walkTokens,i=t.walkTokens;s.walkTokens=function(a){let l=[];return l.push(i.call(this,a)),r&&(l=l.concat(r.call(this,a))),l}}this.defaults={...this.defaults,...s}}),this}setOptions(n){return this.defaults={...this.defaults,...n},this}lexer(n,e){return A.lex(n,e??this.defaults)}parser(n,e){return v.parse(n,e??this.defaults)}parseMarkdown(n){return(e,t)=>{let s={...t},r={...this.defaults,...s},i=this.onError(!!r.silent,!!r.async);if(this.defaults.async===!0&&s.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(r.hooks&&(r.hooks.options=r,r.hooks.block=n),r.async)return(async()=>{let a=r.hooks?await r.hooks.preprocess(e):e,l=await(r.hooks?await r.hooks.provideLexer(n):n?A.lex:A.lexInline)(a,r),h=r.hooks?await r.hooks.processAllTokens(l):l;r.walkTokens&&await Promise.all(this.walkTokens(h,r.walkTokens));let o=await(r.hooks?await r.hooks.provideParser(n):n?v.parse:v.parseInline)(h,r);return r.hooks?await r.hooks.postprocess(o):o})().catch(i);try{r.hooks&&(e=r.hooks.preprocess(e));let a=(r.hooks?r.hooks.provideLexer(n):n?A.lex:A.lexInline)(e,r);r.hooks&&(a=r.hooks.processAllTokens(a)),r.walkTokens&&this.walkTokens(a,r.walkTokens);let l=(r.hooks?r.hooks.provideParser(n):n?v.parse:v.parseInline)(a,r);return r.hooks&&(l=r.hooks.postprocess(l)),l}catch(a){return i(a)}}}onError(n,e){return t=>{if(t.message+=`
Please report this to https://github.com/markedjs/marked.`,n){let s="<p>An error occurred:</p><pre>"+R(t.message+"",!0)+"</pre>";return e?Promise.resolve(s):s}if(e)return Promise.reject(t);throw t}}},z=new jt;function f(n,e){return z.parse(n,e)}f.options=f.setOptions=function(n){return z.setOptions(n),f.defaults=z.defaults,Ae(f.defaults),f};f.getDefaults=ee;f.defaults=L;f.use=function(...n){return z.use(...n),f.defaults=z.defaults,Ae(f.defaults),f};f.walkTokens=function(n,e){return z.walkTokens(n,e)};f.parseInline=z.parseInline;f.Parser=v;f.parser=v.parse;f.Renderer=Q;f.TextRenderer=oe;f.Lexer=A;f.lexer=A.lex;f.Tokenizer=G;f.Hooks=M;f.parse=f;f.options;f.setOptions;f.use;f.walkTokens;f.parseInline;v.parse;A.lex;const xe={"today's laboratory summary":{content:`📊 **Laboratory Summary - July 5, 2026**

**Safety & Security:**
• PPE Compliance: 84% overall (↑4% vs yesterday)
• Active PPE Violations: 14 incidents
• Restricted Area Breaches: 3 (1 critical)
• Fire/Smoke Events: 0 active

**Chemical Management:**
• Total Chemicals: 128 registered
• Active Stock: 114 chemicals in use
• Low Stock Alerts: 10 items (reorder recommended)
• Expiring Soon: 9 chemicals within 30 days
• Compliance Rate: 94.5% (3 violations active)

**Gas Cylinder Status:**
• Total Cylinders: 482 registered
• Active: 318 | Available: 124
• Low Pressure: 19 | Critical Alerts: 4
• Leak Events: 2 active (under investigation)

**Sample Tracking:**
• Active Samples: 847 tracked
• Pending Analysis: 142 samples
• Completed Today: 68 samples
• Average SLA: 94.2% on-time

**Key Actions Required:**
⚠ Replace Oxygen cylinder CY-101 (16 bar - critical)
⚠ Investigate leak alert in Lab B (CY-089)
⚠ Review PPE violations in Lab A (5 incidents today)
⚠ Reorder: Ethanol (8L remaining), IPA (18L), Nitric Acid (0.2L)

All systems operational. No critical safety incidents reported.`,source:"Laboratory Management System",sourceType:"Real-time Dashboard"},"how should sulfuric acid be stored":{content:`🧪 **Sulfuric Acid 98% - Storage Guidelines**

**Storage Class:** Corrosive Acid (Class 8)

### Storage Requirements

| Requirement | Specification |
|------------|---------------|
| **Location** | Dedicated corrosive acid storage cabinet (CAB-C-02) |
| **Cabinet Material** | Acid-resistant with secondary containment |
| **Temperature** | 15-25°C, away from heat sources |
| **Ventilation** | Adequate ventilation required, preferably in fume hood area |
| **Segregation** | Keep separate from bases, organic materials, and oxidizers |
| **Container** | Original or acid-resistant secondary container |
| **Sealing** | Tightly sealed when not in use |

### Incompatible Materials

⚠️ **Never store with:**
- Strong bases (NaOH, KOH)
- Organic solvents (acetone, ethanol)
- Oxidizing agents
- Water (exothermic reaction - always add acid to water, never reverse)

### Required PPE for Handling

| Equipment | Specification |
|-----------|---------------|
| Face Protection | Face shield (mandatory) |
| Hand Protection | Acid-resistant gloves (nitrile or neoprene) |
| Body Protection | Chemical-resistant apron + Lab coat |
| Eye Protection | Safety goggles |

### Emergency Procedures

| Emergency | Response |
|-----------|----------|
| **Spill** | Neutralize with sodium bicarbonate, contain and clean |
| **Skin Contact** | Flush with water for 15+ minutes, seek medical attention |
| **Eye Contact** | Flush with water for 15+ minutes, seek immediate medical attention |
| **Inhalation** | Move to fresh air, seek medical attention |

### Current Stock Information

| Parameter | Value |
|-----------|-------|
| Location | CAB-C-02 |
| Quantity | 20 L |
| Batch Number | SA-2026-0124 |
| Supplier | Sigma-Aldrich |
| Expiry Date | 2027-02-28 |
| Last Scanned | 2026-06-29 10:35 |
| Storage Status | ✅ COMPLIANT |

### Safety Measures Checklist

- ✅ Store in original container or acid-resistant secondary container
- ✅ Ensure containers are tightly sealed when not in use
- ✅ Label clearly with hazard warnings
- ✅ Keep spill kit and neutralizing agent nearby
- ✅ Secondary containment tray mandatory
- ✅ Regular inspection schedule maintained`,source:"MSDS Database & Storage Guidelines",sourceType:"Safety Document"},"show all chemicals expiring in the next 30 days":{content:`⏰ **Chemicals Expiring in Next 30 Days**

### Critical (< 7 days)

| Chemical ID | Name | Expiry | Days Left | Location | Quantity | Status |
|------------|------|--------|-----------|----------|----------|---------|
| CHM-013 | Hydrogen Peroxide 30% | 2025-07-15 | 10 days | CAB-A-03 | 12 L | VIOLATION |

**Action:** Immediate disposal or recertification required

---

### High Priority (7-30 days)

| Chemical ID | Name | Expiry | Days Left | Location | Quantity | Action |
|------------|------|--------|-----------|----------|----------|---------|
| CHM-006 | Methanol | 2025-12-05 | 23 days | CAB-A-04 | 28 L | Use or reorder |
| CHM-004 | Cyclohexane | 2025-09-30 | 18 days | CAB-A-15 | 20 L | Priority usage |
| CHM-001 | Benzene | 2025-08-12 | 8 days | CAB-A-12 | 25 L | Schedule for use |
| CHM-018 | Diethyl Ether | 2025-08-19 | 15 days | CAB-A-14 | 10 L | Use before expiry |
| CHM-016 | Chloroform | 2025-10-28 | 26 days | CAB-A-13 | 18 L | Warning |

---

### Medium Priority (30-60 days)

| Chemical ID | Name | Expiry | Days Left | Location | Quantity |
|------------|------|--------|-----------|----------|----------|
| CHM-007 | Ethanol 99.5% | 2026-04-18 | 42 days | CAB-A-01 | 50 L |
| CHM-002 | Toluene | 2026-03-15 | 38 days | CAB-A-08 | 40 L |
| CHM-010 | Nitric Acid 70% | 2026-06-20 | 53 days | CAB-C-05 | 15 L |

---

### Summary

| Metric | Value |
|--------|-------|
| Total expiring (30 days) | 9 chemicals |
| Critical attention | 1 (expired - immediate action) |
| High priority | 5 chemicals |
| Total volume affected | 161 L |
| Current expiry rate | 7.0% |
| Target rate | < 5% |

### Recommended Actions

1. **Immediate:** Dispose or recertify CHM-013 (H2O2)
2. **This Week:** Prioritize usage of Benzene and Diethyl Ether in ongoing projects
3. **Next Week:** Schedule reorder for Methanol and Cyclohexane
4. **Review:** Inventory consumption patterns to reduce waste

💡 **AI Suggestion:** Adjust ordering quantities based on actual usage patterns. Current expiry rate of 7.0% exceeds target of 5%. Consider implementing FIFO (First-In-First-Out) inventory management.`,source:"Chemical Inventory System",sourceType:"Expiry Tracker"},"safety data sheet for benzene":{content:`🧪 **Safety Data Sheet (SDS) - Benzene**

### Product Identification

| Field | Information |
|-------|-------------|
| **Chemical Name** | Benzene |
| **CAS Number** | 71-43-2 |
| **Molecular Formula** | C₆H₆ |
| **Molecular Weight** | 78.11 g/mol |
| **Synonyms** | Benzol, Cyclohexatriene, Phenyl hydride |
| **Product Code** | CHM-001 |
| **Supplier** | Sigma-Aldrich Corporation |
| **Emergency Phone** | +966-11-234-5678 (24/7) |

---

### Hazard Classification

⚠️ **GHS Classification:**
- **Flammability:** Category 2 (Highly Flammable Liquid)
- **Carcinogenicity:** Category 1A (Known Human Carcinogen)
- **Acute Toxicity (Inhalation):** Category 4
- **Acute Toxicity (Dermal):** Category 4
- **Germ Cell Mutagenicity:** Category 1B
- **Reproductive Toxicity:** Category 2
- **STOT Single Exposure:** Category 3 (Narcotic effects)
- **Aspiration Hazard:** Category 1

### Signal Word
🔴 **DANGER**

### Hazard Statements
- H225: Highly flammable liquid and vapor
- H304: May be fatal if swallowed and enters airways
- H315: Causes skin irritation
- H319: Causes serious eye irritation
- H340: May cause genetic defects
- H350: May cause cancer
- H361: Suspected of damaging fertility or the unborn child
- H372: Causes damage to organs through prolonged or repeated exposure

---

### First Aid Measures

| Exposure Route | First Aid Procedure |
|----------------|---------------------|
| **Inhalation** | Move to fresh air immediately. If not breathing, give artificial respiration. If breathing is difficult, give oxygen. Seek immediate medical attention. |
| **Skin Contact** | Remove contaminated clothing immediately. Wash skin with soap and large amounts of water for at least 15 minutes. Seek medical attention if irritation develops. |
| **Eye Contact** | Rinse immediately with plenty of water for at least 15 minutes, lifting eyelids occasionally. Seek immediate medical attention. |
| **Ingestion** | DO NOT induce vomiting. Never give anything by mouth to an unconscious person. Rinse mouth with water. Seek immediate medical attention. |

⚠️ **Note to Physicians:** Treat symptomatically. Due to aspiration hazard, gastric lavage should be avoided. Consider oxygen therapy if respiratory distress occurs.

---

### Fire-Fighting Measures

| Parameter | Information |
|-----------|-------------|
| **Flash Point** | -11°C (12°F) - Closed Cup |
| **Autoignition Temperature** | 498°C (928°F) |
| **Flammable Limits** | LEL: 1.2% | UEL: 7.8% (in air) |
| **Suitable Extinguishing Media** | CO₂, dry chemical powder, alcohol-resistant foam |
| **Unsuitable Media** | Water jet (may spread fire) |
| **Special Hazards** | Vapors may form explosive mixtures with air. Vapors heavier than air, may travel to ignition source. |
| **Protective Equipment** | Self-contained breathing apparatus (SCBA) and full protective gear |

---

### Handling & Storage

### Safe Handling Practices
✅ Use only in well-ventilated areas (fume hood mandatory)
✅ Keep away from heat, sparks, open flames, and hot surfaces
✅ Ground and bond containers and receiving equipment
✅ Use explosion-proof electrical equipment
✅ Avoid breathing vapors, mist, or spray
✅ Avoid contact with skin and eyes
✅ Wear appropriate personal protective equipment
✅ Wash hands thoroughly after handling
✅ Do not eat, drink, or smoke when using this product

### Storage Requirements

| Requirement | Specification |
|-------------|---------------|
| **Storage Class** | Flammable liquid, carcinogenic (Class 3, Cat 1A) |
| **Temperature** | 15-25°C in cool, dry place |
| **Ventilation** | Adequate mechanical ventilation required |
| **Container** | Store in original container. Keep tightly closed. |
| **Segregation** | Keep away from oxidizing agents, acids, bases |
| **Special Requirements** | Store in flammable liquid storage cabinet. Secondary containment mandatory. |
| **Current Location** | CAB-A-12 (Flammable Cabinet) |

---

### Exposure Controls / Personal Protection

### Occupational Exposure Limits

| Authority | TWA | STEL | Ceiling |
|-----------|-----|------|---------|
| **OSHA PEL** | 1 ppm (3.2 mg/m³) | 5 ppm | - |
| **ACGIH TLV** | 0.5 ppm | 2.5 ppm | - |
| **NIOSH REL** | 0.1 ppm | 1 ppm | - |
| **Saudi GSSEMAOH** | 0.5 ppm (1.6 mg/m³) | 2.5 ppm | - |

### Required Personal Protective Equipment (PPE)

| Equipment | Specification |
|-----------|---------------|
| **Respiratory Protection** | Use NIOSH-approved organic vapor respirator with full facepiece in high vapor concentrations. SCBA for emergency situations. |
| **Hand Protection** | Nitrile gloves (breakthrough time >480 min). Change immediately if contaminated. |
| **Eye Protection** | Chemical safety goggles + face shield |
| **Skin Protection** | Chemical-resistant lab coat, apron. Long sleeves mandatory. |
| **Foot Protection** | Closed-toe, chemical-resistant safety shoes |

---

### Physical & Chemical Properties

| Property | Value |
|----------|-------|
| **Appearance** | Clear, colorless liquid |
| **Odor** | Sweet, aromatic |
| **Odor Threshold** | 1.5-4.7 ppm |
| **pH** | Not applicable |
| **Melting Point** | 5.5°C (41.9°F) |
| **Boiling Point** | 80.1°C (176.2°F) |
| **Vapor Pressure** | 95 mmHg @ 25°C |
| **Vapor Density** | 2.77 (Air = 1) |
| **Relative Density** | 0.879 @ 20°C |
| **Solubility** | Slightly soluble in water (1.8 g/L @ 25°C) |
| **Partition Coefficient** | log Kow: 2.13 |
| **Evaporation Rate** | 2.8 (n-Butyl acetate = 1) |

---

### Stability & Reactivity

| Parameter | Information |
|-----------|-------------|
| **Chemical Stability** | Stable under normal conditions |
| **Possibility of Hazardous Reactions** | May polymerize with peroxides or strong oxidizers |
| **Conditions to Avoid** | Heat, sparks, flames, static discharge, shock, friction |
| **Incompatible Materials** | Strong oxidizing agents, halogens, nitric acid, sulfuric acid, peroxides |
| **Hazardous Decomposition** | Carbon monoxide, carbon dioxide, toxic fumes |

---

### Toxicological Information

| Effect | Information |
|--------|-------------|
| **Acute Toxicity** | LD50 Oral (Rat): 930 mg/kg | LC50 Inhalation (Rat): 13700 ppm/4h |
| **Carcinogenicity** | **IARC Group 1** (Carcinogenic to humans). Causes leukemia. |
| **Reproductive Toxicity** | May damage fertility. May harm the unborn child. |
| **Mutagenicity** | Causes genetic defects in humans. |
| **Target Organs** | Blood, bone marrow, central nervous system, liver |
| **Chronic Effects** | Prolonged exposure may cause anemia, leukemia, immune system damage |

---

### Disposal Considerations

⚠️ **Hazardous Waste Code:** D018 (EPA), HP3, HP7 (EU)

**Disposal Method:**
- Must be disposed of as hazardous waste through licensed contractor
- Incineration at approved facility with afterburner and scrubber
- DO NOT discharge into drains, water courses, or environment
- Consult local environmental regulations

**Current Stock Disposal Protocol:** Contact EHS Department (Ext. 4567) for hazardous waste pickup

---

### Regulatory Information

**Saudi Arabian Regulations:**
- Listed under Saudi GSSEMAOH Schedule of Chemical Substances
- Requires special handling permit for quantities >25L
- Subject to Royal Commission Environmental Regulations

**International Regulations:**
- EU CLP: Classification as Flam. Liq. 2, Carc. 1A, Muta. 1B
- US EPA: Listed as Hazardous Air Pollutant (Clean Air Act)
- OSHA: Regulated carcinogen (29 CFR 1910.1028)

---

### Current Stock Information

| Parameter | Value |
|-----------|-------|
| **Location** | CAB-A-12 (Flammable Cabinet) |
| **Quantity** | 25 L |
| **Batch Number** | BZ-2025-0891 |
| **Expiry Date** | 2025-08-12 (⚠️ 8 days remaining) |
| **Last Accessed** | 2026-07-02 14:20 |
| **Authorized Users** | Dr. Ahmed Al-Rashid, Dr. Sarah Thompson |
| **Status** | ⚠️ EXPIRING SOON - Schedule for priority usage |

---

### Emergency Response

**Spill Cleanup:**
1. Evacuate area immediately
2. Eliminate all ignition sources
3. Ventilate area
4. Wear appropriate PPE including SCBA
5. Contain spill with absorbent material (vermiculite, sand)
6. Collect in sealed containers for disposal
7. Never use water to clean up

**Emergency Contacts:**
- EHS Emergency: Ext. 9999
- Poison Control: +966-11-234-5678
- Fire Department: Internal 911

---

📋 **SDS Version:** 6.2 | **Revision Date:** 2026-01-15 | **Print Date:** 2026-07-05`,source:"MSDS Database - Sigma-Aldrich",sourceType:"Safety Data Sheet"}};function Et(n,e){const t=Array.from({length:n.length+1},()=>new Array(e.length+1).fill(0));for(let s=0;s<=n.length;s++)t[s][0]=s;for(let s=0;s<=e.length;s++)t[0][s]=s;for(let s=1;s<=n.length;s++)for(let r=1;r<=e.length;r++)n[s-1]===e[r-1]?t[s][r]=t[s-1][r-1]:t[s][r]=1+Math.min(t[s-1][r],t[s][r-1],t[s-1][r-1]);return t[n.length][e.length]}function It(n,e){if(n===e)return 1;const t=Math.max(n.length,e.length);return t===0?1:1-Et(n,e)/t}const Mt=new Set(["a","an","the","is","are","for","to","of","in","on","me","my","i","please","can","you","give","show","what"]);function ke(n){return n.toLowerCase().replace(/[^\w\s]/g,"").split(/\s+/).filter(e=>e.length>0&&!Mt.has(e))}const Dt=.72,Ht=.55;function Bt(n,e){if(n.length===0)return 0;let t=0;for(const s of n){let r=0;for(const i of e){const a=It(s,i);a>r&&(r=a)}r>=Dt&&(t+=r)}return t/n.length}function qt(n,e){const t=ke(n);if(t.length===0)return null;let s=null,r=0;for(const i of e){const a=ke(i),l=Bt(a,t);l>r&&(r=l,s=i)}return r>=Ht?s:null}const Ot=[{id:1,title:"Acetone MSDS Query",time:"Today, 09:14",messages:[]},{id:2,title:"PPE Requirements for Lab B",time:"Today, 08:32",messages:[]},{id:3,title:"SOP for Sample Disposal",time:"Yesterday",messages:[]},{id:4,title:"Chemical Compatibility Check",time:"Yesterday",messages:[]},{id:5,title:"Fire Safety Procedures",time:"2 days ago",messages:[]}],U=[{id:"copilot",name:"Laboratory AI Copilot",description:"A conversational AI assistant that helps laboratory personnel access information, perform routine tasks, and make informed decisions.",icon:K,color:"from-cyan-500 to-cyan-600"},{id:"sop",name:"SOP Search",description:"Quickly retrieve Standard Operating Procedures (SOPs) using natural language queries.",icon:ye,color:"from-blue-500 to-blue-600"},{id:"manual",name:"Laboratory Manual Search",description:"Search equipment manuals, technical documents, and operational guidelines with AI-powered semantic search.",icon:Be,color:"from-purple-500 to-purple-600"},{id:"chemical",name:"Chemical Handling Guidance",description:"Provides instant guidance on chemical handling, storage, safety precautions, and regulatory practices.",icon:we,color:"from-orange-500 to-orange-600"},{id:"msds",name:"MSDS Search",description:"Instantly access Material Safety Data Sheets (MSDS/SDS) for hazard, handling, PPE, and emergency information.",icon:Se,color:"from-red-500 to-red-600"},{id:"report",name:"Report Summarization",description:"Automatically summarizes laboratory reports, audits, and inspection findings into concise insights.",icon:Ce,color:"from-green-500 to-green-600"},{id:"multilingual",name:"Arabic & English Support",description:"Communicate in both Arabic and English with full language support for all queries.",icon:qe,color:"from-indigo-500 to-indigo-600"}],_t=[{icon:Ce,title:"Daily Summary",description:"Give me today's laboratory summary",color:"from-cyan-400 to-cyan-600"},{icon:we,title:"Storage Guidance",description:"How should Sulfuric Acid be stored?",color:"from-cyan-400 to-cyan-600"},{icon:be,title:"Expiry Check",description:"Show all chemicals expiring in the next 30 days",color:"from-cyan-400 to-cyan-600"},{icon:Se,title:"MSDS Lookup",description:"Safety data sheet for Benzene",color:"from-cyan-400 to-cyan-600"}],Ft=[];function Vt(){const[n,e]=P.useState(Ft),[t,s]=P.useState(""),[r,i]=P.useState(!1),[a,l]=P.useState("copilot"),[h,o]=P.useState(!1),[d,u]=P.useState(Ot),[g,b]=P.useState(null);P.useMemo(()=>{f.setOptions({breaks:!0,gfm:!0})},[]);const k=p=>f.parse(p),C=p=>p.length>40?p.substring(0,40)+"...":p,H=()=>{const p=new Date,w=p.getHours().toString().padStart(2,"0"),y=p.getMinutes().toString().padStart(2,"0");return`Today, ${w}:${y}`},B=()=>{if(n.length>0){const p=n.find(T=>T.role==="user"),w=p?C(p.content):"New Chat",y={id:Date.now(),title:w,time:H(),messages:[...n]};u(T=>[y,...T])}e([]),b(null)},q=p=>{const w=d.find(y=>y.id===p);w&&(e(w.messages),b(p))},O=()=>{if(!t.trim())return;const p={id:n.length+1,role:"user",content:t};e(y=>[...y,p]);const w=t.toLowerCase().trim();s(""),i(!0),setTimeout(()=>{i(!1);const y=qt(w,Object.keys(xe)),T=y?xe[y]:null,Ee=T?{id:n.length+2,role:"ai",content:T.content,source:T.source,sourceType:T.sourceType}:{id:n.length+2,role:"ai",content:"I'm processing your query against the laboratory documentation library. Please allow me a moment to retrieve the most accurate information.",source:"Lab Document Library",sourceType:"SOP"};e(Ie=>[...Ie,Ee])},1500)};return c.jsxs(c.Fragment,{children:[c.jsx("style",{children:`
        .ai-message-content h1,
        .ai-message-content h2,
        .ai-message-content h3 {
          font-weight: 600;
          margin-top: 0.75rem;
          margin-bottom: 0.5rem;
        }
        .ai-message-content h1 { font-size: 1rem; }
        .ai-message-content h2 { font-size: 0.875rem; }
        .ai-message-content h3 { font-size: 0.8rem; }
        .ai-message-content p {
          margin: 0.5rem 0;
        }
        .ai-message-content ul,
        .ai-message-content ol {
          margin: 0.5rem 0;
          padding-left: 1.25rem;
        }
        .ai-message-content li {
          margin: 0.25rem 0;
        }
        .ai-message-content strong {
          font-weight: 600;
          color: rgb(15 23 42);
        }
        .ai-message-content code {
          background: rgb(241 245 249);
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-size: 0.75rem;
          font-family: 'Courier New', monospace;
        }
        .ai-message-content pre {
          background: rgb(241 245 249);
          padding: 0.5rem;
          border-radius: 0.375rem;
          overflow-x: auto;
          margin: 0.5rem 0;
        }
        .ai-message-content blockquote {
          border-left: 3px solid rgb(6 182 212);
          padding-left: 0.75rem;
          margin: 0.5rem 0;
          color: rgb(71 85 105);
        }
        .ai-message-content a {
          color: rgb(6 182 212);
          text-decoration: underline;
        }
        .ai-message-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 0.5rem 0;
        }
        .ai-message-content th,
        .ai-message-content td {
          border: 1px solid rgb(226 232 240);
          padding: 0.375rem 0.5rem;
          text-align: left;
        }
        .ai-message-content th {
          background: rgb(248 250 252);
          font-weight: 600;
        }
      `}),c.jsxs("div",{className:"flex h-full",children:[c.jsxs("div",{className:"w-56 border-r border-slate-200/40 flex flex-col",children:[c.jsx("div",{className:"p-3",children:c.jsxs("button",{onClick:B,className:"w-full flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg text-xs font-medium shadow-sm hover:from-cyan-600 hover:to-cyan-700 transition-all",children:[c.jsx(He,{className:"w-3.5 h-3.5"}),"New Chat"]})}),c.jsxs("div",{className:"px-3 pb-2 flex-1 overflow-y-auto",children:[c.jsx("p",{className:"text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2",children:"Recent Sessions"}),c.jsx("div",{className:"space-y-0.5",children:d.map(p=>c.jsxs("button",{onClick:()=>q(p.id),className:`w-full text-left px-2 py-2 rounded-lg hover:bg-slate-100/60 transition-colors ${g===p.id?"bg-cyan-50 border border-cyan-200":""}`,children:[c.jsx("p",{className:"text-xs font-medium text-slate-700 truncate",children:p.title}),c.jsxs("div",{className:"flex items-center gap-1 mt-0.5",children:[c.jsx(be,{className:"w-2.5 h-2.5 text-slate-400"}),c.jsx("p",{className:"text-[10px] text-slate-400",children:p.time})]})]},p.id))})]})]}),c.jsxs("div",{className:"flex-1 flex flex-col",children:[c.jsxs("div",{className:"px-5 py-3 border-b border-slate-200/40 flex items-center justify-between",children:[c.jsx("div",{className:"flex items-center gap-2",children:(()=>{const p=U.find(y=>y.id===a)||U[0],w=p.icon;return c.jsxs(c.Fragment,{children:[c.jsx("div",{className:`w-7 h-7 rounded-lg bg-gradient-to-r ${p.color} flex items-center justify-center`,children:c.jsx(w,{className:"w-4 h-4 text-white"})}),c.jsxs("div",{children:[c.jsx("p",{className:"text-xs font-semibold text-slate-800",children:p.name}),c.jsx("p",{className:"text-[10px] text-green-600 font-medium",children:"● Online"})]})]})})()}),c.jsx("div",{className:"flex items-center gap-2",children:c.jsxs("div",{className:"relative",children:[c.jsxs("button",{onClick:()=>o(!h),className:"flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors",children:[c.jsx(Oe,{className:"w-3.5 h-3.5 text-slate-600"}),c.jsx("span",{className:"text-xs text-slate-700 font-medium",children:"Change Model"})]}),h&&c.jsxs("div",{className:"absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto",children:[c.jsxs("div",{className:"p-3 border-b border-slate-100",children:[c.jsx("p",{className:"text-xs font-semibold text-slate-800",children:"Select AI Model"}),c.jsx("p",{className:"text-[10px] text-slate-500 mt-0.5",children:"Choose the specialized assistant for your task"})]}),c.jsx("div",{className:"p-2",children:U.map(p=>{const w=p.icon;return c.jsx("button",{onClick:()=>{l(p.id),o(!1)},className:`w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors mb-1 ${a===p.id?"bg-cyan-50 border border-cyan-200":""}`,children:c.jsxs("div",{className:"flex items-start gap-3",children:[c.jsx("div",{className:`w-8 h-8 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center flex-shrink-0`,children:c.jsx(w,{className:"w-4 h-4 text-white"})}),c.jsxs("div",{className:"flex-1 min-w-0",children:[c.jsxs("div",{className:"flex items-center gap-2 mb-1",children:[c.jsx("p",{className:"text-xs font-semibold text-slate-800",children:p.name}),a===p.id&&c.jsx(ce,{variant:"success",size:"sm",children:"Active"})]}),c.jsx("p",{className:"text-[10px] text-slate-500 leading-relaxed",children:p.description})]})]})},p.id)})})]})]})})]}),c.jsx("div",{className:"flex-1 overflow-y-auto px-5 py-4",children:n.length===0?c.jsxs("div",{className:"flex flex-col items-center justify-center h-full max-w-4xl mx-auto",children:[c.jsxs("div",{className:"flex flex-col items-center mb-10",children:[c.jsx("div",{className:"w-24 h-24 rounded-2xl flex items-center justify-center mb-6",children:c.jsx("div",{className:"relative",children:c.jsx("img",{src:Qe,alt:"AI Assistant",className:"w-14 h-14"})})}),c.jsx("h2",{className:"text-2xl font-bold text-slate-800 mb-3",children:"How can I assist your research today?"}),c.jsx("p",{className:"text-sm text-slate-500 text-center max-w-xl",children:"Access standard operating procedures, analyze material safety data sheets, or query the lab's sensor array data."})]}),c.jsx("div",{className:"grid grid-cols-2 gap-4 w-full max-w-3xl",children:_t.map((p,w)=>{const y=p.icon;return c.jsx("button",{onClick:()=>s(p.description),className:"group p-5 bg-white border border-slate-200/60 rounded-xl hover:border-cyan-300 hover:shadow-md transition-all text-left",children:c.jsxs("div",{className:"flex items-start gap-3",children:[c.jsx("div",{className:`w-10 h-10 rounded-lg bg-gradient-to-br ${p.color} flex items-center justify-center flex-shrink-0`,children:c.jsx(y,{className:"w-5 h-5 text-white"})}),c.jsxs("div",{className:"flex-1 min-w-0",children:[c.jsx("h3",{className:"text-sm font-semibold text-slate-800 mb-1",children:p.title}),c.jsx("p",{className:"text-xs text-slate-500 leading-relaxed",children:p.description})]})]})},w)})})]}):c.jsxs("div",{className:"space-y-4",children:[n.map(p=>c.jsxs("div",{className:`flex gap-3 ${p.role==="user"?"flex-row-reverse":""}`,children:[p.role==="ai"&&c.jsx("div",{className:"w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center flex-shrink-0 mt-0.5",children:c.jsx(K,{className:"w-3.5 h-3.5 text-white"})}),c.jsxs("div",{className:`max-w-lg ${p.role==="user"?"items-end":"items-start"} flex flex-col gap-1.5`,children:[c.jsx("div",{className:`px-4 py-3 rounded-2xl text-xs leading-relaxed ${p.role==="user"?"bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-tr-sm":"bg-white border border-slate-200/60 text-slate-700 rounded-tl-sm shadow-sm"}`,children:p.role==="ai"?c.jsx("div",{className:"ai-message-content",dangerouslySetInnerHTML:{__html:k(p.content)}}):c.jsx("div",{className:"whitespace-pre-line",children:p.content})}),p.role==="ai"&&p.source&&c.jsxs("div",{className:"flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-200/60 rounded-lg",children:[c.jsx(ye,{className:"w-3 h-3 text-cyan-500"}),c.jsx("span",{className:"text-[10px] text-slate-600 font-medium",children:p.source}),c.jsx(ce,{variant:"info",size:"sm",children:p.sourceType}),c.jsxs("button",{className:"text-[10px] text-cyan-600 flex items-center gap-0.5 hover:underline",children:["View ",c.jsx(_e,{className:"w-2.5 h-2.5"})]})]})]})]},p.id)),r&&c.jsxs("div",{className:"flex gap-3 items-center",children:[c.jsx("div",{className:"w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center flex-shrink-0",children:c.jsx(K,{className:"w-3.5 h-3.5 text-white"})}),c.jsxs("div",{className:"px-4 py-3 bg-white border border-slate-200/60 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1",children:[c.jsx("span",{className:"w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce",style:{animationDelay:"0ms"}}),c.jsx("span",{className:"w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce",style:{animationDelay:"150ms"}}),c.jsx("span",{className:"w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce",style:{animationDelay:"300ms"}})]})]})]})}),c.jsx("div",{className:"px-5 pb-4",children:c.jsxs("div",{className:"flex items-center gap-2 bg-white border border-slate-200/60 rounded-xl px-3 py-2 shadow-sm",children:[c.jsx("button",{className:"p-1 text-slate-400 hover:text-slate-600 transition-colors",children:c.jsx(Fe,{className:"w-4 h-4"})}),c.jsx("input",{type:"text",value:t,onChange:p=>s(p.target.value),onKeyDown:p=>p.key==="Enter"&&O(),placeholder:"Message Lab AI Assistant...",className:"flex-1 text-xs text-slate-700 outline-none placeholder:text-slate-400 bg-transparent"}),c.jsx("button",{className:"p-1 text-slate-400 hover:text-slate-600 transition-colors",children:c.jsx(Ze,{className:"w-4 h-4"})}),c.jsx("button",{onClick:O,className:"p-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:shadow-md transition-all disabled:opacity-50",disabled:!t.trim(),children:c.jsx(Ge,{className:"w-3.5 h-3.5"})})]})})]})]})]})}export{Vt as AIAssistant};
