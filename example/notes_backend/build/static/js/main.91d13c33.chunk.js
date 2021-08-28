(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{39:function(t,e,n){},40:function(t,e,n){'use strict';n.r(e);var c=n(15),r=n.n(c),o=n(6),i=n(3),a=n(2),u=n(0),s=function(t){var e=t.note,n=t.toggleImportance,c=e.important?'make not important':'make important';return Object(u.jsxs)('li',{className:'note',children:[e.content,' ',Object(u.jsx)('button',{onClick:n,children:c})]})},j=function(t){var e=t.message;return null===e?null:Object(u.jsx)('div',{className:'error',children:e})},l=n(4),f=n.n(l),b='/api/notes',d={getAll:function(){return f.a.get(b).then((function(t){return t.data}))},create:function(t){return f.a.post(b,t).then((function(t){return t.data}))},update:function(t,e){return f.a.put(''.concat(b,'/').concat(t),e).then((function(t){return t.data}))}},m=function(){return Object(u.jsxs)('div',{style:{color:'green',fontStyle:'italic',fontSize:16},children:[Object(u.jsx)('br',{}),Object(u.jsx)('em',{children:'Note app, Department of Computer Science, University of Helsinki 2021'})]})},O=function(t){var e=Object(a.useState)([]),n=Object(i.a)(e,2),c=n[0],r=n[1],l=Object(a.useState)('a new note...'),f=Object(i.a)(l,2),b=f[0],O=f[1],p=Object(a.useState)(!0),h=Object(i.a)(p,2),v=h[0],x=h[1],g=Object(a.useState)(null),S=Object(i.a)(g,2),k=S[0],w=S[1];Object(a.useEffect)((function(){d.getAll().then((function(t){r(t)}))}),[]);var y=v?c:c.filter((function(t){return t.important}));return Object(u.jsxs)('div',{children:[Object(u.jsx)('h1',{children:'Notes'}),Object(u.jsx)(j,{message:k}),Object(u.jsx)('div',{children:Object(u.jsxs)('button',{onClick:function(){return x(!v)},children:['show ',v?'important':'all']})}),Object(u.jsx)('ul',{children:y.map((function(t){return Object(u.jsx)(s,{note:t,toggleImportance:function(){return function(t){var e=c.find((function(e){return e.id===t})),n=Object(o.a)(Object(o.a)({},e),{},{important:!e.important});d.update(t,n).then((function(e){r(c.map((function(n){return n.id!==t?n:e})))})).catch((function(n){w('Note \''.concat(e.content,'\' was already removed from server')),setTimeout((function(){w(null)}),5e3),r(c.filter((function(e){return e.id!==t})))}))}(t.id)}},t.id)}))}),Object(u.jsxs)('form',{onSubmit:function(t){t.preventDefault();var e={content:b,date:(new Date).toISOString(),important:Math.random()<.5,id:c.length+1};d.create(e).then((function(t){r(c.concat(t)),O('')}))},children:[Object(u.jsx)('input',{value:b,onChange:function(t){O(t.target.value)}}),Object(u.jsx)('button',{type:'submit',children:'save'})]}),Object(u.jsx)(m,{})]})};n(39);r.a.render(Object(u.jsx)(O,{}),document.getElementById('root'))}},[[40,1,2]]])
//# sourceMappingURL=main.91d13c33.chunk.js.map