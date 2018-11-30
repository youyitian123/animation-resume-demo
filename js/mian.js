function writeCode(prefix, code, fn) {
  let domCode = document.querySelector('#code')
  domCode.innerHTML = prefix || ''
  let n = 0
  let id = setInterval(function () {
    n += 1
    domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
    styleTag.innerHTML = prefix + code.substring(0, n)
    if (n >= code.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 10)
}

function writeMarkdown(markdown, fn) {
  let domPaper = document.querySelector('#paper>.content')
  let n = 0
  let id = setInterval(() => {
    n += 1
    domPaper.innerHTML = markdown.substring(0, n)
    domPaper.scrollTop = domPaper.scrollHeight
    if (n >= markdown.length) {
      window.clearInterval(id)
      fn && fn.call()
    }
  }, 35)
}

var result = `/*
 * 面试官你好，我是小明
 * 我将以动画的形式介绍我自己
 * 只用文字介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
*/

*{
  transition: all 1s;
}

html{
  background: rgb(222,222,222);
  font-size:13px;
}

#code{
  border: 1px solid red;
  padding: 16px;
}

/*我需要添加一点代码高亮*/

.token.selector{
  color: #690;
}

.token.property{
  color: #905;
}

.token.function{
  color: #DD4A68;
}

/*现在加一点3D效果吧*/

#code{
  transform: rotate(360deg)
}

#code-wrapper{
  width: 50%; left: 0; position: fixed; 
  height: 100%;
}

#paper > .content {
 display: block;
}

/* 于是我就可以在白纸上写字了，请看右边 */
`


var result2 = `#
paper {
  width: 100 px;
  height: 100 px;
  background: red;
}
`

var md = `
# 自我介绍

我叫 XXX

1990 年 1 月出生
`
let result3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`

writeCode('', result, ()=>{ // writeCss call the function
  createPaper(() => {
    writeMarkdown(md, ()=> {
      writeCode(result, result2, ()=>{
        convertMarkdownToHtml(()=>{
          writeCode(result + result2, result3, ()=> {
            console.log('完成')
          })
        })
      })
    })
  })
})

function createPaper(fn) {
  var paper = document.createElement('div')
  paper.id = 'paper'
  var content = document.createElement('pre')
  content.className = 'content'
  paper.appendChild(content)
  document.body.appendChild(paper)
  fn && fn.call()
}

function convertMarkdownToHtml(fn) {
  var div = document.createElement('div')
  div.className = 'html markdown-body'
  div.innerHTML = marked(md)
  let markdownContainer = document.querySelector('#paper > .content')
  markdownContainer.replaceWith(div)
  fn && fn.call()
}